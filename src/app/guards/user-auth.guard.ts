import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const userAuthGuard: CanActivateFn = (route, state) => {


  const userService = inject(UserService)

  const isLoggedIn = userService.isUserLoggedIn();

  // const isLoggedIn = !!localStorage.getItem('authToken'); 
  const router = inject(Router) ; // Router for redirection
  if (!isLoggedIn) {
    router.navigate(['/user-login-signup']); // Redirect to login
    return false;
  }
  return true;
  
};
