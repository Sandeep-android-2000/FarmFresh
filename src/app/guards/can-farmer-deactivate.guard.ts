import { CanDeactivateFn } from '@angular/router';
import { FarmerLoginSignupComponent } from '../components/farmer-login-signup/farmer-login-signup.component';

export const canFarmerDeactivateGuard: CanDeactivateFn<FarmerLoginSignupComponent> = (component, currentRoute, currentState, nextState) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};
