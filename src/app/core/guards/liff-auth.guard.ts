import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LiffService } from '../services/liff.service';
import { PlatformService } from '../services/platform.service';

export const liffAuthGuard: CanActivateFn = async () => {
  const platform = inject(PlatformService);
  const liffService = inject(LiffService);
  const router = inject(Router);

  if (!platform.isBrowser) {
    return true;
  }

  if (!platform.isLiffEnvironment) {
    return router.createUrlTree(['/landing']);
  }

  await liffService.init();

  if (!liffService.isInitialized() || !liffService.isLoggedIn()) {
    return router.createUrlTree(['/landing']);
  }

  return true;
};
