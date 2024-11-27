import { CanActivateFn, Router } from '@angular/router';
import { FarmerService } from '../services/farmer.service';
import { inject } from '@angular/core';

export const farmerAuthGuard: CanActivateFn = (route, segments) => {
  const farmerService = inject(FarmerService)

  const isLoggedIn = farmerService.isFarmerLoggedIn();

  const router = new Router(); // Router for redirection
  if (!isLoggedIn) {
    router.navigate(['/farmer-login-signup']); // Redirect to login
    return false;
  }
  return true;
};
