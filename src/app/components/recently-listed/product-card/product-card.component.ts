import { Component, HostListener, Input, signal, ViewChild } from '@angular/core';
import { Product } from '../../../model/product.model';
import { CurrencyPipe} from '@angular/common';
import {  Router } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { CartItemsService } from '../../../services/cart-items.service';
import { ToastComponent } from '../../toast/toast.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe, ToastComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {


  @Input() product!: Product;
  @ViewChild(ToastComponent)toast!: ToastComponent

  currentIndex = 0;
  itemsPerView = 4; // Adjust based on screen size
  isItemInCart:boolean = false
  quantity = signal(1); // Tracks the current quantity

  
  products! : Product[]
 
  constructor(private router : Router,private productService : ProductsService,private cartItemsService : CartItemsService){
    this.products = this.productService.getProducts()
  }
  
  get maxIndex(): number {
    return Math.max(0, this.products.length - this.itemsPerView);
  }
  
  next() {
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  // addToCart() {
    
  // }


  addToCart(event : Event) : void {
    event.stopPropagation();

    this.isItemInCart = true;

    this.cartItemsService.addItemToCart({
      id:this.product.id,
      name:this.product.name || '',
      price:this.product.price || NaN,
      unit:this.product.unit || '',
      image:this.product.image || '',
      description : this.product.description || '',
      quantity:this.quantity()
    })

    this.toast.toastMessage = `Added ${this.quantity()}kg of ${this.product.name} to the cart`
    this.toast.showToast = true

    setTimeout(() => this.toast.showToast = false, 3000);
  }

  viewDetails(id : string) {
    this.router.navigate(['product-details',id]);
  }

  incrementQuantity(event : Event) {
    event.stopPropagation()
    this.quantity.update(quantity => quantity+ 0.5); // Increment quantity
    
  }

  decrementQuantity(event : Event) {
    event.stopPropagation()
    if (this.quantity() > 1) {
      this.quantity.update(quantity => quantity - 0.5);
    } else {
      this.isItemInCart = false; // Remove from cart if quantity reaches 0
    }
  }
  
}
