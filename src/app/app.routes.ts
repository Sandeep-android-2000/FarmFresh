import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { userAuthGuard } from './guards/user-auth.guard';
import { farmerAuthGuard } from './guards/farmer-auth.guard';
import {  canFarmerDeactivateGuard } from './guards/can-farmer-deactivate.guard';
import { canUserDeactivateGuard } from './guards/can-user-deactivate.guard';

export const routes: Routes = [
    {
      path: '', // Default route
      redirectTo: 'home', // Redirect to '/home'
      pathMatch: 'full', // Ensures the full path is matched
    },
    {
      path: 'home', // Home route with child routes
      component: HomeComponent 
    },
    {
        path: 'home/user',
        loadComponent: () => import('./components/home/user/user.component').then(mod => mod.UserComponent),  
        canActivate:[userAuthGuard]  
    },
    {  
        path: 'home/farmer',
        loadComponent: () => import('./components/home/farmer/farmer.component').then(mod => mod.FarmerComponent),  
        canActivate:[farmerAuthGuard]   
    },
    {
      path: 'product-details/:productId', // Product details route
      loadComponent: () =>
        import('./components/product-details/product-details.component').then(mod => mod.ProductDetailsComponent),
      canActivate: [userAuthGuard],
    },

    {
      path:'user-login-signup',
      loadComponent: ()=>import('./components/user-login-signup/user-login-signup.component').then(mod => mod.UserLoginSignupComponent),

      canDeactivate:[canUserDeactivateGuard]



    },
    {
      path:'farmer-login-signup',
      loadComponent: ()=>import('./components/farmer-login-signup/farmer-login-signup.component').then(mod => mod.FarmerLoginSignupComponent),

      canDeactivate:[canFarmerDeactivateGuard]

    },
    {
      path: '**', // Wildcard route
      redirectTo: 'home', // Redirect to '/home'
    },
  ];