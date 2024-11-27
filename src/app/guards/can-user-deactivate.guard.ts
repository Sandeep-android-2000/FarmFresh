import { CanDeactivateFn } from '@angular/router';
import { UserLoginSignupComponent } from '../components/user-login-signup/user-login-signup.component';

export const canUserDeactivateGuard: CanDeactivateFn<UserLoginSignupComponent> = (component, currentRoute, currentState, nextState) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};
