import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private products: Product[] = [
    {
      id: '1',
      name: 'Fresh Local Vine Tomatoes',
      price: 120.80,
      unit: '1kg',
      image: '/vegetable-images/tomato.png',
      description: 'Our Fresh Local Vine Tomatoes are handpicked at the peak of ripeness to ensure an explosion of flavor and a vibrant red color. Perfect for salads, sauces, and fresh snacking, these tomatoes are grown using sustainable farming practices. With a juicy texture and a slight tang, they add a fresh burst to any dish. Enjoy the authentic taste of locally sourced produce with every bite.',
      farmer: [
        { 
          id: '1', 
          firstname: 'John', 
          lastname: 'Doe',
          age:29,
          gender:'Male',
          image: 'https://randomuser.me/api/portraits/men/1.jpg', 
          rating: 4.5 
        } 
      ]
    },
    {
      id: '2',
      name: 'Fresh Yukon Gold Potatoes',
      price: 140.50,
      unit: '2kg',
      image: '/vegetable-images/potato.png',
      description: 'These Yukon Gold Potatoes are known for their smooth, golden flesh and buttery flavor. Ideal for mashing, roasting, or boiling, they are a versatile addition to your kitchen. Their creamy texture and rich flavor make them a favorite for comfort food dishes. Sourced from sustainable farms, these potatoes are freshly harvested to bring you the best in quality and taste.',
      farmer: [
        { 
          id: '2', 
          firstname: 'Jane', 
          lastname:'Smith',
          age:36,
          gender:'Female',
          image: 'https://randomuser.me/api/portraits/men/15.jpg', 
          rating: 4.2 
        } 
      ]
    },
    {
      id: '3',
      name: 'Organic Red Onions',
      price: 35.99,
      unit: '1kg',
      image: '/vegetable-images/onions.png',
      description: 'Our Organic Red Onions are crisp, vibrant, and packed with flavor. With a mild yet slightly sweet taste, they’re perfect for salads, garnishes, and as a base for cooking. These onions are grown without synthetic pesticides or chemicals, ensuring a pure and natural taste that complements any meal. Add them to your favorite recipes for a burst of color and flavor.',
      farmer: [
        { 
          id: '3', 
          firstname: 'Samuel',
          lastname: 'Lee',
          age:35,
          gender:'Male',
          image: 'https://randomuser.me/api/portraits/men/34.jpg', 
          rating: 4.7 
        }
        
      ]
    },
    {
      id: '4',
      name: 'Fresh Green Bell Peppers',
      price: 50.99,
      unit: '500g',
      image: '/vegetable-images/bell-peppers.png',
      description: 'These Fresh Green Bell Peppers are crisp, refreshing, and full of nutrients. With their mild, slightly sweet taste, they are perfect for salads, stir-fries, or stuffed dishes. Grown with care to retain their crunch and color, these peppers are packed with vitamins and antioxidants. A healthy addition to any meal, they add a vibrant green hue and a fresh, crisp texture.',
      farmer: [
        { 
          id: '4', 
          firstname: 'Maria', 
          lastname: 'Garcia',
          age:32,
          gender:'Female',
          image: 'https://randomuser.me/api/portraits/men/45.jpg', 
          rating: 4.8 
        }
      ]
    },
    {
      id: '5',
      name: 'Organic Baby Carrots',
      price: 65.99,
      unit: '1kg',
      image: '/vegetable-images/baby-carrots.png',
      description: 'Our Organic Baby Carrots are small, tender, and perfect for snacking or adding to your favorite dishes. With a naturally sweet taste, they are perfect for kids and adults alike. These carrots are grown organically, ensuring a healthy and nutritious snack that’s free from synthetic chemicals. Their bright orange color and sweet, crunchy texture make them a delicious and versatile ingredient.',
      farmer: [
        { 
          id: '5', 
          firstname: 'Ahmed ', 
          lastname:'Khan',
          age:28,
          gender: 'Male',
          image: 'https://randomuser.me/api/portraits/men/90.jpg', 
          rating: 4.3 
        }  
      ]
    },
    {
      id: '6',
      name: 'Fresh Garden Cucumbers',
      price: 83.49,
      unit: '1kg',
      image: '/vegetable-images/garden-cucumbers.png',
      description: 'These Fresh Garden Cucumbers are cool, crisp, and hydrating. With a delicate flavor and crunchy texture, they’re perfect for salads, pickling, or eating fresh. These cucumbers are carefully grown to maintain their natural freshness and taste. They’re low in calories but high in hydration, making them a refreshing and healthy snack any time of the day.',
      farmer: [
        { 
          id: '4', 
          firstname: 'Maria', 
          lastname: 'Garcia',
          age:32,
          gender:'Female',
          image: 'https://randomuser.me/api/portraits/men/45.jpg', 
          rating: 4.8 
        }
      ]
    }
];



  getProducts(){
    return this.products;
  }

}
