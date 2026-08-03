"use client";

import { useEffect, useRef } from "react";

const MAX_RIPPLES = 8;
const RIPPLE_LIFETIME = 2.4;

const VERTEX_SRC = `
  attribute vec2 aPosition;
  varying vec2 vUv;
  void main() {
    vUv = vec2(aPosition.x * 0.5 + 0.5, 1.0 - (aPosition.y * 0.5 + 0.5));
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const FRAGMENT_SRC = `
  precision mediump float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uRippleCenters[${MAX_RIPPLES}];
  uniform float uRippleStarts[${MAX_RIPPLES}];

  float blob(vec2 p, vec2 center, float radius) {
    float d = length(p - center);
    return smoothstep(radius, 0.0, d);
  }

  void main() {
    vec2 offset = vec2(0.0);

    for (int i = 0; i < ${MAX_RIPPLES}; i++) {
      float t = uTime - uRippleStarts[i];
      if (t > 0.0 && t < ${RIPPLE_LIFETIME.toFixed(1)}) {
        vec2 uvDelta = vUv - uRippleCenters[i];
        float dist = length(uvDelta * uResolution) / uResolution.y;
        float decay = exp(-t * 1.6) * (1.0 - t / ${RIPPLE_LIFETIME.toFixed(1)});
        float wave = sin(dist * 46.0 - t * 12.0) * 0.7
          + sin(dist * 26.0 - t * 7.5) * 0.3;
        float falloff = smoothstep(0.65, 0.0, dist);
        vec2 dir = dist > 0.0001 ? normalize(uvDelta) : vec2(0.0);
        offset += dir * wave * decay * falloff * 0.03;
      }
    }

    float aspect = uResolution.x / uResolution.y;
    vec2 p = vUv + offset;
    p.x *= aspect;
    float t = uTime * 0.06;

    vec2 c1 = vec2(0.32 * aspect, 0.4) + 0.07 * vec2(sin(t * 2.3), cos(t * 1.8));
    vec2 c2 = vec2(0.72 * aspect, 0.62) + 0.08 * vec2(cos(t * 1.6), sin(t * 2.1));
    vec2 c3 = vec2(0.52 * aspect, 0.78) + 0.06 * vec2(sin(t * 1.9 + 2.0), cos(t * 1.4 + 1.0));
    vec2 c4 = vec2(0.22 * aspect, 0.7) + 0.06 * vec2(cos(t * 2.0 + 1.5), sin(t * 1.7 + 0.5));
    vec2 c5 = vec2(0.6 * aspect, 0.28) + 0.07 * vec2(sin(t * 1.5 + 0.8), cos(t * 2.2 + 2.5));

    vec3 pink = vec3(0.973, 0.055, 0.357);
    vec3 lavender = vec3(0.910, 0.878, 1.0);
    vec3 babyblue = vec3(0.839, 0.933, 1.0);
    vec3 lime = vec3(0.839, 0.949, 0.42);

    vec3 col = vec3(0.984, 0.969, 0.996);
    col = mix(col, lavender, blob(p, c2, 0.5) * 0.85);
    col = mix(col, babyblue, blob(p, c3, 0.48) * 0.8);
    col = mix(col, lime, blob(p, c4, 0.32) * 0.5);
    col = mix(col, pink, blob(p, c1, 0.36) * 0.5);
    col = mix(col, lavender, blob(p, c5, 0.3) * 0.4);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function LiquidAura() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext("webgl", { premultipliedAlpha: false });
    if (!gl) return;

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, "uTime");
    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uRippleCenters = gl.getUniformLocation(program, "uRippleCenters[0]");
    const uRippleStarts = gl.getUniformLocation(program, "uRippleStarts[0]");

    const ripples = {
      centers: new Float32Array(MAX_RIPPLES * 2),
      starts: new Float32Array(MAX_RIPPLES).fill(-10),
      next: 0,
    };

    function addRipple(u: number, v: number) {
      const i = ripples.next;
      ripples.centers[i * 2] = u;
      ripples.centers[i * 2 + 1] = v;
      ripples.starts[i] = (performance.now() - startTime) / 1000;
      ripples.next = (i + 1) % MAX_RIPPLES;
    }

    function handlePointerDown(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      addRipple((e.clientX - rect.left) / rect.width, (e.clientY - rect.top) / rect.height);
    }
    canvas.addEventListener("pointerdown", handlePointerDown);

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = container!.clientWidth;
      const height = container!.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      gl!.uniform2f(uResolution, canvas!.width, canvas!.height);
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const startTime = performance.now();
    window.setTimeout(() => addRipple(0.5, 0.45), 400);

    let frameId: number;
    function render() {
      gl!.uniform1f(uTime, (performance.now() - startTime) / 1000);
      gl!.uniform2fv(uRippleCenters, ripples.centers);
      gl!.uniform1fv(uRippleStarts, ripples.starts);
      gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      frameId = requestAnimationFrame(render);
    }
    render();

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full cursor-crosshair" />
    </div>
  );
}
