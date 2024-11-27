import { Farmer } from "./farmer.model";

export interface Product {
    id:string,
    name: string;
    price: number;
    unit: string;
    image: string;
    farmer: Farmer[],
    description:string
  }