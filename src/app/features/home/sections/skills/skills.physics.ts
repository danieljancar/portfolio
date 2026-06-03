export interface Body {
  el: HTMLElement;
  x: number;
  y: number;
  w: number;
  h: number;
  vx: number;
  vy: number;
  dragging: boolean;
}

/**
 * Lightweight 2D rigid-body simulation for the draggable skill pills:
 * gravity, wall bouncing, pointer repulsion and box-collision resolution.
 * Pure geometry — it never touches the DOM; the component reads `bodies`
 * after each `step` and applies the transforms.
 */
export class SkillsPhysics {
  private static readonly GRAVITY = 2200;
  private static readonly RESTITUTION = 0.35;
  private static readonly POINTER_RADIUS = 120;

  readonly bodies: Body[] = [];

  private width = 0;
  private height = 0;
  private pointer: { x: number; y: number } | null = null;
  private grabbed: Body | null = null;
  private grabDx = 0;
  private grabDy = 0;

  setBounds(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  add(el: HTMLElement, w: number, h: number): Body {
    const body: Body = {
      el,
      w,
      h,
      x: Math.random() * Math.max(1, this.width - w),
      y: -Math.random() * this.height,
      vx: (Math.random() - 0.5) * 200,
      vy: 0,
      dragging: false,
    };
    this.bodies.push(body);
    return body;
  }

  bodyForElement(el: Element | null): Body | undefined {
    return el ? this.bodies.find(b => b.el === el) : undefined;
  }

  grab(body: Body, pointerX: number, pointerY: number): void {
    this.grabbed = body;
    this.grabDx = pointerX - body.x;
    this.grabDy = pointerY - body.y;
    body.dragging = true;
    body.vx = 0;
    body.vy = 0;
  }

  movePointer(x: number, y: number): void {
    this.pointer = { x, y };
    const body = this.grabbed;
    if (!body) {
      return;
    }
    const nx = this.clamp(x - this.grabDx, 0, this.width - body.w);
    const ny = this.clamp(y - this.grabDy, 0, this.height - body.h);
    body.vx = (nx - body.x) / (1 / 60);
    body.vy = (ny - body.y) / (1 / 60);
    body.x = nx;
    body.y = ny;
  }

  release(): void {
    if (this.grabbed) {
      this.grabbed.dragging = false;
      this.grabbed = null;
    }
  }

  clearPointer(): void {
    this.pointer = null;
  }

  shake(): void {
    for (const b of this.bodies) {
      if (b.dragging) {
        continue;
      }
      b.vy -= 500 + Math.random() * 700;
      b.vx += (Math.random() - 0.5) * 1200;
    }
  }

  step(dt: number): void {
    const { GRAVITY, RESTITUTION, POINTER_RADIUS } = SkillsPhysics;

    for (const b of this.bodies) {
      if (b.dragging) {
        continue;
      }

      if (this.pointer) {
        const cx = b.x + b.w / 2;
        const cy = b.y + b.h / 2;
        const dx = cx - this.pointer.x;
        const dy = cy - this.pointer.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < POINTER_RADIUS * POINTER_RADIUS && distSq > 1) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / POINTER_RADIUS) * 1800;
          b.vx += (dx / dist) * force * dt;
          b.vy += (dy / dist) * force * dt;
        }
      }

      b.vy += GRAVITY * dt;
      b.x += b.vx * dt;
      b.y += b.vy * dt;

      if (b.x < 0) {
        b.x = 0;
        b.vx = -b.vx * RESTITUTION;
      } else if (b.x + b.w > this.width) {
        b.x = this.width - b.w;
        b.vx = -b.vx * RESTITUTION;
      }
      if (b.y < 0) {
        b.y = 0;
        b.vy = -b.vy * RESTITUTION;
      } else if (b.y + b.h > this.height) {
        b.y = this.height - b.h;
        b.vy = -b.vy * RESTITUTION;
        b.vx *= 0.82;
      }
    }

    for (let iter = 0; iter < 4; iter++) {
      this.resolveCollisions();
    }

    for (const b of this.bodies) {
      b.x = this.clamp(b.x, 0, Math.max(0, this.width - b.w));
      b.y = this.clamp(b.y, 0, Math.max(0, this.height - b.h));
    }
  }

  private resolveCollisions(): void {
    const bodies = this.bodies;
    for (let i = 0; i < bodies.length; i++) {
      for (let j = i + 1; j < bodies.length; j++) {
        const a = bodies[i];
        const b = bodies[j];

        const overlapX = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
        if (overlapX <= 0) {
          continue;
        }
        const overlapY = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
        if (overlapY <= 0) {
          continue;
        }

        const aMovable = a.dragging ? 0 : 1;
        const bMovable = b.dragging ? 0 : 1;
        const total = aMovable + bMovable;
        if (total === 0) {
          continue;
        }

        if (overlapX < overlapY) {
          const dir = a.x + a.w / 2 < b.x + b.w / 2 ? -1 : 1;
          a.x += dir * overlapX * (aMovable / total);
          b.x -= dir * overlapX * (bMovable / total);
          const vx = (a.vx + b.vx) / 2;
          if (aMovable) {
            a.vx = vx * 0.6;
          }
          if (bMovable) {
            b.vx = vx * 0.6;
          }
        } else {
          const dir = a.y + a.h / 2 < b.y + b.h / 2 ? -1 : 1;
          a.y += dir * overlapY * (aMovable / total);
          b.y -= dir * overlapY * (bMovable / total);
          const vy = (a.vy + b.vy) / 2;
          if (aMovable) {
            a.vy = vy * 0.6;
          }
          if (bMovable) {
            b.vy = vy * 0.6;
          }
        }
      }
    }
  }

  private clamp(v: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, v));
  }
}
