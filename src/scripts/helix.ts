import {
  DoubleSide,
  Fog,
  Group,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Raycaster,
  Scene,
  SRGBColorSpace,
  TextureLoader,
  Vector2,
  WebGLRenderer,
} from 'three';

export interface Tile {
  src: string;
  href: string;
  aspect: number;
}

const RADIUS = 3.4;
const STEP = (Math.PI * 2) / 7;
const PITCH = 0.36;
const HEIGHT = 1.3;
const BACKGROUND = 0x060705;
const RESTING = 0.78;

function curvedPlane(width: number, height: number): PlaneGeometry {
  const geometry = new PlaneGeometry(width, height, 24, 1);
  const position = geometry.attributes.position;
  for (let i = 0; i < position.count; i++) {
    const angle = position.getX(i) / RADIUS;
    position.setX(i, Math.sin(angle) * RADIUS);
    position.setZ(i, Math.cos(angle) * RADIUS - RADIUS);
  }
  geometry.computeVertexNormals();
  return geometry;
}

export function mountHelix(
  root: HTMLElement,
  canvas: HTMLCanvasElement,
  tiles: Tile[],
): void {
  if (tiles.length === 0) return;

  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch {
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new Scene();
  scene.fog = new Fog(BACKGROUND, 7, 15);
  const camera = new PerspectiveCamera(38, 1, 0.1, 60);
  const helix = new Group();
  scene.add(helix);

  const loader = new TextureLoader();
  const meshes = tiles.map((tile, i) => {
    const width = HEIGHT * MathUtils.clamp(tile.aspect, 0.66, 1.5);
    const material = new MeshBasicMaterial({
      side: DoubleSide,
      transparent: true,
      opacity: 0,
    });
    material.color.setScalar(RESTING);
    loader.load(tile.src, texture => {
      texture.colorSpace = SRGBColorSpace;
      material.map = texture;
      material.needsUpdate = true;
      material.userData.loaded = true;
    });
    const mesh = new Mesh(curvedPlane(width, HEIGHT), material);
    const angle = i * STEP;
    mesh.position.set(
      Math.sin(angle) * RADIUS,
      i * PITCH - ((tiles.length - 1) * PITCH) / 2,
      Math.cos(angle) * RADIUS,
    );
    mesh.rotation.y = angle;
    mesh.userData = { href: tile.href, scale: 1 };
    helix.add(mesh);
    return mesh;
  });

  const away = new Vector2(10, 10);
  const rest = new Vector2();
  const pointer = away.clone();
  const tilt = new Vector2();
  const raycaster = new Raycaster();
  let hovered: Mesh | undefined;
  let spin = 0;
  let visible = true;
  let frame = 0;

  const resize = () => {
    const { width, height } = root.getBoundingClientRect();
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(root);
  resize();

  root.addEventListener('pointermove', event => {
    const rect = root.getBoundingClientRect();
    pointer.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
    );
  });
  root.addEventListener('pointerleave', () => pointer.copy(away));
  canvas.addEventListener('click', () => {
    if (hovered) window.location.href = hovered.userData.href;
  });

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible && !frame) frame = requestAnimationFrame(render);
  }).observe(root);

  function render() {
    frame = 0;
    if (!visible) return;

    const progress = MathUtils.clamp(window.scrollY / root.offsetHeight, 0, 1);
    const narrow = camera.aspect < 0.8;

    spin += 0.0016 + progress * 0.01;
    tilt.lerp(pointer.equals(away) ? rest : pointer, 0.05);
    helix.rotation.y = spin + tilt.x * 0.35;
    helix.rotation.x = -0.12 - tilt.y * 0.12 + progress * 0.35;
    helix.position.y = progress * 2.2;

    camera.position.set(0, 0.4, (narrow ? 13 : 10) - progress * 7);
    camera.lookAt(0, 0, 0);

    raycaster.setFromCamera(pointer, camera);
    const hit = raycaster.intersectObjects(meshes, false)[0]?.object as
      Mesh | undefined;
    if (hit !== hovered) {
      hovered = hit;
      canvas.dataset.cursor = hit ? 'View' : '';
      canvas.style.cursor = hit ? 'pointer' : '';
    }

    for (const mesh of meshes) {
      const material = mesh.material as MeshBasicMaterial;
      const active = mesh === hovered;
      if (material.userData.loaded)
        material.opacity = Math.min(1, material.opacity + 0.03);
      const target = active ? 1.14 : 1;
      mesh.userData.scale += (target - mesh.userData.scale) * 0.12;
      mesh.scale.setScalar(mesh.userData.scale);
      const shade = active ? 1 : RESTING;
      material.color.setScalar(
        material.color.r + (shade - material.color.r) * 0.12,
      );
    }

    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
  }

  root.classList.add('is-3d');
  frame = requestAnimationFrame(render);
}
