/**
 * GSS Congo — Motion utilities.
 * Centralises:
 *  - Lenis smooth scroll (touch-disabled, respects reduced-motion)
 *  - IntersectionObserver-based reveals (data-reveal)
 *  - KPI count-up animation (data-counter)
 *  - Top page-progress hairline (data-progress)
 *
 * GSAP + ScrollTrigger are imported on demand inside specific components
 * (e.g., Method.astro) to keep the homepage JS budget under 60 KB gzipped.
 */

import Lenis from 'lenis';

export function respectsReducedMotion(): boolean {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/* ------------------------------------------------------------------ */
/*  LENIS                                                              */
/* ------------------------------------------------------------------ */

let lenisInstance: Lenis | null = null;

export function initLenis(): Lenis | null {
  if (typeof window === 'undefined') return null;
  if (lenisInstance) return lenisInstance;

  // Touch devices keep native scroll (BRAND §5.3).
  const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  if (isTouch || respectsReducedMotion()) return null;

  // Lerp mode: each frame the scroll position moves `lerp` fraction of
  // the way toward the target (target = wherever the wheel/keyboard input
  // has pushed us to). Feels more natural + responsive than duration mode
  // — fast flicks decelerate smoothly, small scrolls settle fast, no
  // queued ease sequence. 0.1 is the standard "premium studio" tuning.
  //   0    = no smoothing (native scroll)
  //   0.05 = very smooth, slow settle
  //   0.1  = standard
  //   0.15 = snappy
  //   1    = instant (no smoothing)
  lenisInstance = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1,
  });

  function raf(time: number) {
    lenisInstance?.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  return lenisInstance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

/* ------------------------------------------------------------------ */
/*  REVEALS — data-reveal="up" | "fade" | "mask"                       */
/* ------------------------------------------------------------------ */

export function initReveals(root: ParentNode = document): void {
  if (typeof window === 'undefined') return;

  // Opt the document into JS-driven reveals; CSS uses html.js [data-reveal] selector.
  // If this script never runs, the html.js class is absent and content stays visible.
  document.documentElement.classList.add('js');

  const reduced = respectsReducedMotion();
  const elements = root.querySelectorAll<HTMLElement>('[data-reveal]');

  if (reduced) {
    elements.forEach((el) => el.setAttribute('data-revealed', 'true'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const delay = Number(el.dataset.revealDelay ?? 0);
          window.setTimeout(() => {
            el.setAttribute('data-revealed', 'true');
          }, delay);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ------------------------------------------------------------------ */
/*  COUNT-UP — data-counter="11" data-counter-display="11"             */
/* ------------------------------------------------------------------ */

export function initCounters(root: ParentNode = document): void {
  if (typeof window === 'undefined') return;
  if (respectsReducedMotion()) return;

  const counters = root.querySelectorAll<HTMLElement>('[data-counter]');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
}

function animateCounter(el: HTMLElement): void {
  const target = el.dataset.counter ?? '';
  const display = el.dataset.counterDisplay ?? target;
  const numeric = Number(target);

  if (Number.isNaN(numeric) || !Number.isFinite(numeric)) {
    // Non-numeric (e.g., "24/7", "< 20") — fade-in only.
    el.textContent = display;
    el.setAttribute('data-counter-done', 'true');
    return;
  }

  const duration = 1200;
  const start = performance.now();

  function tick(now: number) {
    const elapsed = now - start;
    const t = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - t, 4);
    const value = Math.round(numeric * eased);
    el.textContent = String(value);
    if (t < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = display;
      el.setAttribute('data-counter-done', 'true');
    }
  }
  requestAnimationFrame(tick);
}

/* ------------------------------------------------------------------ */
/*  PAGE PROGRESS HAIRLINE                                             */
/* ------------------------------------------------------------------ */

export function initProgress(): void {
  if (typeof window === 'undefined') return;
  const bar = document.querySelector<HTMLElement>('[data-progress]');
  if (!bar) return;

  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? window.scrollY / max : 0;
    bar.style.transform = `scaleX(${Math.min(Math.max(ratio, 0), 1)})`;
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

/* ------------------------------------------------------------------ */
/*  GLOW TRACKER — sets --x/--xp/--y/--yp on <html> from pointer.      */
/*  Powers .glow-card spotlight / cursor-following border bloom.        */
/* ------------------------------------------------------------------ */

export function initGlowTracker(): void {
  if (typeof window === 'undefined') return;
  if (respectsReducedMotion()) return;

  // Skip on touch devices — no continuous pointer to track.
  const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  if (isTouch) return;

  const root = document.documentElement;

  const update = (e: PointerEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    root.style.setProperty('--x', x.toFixed(2));
    root.style.setProperty('--xp', (x / window.innerWidth).toFixed(3));
    root.style.setProperty('--y', y.toFixed(2));
    root.style.setProperty('--yp', (y / window.innerHeight).toFixed(3));
  };

  document.addEventListener('pointermove', update, { passive: true });
}

/* ------------------------------------------------------------------ */
/*  ALL                                                                */
/* ------------------------------------------------------------------ */

export function initMotion(): void {
  initLenis();
  initReveals();
  initCounters();
  initProgress();
  initGlowTracker();
}
