import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private Users: User[] = []

  getAllUsers(){
    return this.Users;
  }

  getUserByCredentials(email:string,password:string){
    return this.Users.find((user)=> user.email === email && user.password === password)
  }

  addUser(user : User){
    this.Users.push(user); 
    console.log(this.Users)
  }

   makeAuthToken(length : number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  isUserLoggedIn(): boolean {
    // Example: Check if the user is logged in by checking for an auth token
    return !!localStorage.getItem('authToken');
  }
}
