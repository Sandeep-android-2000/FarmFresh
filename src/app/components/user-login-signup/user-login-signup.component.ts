import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-login-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-login-signup.component.html',
  styleUrl: './user-login-signup.component.css'
})
export class UserLoginSignupComponent {
  isLoginTab: boolean = true;
  formDirty:boolean = false;
  isSubmitted:boolean = false;

  private userService = inject(UserService)
  private router = inject(Router)

  // Login Form Data
  loginForm = {
    email: '',
    password: ''
  };



  // User Signup Form Data
  userForm = {
    firstname: '',
    lastname: '',
    ageGroup: null,
    gender: '',
    email:'',
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
    if (!this.loginForm.email || !this.loginForm.password) {
      alert('Please fill in all login fields.');
      return;
    }
    const user = this.userService.getUserByCredentials(this.loginForm.email,this.loginForm.password);
    if(user){
      this.isSubmitted=true
      this.router.navigate(['/home','user'])
    }else{
      alert(`user doesn't exists`);
      return;
    }
  }

  // Signup form submission
  signup() {
    
    const { firstname, lastname, ageGroup, email,gender,password } = this.userForm;
    if (!password || !email || !firstname || !lastname || !ageGroup || !gender) {
      alert('Please fill in all user details.');
      return;
    }

      this.userService.addUser({
        firstname: this.userForm.firstname,
        lastname:this.userForm.lastname,
        age : this.userForm.ageGroup,
        gender: this.userForm.gender,
        password:this.userForm.password,
        email:this.userForm.email
      })

      const authToken = this.userService.makeAuthToken(Math.floor(Math.random()*10))
      this.isSubmitted=true
      localStorage.setItem('authToken', authToken);
      this.router.navigate(['/home','user'])

      // this.userForm.password=''
      // this.userForm.firstname=''
      // this.userForm.lastname=''
      // this.userForm.gender=''
      // this.userForm.ageGroup=null
      // this.userForm.email=''
  }

  switchForm(formType: string): void {
    this.isLoginTab = formType === 'login';
  }

}
