import { Injectable, signal } from '@angular/core';
import { CartItem } from '../model/cart-item.model';


@Injectable({
  providedIn: 'root'
})
export class CartItemsService {

  private CartItems : CartItem[] = []
  constructor() { }

  
  getCartItems(){
    return this.CartItems
  }


  addItemToCart(CartItem : CartItem){
    const existingItem = this.CartItems.find(item => item.id === CartItem.id);
    if (!existingItem) {
      this.CartItems.push(CartItem)
    } 
    
  }

  calculateTotal(cartItems: CartItem[]): number {
    return cartItems.reduce((sum, item) => {
      let qty = item.unit;
  
      // Extract numeric and unit parts
      let numericPart = parseFloat(qty);
      const unitPart = qty.replace(/[0-9.]/g, '').trim();
  
      // Convert grams to kilograms if the unit is 'g'
      if (unitPart === 'g') {
        numericPart = numericPart / 1000;
      }
  
      // Calculate total for the item and add it to the accumulator
      return sum + (item.price * item.quantity / numericPart);
    }, 0); // Initial value of sum is 0
  }
  calculateDeliveryCharge(){
    return  this.CartItems.length ? Math.random() * 50 : 0;
  }
  calculateHandlingCharge() {
    return this.CartItems.length ? Math.random() * 50 : 0;
  }
}
