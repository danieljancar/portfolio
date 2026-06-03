interface MorphElements {
  current: HTMLElement;
  next: HTMLElement;
}

/** Renders the first word with no animation (reduced-motion fallback). */
export function renderGooeyStatic(
  { current, next }: MorphElements,
  words: string[],
): void {
  current.textContent = words[0] ?? '';
  next.style.opacity = '0';
}

/**
 * Cross-fades through `words` using a blur/opacity "gooey" transition between
 * two stacked elements. Returns a disposer that stops the animation loop.
 */
export function startGooeyMorph(
  { current, next }: MorphElements,
  words: string[],
  morphTime: number,
  cooldownTime: number,
): () => void {
  let index = words.length - 1;
  let time = performance.now();
  let morph = 0;
  let cooldown = cooldownTime;
  let raf = 0;

  current.textContent = words[index % words.length];
  next.textContent = words[(index + 1) % words.length];

  const setMorph = (fraction: number) => {
    next.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    next.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
    const inv = 1 - fraction;
    current.style.filter = `blur(${Math.min(8 / inv - 8, 100)}px)`;
    current.style.opacity = `${Math.pow(inv, 0.4) * 100}%`;
  };

  const doCooldown = () => {
    morph = 0;
    next.style.filter = '';
    next.style.opacity = '100%';
    current.style.filter = '';
    current.style.opacity = '0%';
  };

  const doMorph = () => {
    morph -= cooldown;
    cooldown = 0;
    let fraction = morph / morphTime;
    if (fraction > 1) {
      cooldown = cooldownTime;
      fraction = 1;
    }
    setMorph(fraction);
  };

  const animate = () => {
    raf = requestAnimationFrame(animate);
    const now = performance.now();
    const shouldIncrement = cooldown > 0;
    const dt = (now - time) / 1000;
    time = now;
    cooldown -= dt;

    if (cooldown <= 0) {
      if (shouldIncrement) {
        index = (index + 1) % words.length;
        current.textContent = words[index % words.length];
        next.textContent = words[(index + 1) % words.length];
      }
      doMorph();
    } else {
      doCooldown();
    }
  };

  animate();
  return () => cancelAnimationFrame(raf);
}
