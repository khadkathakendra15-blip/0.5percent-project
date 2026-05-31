'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

// ─── WebGL shader source ──────────────────────────────────────────────────────
const defaultShaderSource = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float
  a=rnd(i),
  b=rnd(i+vec2(1,0)),
  c=rnd(i+vec2(0,1)),
  d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) {
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}
float clouds(vec2 p) {
  float d=1., t=.0;
  for (float i=.0; i<3.; i++) {
    float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
    t=mix(t,d,a);
    d=a;
    p*=2./(i+1.);
  }
  return t;
}
void main(void) {
  vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
  vec3 col=vec3(0);
  float bg=clouds(vec2(st.x+T*.5,-st.y));
  uv*=1.-.3*(sin(T*.2)*.5+.5);
  for (float i=1.; i<12.; i++) {
    uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.5+.1*uv.x);
    vec2 p=uv;
    float d=length(p);
    col+=.00125/d*(cos(sin(i)*vec3(1,2,3))+1.);
    float b=noise(i+p+bg*1.731);
    col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
    col=mix(col,vec3(bg*.25,bg*.137,bg*.05),d);
  }
  O=vec4(col,1);
}`;

// ─── WebGL renderer ───────────────────────────────────────────────────────────
class WebGLRenderer {
  private canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram | null = null;
  private vs: WebGLShader | null = null;
  private fs: WebGLShader | null = null;
  private buffer: WebGLBuffer | null = null;

  private vertexSrc = `#version 300 es
precision highp float;
in vec4 position;
void main(){gl_Position=position;}`;
  private vertices = [-1, 1, -1, -1, 1, 1, 1, -1];

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.gl = canvas.getContext('webgl2')!;
    this.gl.viewport(0, 0, canvas.width, canvas.height);
  }

  updateScale() {
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  compile(shader: WebGLShader, source: string) {
    const gl = this.gl;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    }
  }

  reset() {
    const gl = this.gl;
    if (this.program && !gl.getProgramParameter(this.program, gl.DELETE_STATUS)) {
      if (this.vs) { gl.detachShader(this.program, this.vs); gl.deleteShader(this.vs); }
      if (this.fs) { gl.detachShader(this.program, this.fs); gl.deleteShader(this.fs); }
      gl.deleteProgram(this.program);
    }
  }

  setup() {
    const gl = this.gl;
    this.vs = gl.createShader(gl.VERTEX_SHADER)!;
    this.fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    this.compile(this.vs, this.vertexSrc);
    this.compile(this.fs, defaultShaderSource);
    this.program = gl.createProgram()!;
    gl.attachShader(this.program, this.vs);
    gl.attachShader(this.program, this.fs);
    gl.linkProgram(this.program);
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(this.program));
    }
  }

  init() {
    const gl = this.gl;
    const program = this.program!;
    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    (program as any).resolution = gl.getUniformLocation(program, 'resolution');
    (program as any).time = gl.getUniformLocation(program, 'time');
  }

  render(now = 0) {
    const gl = this.gl;
    const program = this.program;
    if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return;
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.uniform2f((program as any).resolution, this.canvas.width, this.canvas.height);
    gl.uniform1f((program as any).time, now * 1e-3);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
const useShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | undefined>(undefined);
  const rendererRef = useRef<WebGLRenderer | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      rendererRef.current?.updateScale();
    };

    rendererRef.current = new WebGLRenderer(canvas);
    rendererRef.current.setup();
    rendererRef.current.init();
    resize();

    const loop = (now: number) => {
      rendererRef.current?.render(now);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    return () => {
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rendererRef.current?.reset();
    };
  }, []);

  return canvasRef;
};

// ─── Stat card ────────────────────────────────────────────────────────────────
interface StatCardProps {
  value: string;
  label: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className={cn(
      'flex flex-col items-center justify-center p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10',
      className
    )}
  >
    <div className="text-5xl md:text-7xl font-black text-orange-300 mb-2">{value}</div>
    <div className="text-sm md:text-base text-orange-100/80 font-medium text-center">{label}</div>
  </motion.div>
);

// ─── Main component ───────────────────────────────────────────────────────────
const NepalHero: React.FC = () => {
  const canvasRef = useShaderBackground();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <>
      <style>{`
        @keyframes nepal-fade-up {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .nepal-fade-up   { animation: nepal-fade-up 0.8s ease-out forwards; opacity: 0; }
        .nepal-delay-200 { animation-delay: 0.2s; }
        .nepal-delay-400 { animation-delay: 0.4s; }
        .nepal-delay-600 { animation-delay: 0.6s; }
        .nepal-delay-800 { animation-delay: 0.8s; }
      `}</style>

      <div ref={containerRef} className="relative w-full min-h-screen bg-black overflow-hidden">
        {/* WebGL canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full touch-none"
          style={{ background: 'black' }}
        />

        {/* Content */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20"
        >
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-block mb-6 px-6 py-3 bg-orange-500/10 backdrop-blur-md border border-orange-300/30 rounded-full">
                <span className="text-orange-100 text-sm font-semibold">The 0.5% Vision</span>
              </div>

              <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 nepal-fade-up nepal-delay-200">
                <span className="bg-gradient-to-r from-orange-300 via-yellow-400 to-amber-300 bg-clip-text text-transparent">
                  If only 0.5%
                </span>
              </h2>

              <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 nepal-fade-up nepal-delay-400">
                <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent">
                  Nepal Transforms
                </span>
              </h3>

              <p className="text-lg md:text-xl lg:text-2xl text-orange-100/90 max-w-4xl mx-auto leading-relaxed mb-12 nepal-fade-up nepal-delay-600">
                If only 0.5% of travelers from India and China visit Nepal annually, Nepal's economy
                and global image can transform dramatically.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 nepal-fade-up nepal-delay-800">
              <StatCard value="2.84B" label="Potential travelers from India + China" />
              <StatCard value="0.5%"  label="Target tourism penetration rate" />
              <StatCard value="14.2M" label="Visitors that could change Nepal forever" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-lg md:text-xl text-orange-100/80 max-w-3xl mx-auto mb-10 leading-relaxed">
                Nepal possesses extraordinary tourism potential — from the Himalayas to ancient heritage
                sites, from the birthplace of Buddha to diverse cultures and traditions. We propose a
                powerful documentary film to amplify this vision internationally.
              </p>

              <button className="px-10 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-orange-500/25">
                Learn More About The Vision
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default NepalHero;
