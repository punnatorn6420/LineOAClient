export function isMobileOrSmallViewport(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;

  const ua = navigator.userAgent || '';
  const mobileUa = /Android|iPhone|iPad|iPod/i.test(ua);
  const smallViewport = window.matchMedia('(max-width: 768px)').matches;

  return mobileUa || smallViewport;
}

export function canUseDesktopAuthForDevelopment(): boolean {
  if (typeof window === 'undefined') return false;

  const params = new URLSearchParams(window.location.search);
  const flag = params.get('desktopAuth') === '1';

  if (flag) {
    sessionStorage.setItem('desktopAuth', '1');
    return true;
  }

  return sessionStorage.getItem('desktopAuth') === '1';
}
