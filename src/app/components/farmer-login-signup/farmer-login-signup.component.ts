import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FarmerService } from '../../services/farmer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-farmer-login-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './farmer-login-signup.component.html',
  styleUrl: './farmer-login-signup.component.css'
})
export class FarmerLoginSignupComponent {

  private farmerService = inject(FarmerService)
  private router = inject(Router)
  formDirty = false; // Tracks if the form has unsaved changes

  isLoginTab: boolean = true;
  isSubmitted:boolean=false

  // userType: 'farmer' | 'user' = 'farmer';

  // Login Form Data
  loginForm = {
    firstname: '',
    lastname: '',
    password: ''
  };

  // Farmer Signup Form Data
  farmerForm = {
    firstname: '',
    lastname: '',
    age: null as number | null,
    gender: '',
    image: null as File | null,
    password:''
  };


  // Password visibility toggles
  showLoginPassword: boolean = true;

  // Switch between Login and Signup tabs
  setTab(tab: 'login' | 'signup') {
    this.isLoginTab = tab === 'login';
  }

  // Switch between Farmer and User forms for Signup


  // Toggle password visibility for Login
  togglePasswordVisibility(type: 'login') {
    if (type === 'login') {
      this.showLoginPassword = !this.showLoginPassword;
    }
  }

  onFormChange() {
    this.formDirty = true;
  }

  canDeactivate(): boolean {
    if (this.formDirty && !this.isSubmitted) {
      return confirm('You have unsaved changes. Do you really want to leave?');
    }
    return true;
  }

  // Login form submission
  login() {
    if (!this.loginForm.firstname || !this.loginForm.lastname || !this.loginForm.password) {
      alert('Please fill in all login fields.');
      return;
    }
    this.isSubmitted = true
    const farmerData = this.farmerService.getFarmerDataByCredentials(this.loginForm.password)

    if(!farmerData){
      alert('User doesn\'t exists. Please Register to continue');
      return;

    }
    else{
      this.farmerService.setFarmerData(farmerData)
      this.router.navigate(['/home','farmer'])
    }


    // Handle login logic (e.g., API call)
    console.log('Logging in:', this.loginForm);
  }

  // Signup form submission
  signup() {
      const { firstname, lastname, age, gender,password } = this.farmerForm;
      if (!firstname || !lastname || !age || !gender || !password) {
        alert('Please fill in all farmer details.');
        return;
      }
      this.isSubmitted=true
      const photoId = Math.floor(Math.random()*100)
      this.farmerService.addFarmer({
        id : String(photoId),
        firstname,
        lastname,
        age,
        gender,
        password,
        image: `https://randomuser.me/api/portraits/men/${photoId}.jpg`
      })

      this.farmerService.setFarmerData({
        id : String(photoId),
        firstname,
        lastname,
        age,
        gender,
        password,
        image: `https://randomuser.me/api/portraits/men/${photoId}.jpg`
      })

      const farmerAuthToken = this.farmerService.makeAuthToken(Math.floor(Math.random()*10))
      localStorage.setItem('farmerAuthToken', farmerAuthToken);
      
      this.farmerForm.firstname=''
      this.farmerForm.lastname=''
      this.farmerForm.gender=''
      this.farmerForm.password=''
      this.farmerForm.age=null
      this.farmerForm.image=null

       this.router.navigate(['/home','farmer'])
    
  }

  switchForm(formType: string): void {
    this.isLoginTab = formType === 'login';
  }

}
