
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  private router=inject(Router)


  navigateToUserComponent(){
    this.router.navigate(['home','user'])
  }

  navigateToFarmerComponent(){
    this.router.navigate(['home','farmer'])
  }

  navigateToFarmerLoginSignup() {
    this.router.navigate(['/farmer-login-signup'])
  }
  navigateToUserLoginSignup() {
    this.router.navigate(['/user-login-signup'])
  }
  

}
