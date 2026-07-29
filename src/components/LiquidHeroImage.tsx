"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

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
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uCoverScale;
  uniform vec2 uRippleCenters[${MAX_RIPPLES}];
  uniform float uRippleStarts[${MAX_RIPPLES}];

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
        offset += dir * wave * decay * falloff * 0.026;
      }
    }

    vec2 texUv = (vUv + offset - 0.5) * uCoverScale + 0.5;
    gl_FragColor = texture2D(uTexture, texUv);
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

export default function LiquidHeroImage({
  src,
  alt = "",
}: {
  src: string;
  alt?: string;
}) {
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
    const uCoverScale = gl.getUniformLocation(program, "uCoverScale");
    const uRippleCenters = gl.getUniformLocation(program, "uRippleCenters[0]");
    const uRippleStarts = gl.getUniformLocation(program, "uRippleStarts[0]");

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);

    let imageReady = false;
    let imgAspect = 1;
    const image = new window.Image();
    image.src = src;
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      imgAspect = image.naturalWidth / image.naturalHeight;
      imageReady = true;
      updateCoverScale();
    };

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

    function updateCoverScale() {
      if (!imageReady) return;
      const canvasAspect = canvas!.clientWidth / canvas!.clientHeight;
      let scaleX = 1;
      let scaleY = 1;
      if (imgAspect > canvasAspect) {
        scaleX = canvasAspect / imgAspect;
      } else {
        scaleY = imgAspect / canvasAspect;
      }
      gl!.uniform2f(uCoverScale, scaleX, scaleY);
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = container!.clientWidth;
      const height = container!.clientHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      gl!.viewport(0, 0, canvas!.width, canvas!.height);
      gl!.uniform2f(uResolution, canvas!.width, canvas!.height);
      updateCoverScale();
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const startTime = performance.now();
    window.setTimeout(() => addRipple(0.5, 0.45), 500);

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
  }, [src]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full cursor-crosshair" />
    </div>
  );
}
