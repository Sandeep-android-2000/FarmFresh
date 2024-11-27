import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../model/product.model';
import { ProductCardComponent } from "./product-card/product-card.component";
import { ToastComponent } from "../toast/toast.component";

@Component({
  selector: 'app-recently-listed',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './recently-listed.component.html',
  styleUrl: './recently-listed.component.css'
})
export class RecentlyListedComponent {
  currentIndex = 0;
  itemsPerView = 5; // Adjust based on screen size

  
  products! : Product[]
 
  constructor(private router : Router,private productService : ProductsService){
    this.products = this.productService.getProducts()
  }
  
  get maxIndex(): number {
    return Math.max(0, this.products.length - this.itemsPerView);
  }
  
  ngOnInit() {
    this.updateItemsPerView(window.innerWidth);
  }
  
  updateItemsPerView(width: number) {
    if (width < 640) {
      this.itemsPerView = 1;
    } else if (width < 768) {
      this.itemsPerView = 2;
    } else if (width < 1024) {
      this.itemsPerView = 3;
    } else {
      this.itemsPerView = 4;
    }
    this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
  }
  
  next() {
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex = (this.currentIndex + 1)% this.products.length;
    }
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex = (this.currentIndex - 1) % this.products.length;
    }
  }

  viewDetails(id : string) {
    this.router.navigate(['product-details',id]);
  }


}
