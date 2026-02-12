export function isMobile(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }

  const ua = navigator.userAgent || '';
  const mobileUa = /Android|iPhone|iPad|iPod/i.test(ua);
  const smallViewport = window.matchMedia('(max-width: 768px)').matches;
  return mobileUa || smallViewport;
}

export function canUseDesktopAuthForDevelopment(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const params = new URLSearchParams(window.location.search);
  return params.get('desktopAuth') === '1';
}
