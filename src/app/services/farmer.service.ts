import { Injectable, signal } from '@angular/core';
import { Farmer, FarmerCredentials } from '../model/farmer.model';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {

  private farmers: Farmer[] = [
    {
      id: '1',
      firstname: 'John',
      lastname: 'Doe',
      age: 29,
      gender: 'Male',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      rating: 4.5
    },
    {
      id: '2',
      firstname: 'Jane',
      lastname: 'Smith',
      age: 36,
      gender: 'Female',
      image: 'https://randomuser.me/api/portraits/men/15.jpg',
      rating: 4.2
    },
    {
      id: '3',
      firstname: 'Samuel',
      lastname: 'Lee',
      age: 35,
      gender: 'Male',
      image: 'https://randomuser.me/api/portraits/men/34.jpg',
      rating: 4.7
    },
    {
      id: '4',
      firstname: 'Maria',
      lastname: 'Garcia',
      age: 32,
      gender: 'Female',
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
      rating: 4.8
    },
    {
      id: '5',
      firstname: 'Ahmed',
      lastname: 'Khan',
      age: 28,
      gender: 'Male',
      image: 'https://randomuser.me/api/portraits/men/90.jpg',
      rating: 4.3
    }
  ]
  private farmerData: FarmerCredentials[] = []
  private farmer = signal<FarmerCredentials>(
    {
      id: '',
      firstname: '',
      lastname: '',
      age: NaN,
      gender: '',
      password: '',
      image: '',
    }
  )


  getFarmersData() {
    return this.farmers;
  }

  setFarmerData(farmerData: FarmerCredentials) {
    this.farmer.set(farmerData)
  }

  getFarmerData() {
    return this.farmer()
  }

  addFarmer(farmer: FarmerCredentials) {
    this.farmerData.push(farmer);
    console.log(this.farmerData)
  }

  getFarmerDataByCredentials(password: string) {
    return this.farmerData.find(data => data.password === password)
  }

  makeAuthToken(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  isFarmerLoggedIn(): boolean {
    // Example: Check if the user is logged in by checking for an auth token
    return !!localStorage.getItem('farmerAuthToken');
  }
}
