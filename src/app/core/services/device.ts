export function isMobile(): boolean {
  const ua = navigator.userAgent || '';
  const mobileUa = /Android|iPhone|iPad|iPod/i.test(ua);
  const smallViewport = window.matchMedia('(max-width: 768px)').matches;
  return mobileUa || smallViewport;
}
