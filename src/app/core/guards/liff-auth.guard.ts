import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { LiffService } from '../services/liff.service';
import { PlatformService } from '../services/platform.service';

export const liffAuthGuard: CanActivateChildFn = async () => {
  const platform = inject(PlatformService);
  const liffService = inject(LiffService);

  if (!platform.isBrowser) {
    return true;
  }

  if (!platform.isLiffEnvironment) {
    console.warn('[LIFF] Blocked: not in LIFF environment.');
    return false;
  }

  await liffService.init();
  return liffService.isInitialized() && liffService.isLoggedIn();
};
