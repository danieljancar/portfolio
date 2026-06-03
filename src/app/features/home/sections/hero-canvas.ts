import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  PLATFORM_ID,
  afterNextRender,
  inject,
  viewChild,
} from '@angular/core';

const VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float u_time;
  uniform vec2 u_res;

  // Brand palette
  const vec3 c1 = vec3(0.456, 0.501, 1.0);   // brand-400 #7480ff
  const vec3 c2 = vec3(0.333, 0.376, 0.961); // brand-500 #5560f5
  const vec3 c3 = vec3(0.941, 0.671, 0.988); // accent  #f0abfc

  void main() {
    vec2 uv = vUv;
    float ratio = u_res.x / max(u_res.y, 1.0);
    uv.x *= ratio;

    float t = u_time * 0.12;

    // Soft drifting gradient via domain-warped sines.
    float w = sin(uv.x * 3.0 + t) * 0.5
            + sin(uv.y * 2.5 - t * 1.3) * 0.5
            + sin((uv.x + uv.y) * 2.0 + t * 0.7) * 0.5;
    w = w * 0.5 + 0.5;

    float v = sin(uv.y * 3.5 + w * 2.0 + t * 0.9) * 0.5 + 0.5;

    vec3 col = mix(c1, c2, smoothstep(0.2, 0.8, w));
    col = mix(col, c3, smoothstep(0.55, 1.0, v) * 0.5);

    // Vignette so it fades into the page edges.
    float d = distance(vUv, vec2(0.5));
    float alpha = smoothstep(0.85, 0.15, d) * 0.55;

    gl_FragColor = vec4(col, alpha);
  }
`;

@Component({
  selector: 'app-hero-canvas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <canvas
      #canvas
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 z-0 size-full opacity-70 blur-[2px]"
    ></canvas>
  `,
})
export class HeroCanvas {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);
  private readonly canvasRef =
    viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  constructor() {
    afterNextRender(() => {
      void this.init();
    });
  }

  private async init(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduced || window.innerWidth < 768) {
      return;
    }

    const THREE = await import('three');
    let disposed = false;
    this.destroyRef.onDestroy(() => {
      disposed = true;
    });
    if (disposed) {
      return;
    }

    const canvas = this.canvasRef().nativeElement;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      u_time: { value: 0 },
      u_res: { value: new THREE.Vector2(1, 1) },
    };
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      uniforms,
      transparent: true,
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      renderer.setSize(clientWidth, clientHeight, false);
      uniforms.u_res.value.set(clientWidth, clientHeight);
    };
    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    const clock = new THREE.Clock();
    let frame = 0;
    let running = true;

    const loop = () => {
      if (!running) {
        return;
      }
      uniforms.u_time.value = clock.getElapsedTime();
      renderer.render(scene, camera);
      frame = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frame);
      } else if (!running) {
        running = true;
        clock.getDelta();
        loop();
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    loop();

    this.destroyRef.onDestroy(() => {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      material.dispose();
      mesh.geometry.dispose();
      renderer.dispose();
    });
  }
}
