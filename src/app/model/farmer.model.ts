
  export interface Farmer {
    id:string,
    firstname: string,
    lastname: string,
    age: number,
    gender: string,
    image: string,
    rating: number,
  }

  export interface FarmerCredentials{
    id:string,
    firstname: string,
    lastname: string,
    age: number,
    gender: string,
    image: string;
    password: string,
  }