import { Component, computed, inject, Input, signal, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CurrencyPipe, SlicePipe } from '@angular/common';
import { ToastComponent } from '../toast/toast.component';
import { CartItemsService } from '../../services/cart-items.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CurrencyPipe, SlicePipe, ToastComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  @Input() productId!: string;
  private productService = inject(ProductsService)
  private cartItemsService = inject(CartItemsService)

  @ViewChild(ToastComponent) toast! : ToastComponent
  
  // Quantity options and selected quantity
  quantityOptions = [0.5, 1, 1.5, 2, 2.5,3,3.5,4,4.5];
  selectedQuantity = signal(0);
  expanded: boolean = false;
  productName = computed(()=>{
    return this.productService.getProducts().find(product => product.id === this.productId)?.name
  })

  productImage = computed(()=>{
    return this.productService.getProducts().find(product => product.id === this.productId)?.image
  })

  productPrice = computed(()=>{
    return this.productService.getProducts().find(product => product.id === this.productId)?.price
  })
  productUnit =  computed(()=>this.productService.getProducts().find(product => product.id === this.productId)?.unit)
  
  productDealerFirstName = computed(()=>{
    return this.productService.getProducts().find(product => product.id === this.productId)?.farmer[0].firstname
  })
  productDealerLastName = computed(()=>{
    return this.productService.getProducts().find(product => product.id === this.productId)?.farmer[0].lastname
  })
  productDealerRating = computed(()=>{
    return this.productService.getProducts().find(product => product.id === this.productId)?.farmer[0].rating
  })
  productDealerPhoto = computed(()=>{
    return this.productService.getProducts().find(product => product.id === this.productId)?.farmer[0].image
  })
  productDescription = computed(()=>{
    return this.productService.getProducts().find(product => product.id === this.productId)?.description
  })

  calculateTotalPrice(){
    
    const qty = this.productUnit() ?? '1kg'


    let numericPart = parseFloat(qty)
    const unitPart = (qty).replace(/[0-9.]/g, '').trim();
    if(unitPart === 'g'){
      numericPart = numericPart/1000
    }
    return this.selectedQuantity() * (this.productPrice() || 0) / numericPart
  }

  addToCart(): void {

    // Implement add-to-cart logic here

    if(this.selectedQuantity() != 0){
      const quantity = this.selectedQuantity();
      const name = this.productName();
      this.toast.toastMessage = `Added ${quantity} kg of ${name} to cart.`
      this.toast.showToast = true
  
      this.cartItemsService.addItemToCart({
        id:this.productId,
        name:this.productName() || '',
        price:this.productPrice() || NaN,
        unit:this.productUnit() || '',
        image:this.productImage() || '',
        description : this.productDescription() || '',
        quantity:this.selectedQuantity()
      })
      setTimeout(() => this.toast.showToast = false, 3000);
    }
  }



   ngOnInit(){
    // console.log(this.productId)
   }



  selectQuantity(option: number): void {
    this.selectedQuantity.set(option);
    this.calculateTotalPrice();
  }

}
