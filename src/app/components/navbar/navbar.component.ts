import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CartItem } from '../../model/cart-item.model';
import { CartItemsService } from '../../services/cart-items.service';
import { CurrencyPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports:[NgClass,CurrencyPipe,NgFor,FormsModule],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {


  deliveryCharge = 0;
  handlingCharge = 0;
  itemsTotal = 0;
  grandTotal = 0;
  cartItems: CartItem[] = [];
  isAccountMenuOpen: boolean = false;
  isCartViewOpen: boolean = false;
  quantity: number = 1;
  searchQuery: string = '';
  isSearchExpanded: boolean = false;
  filteredItems: any[] = [];
  items: any[] = [];
  

  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() showText: boolean = true;

  constructor(private cartItemsService: CartItemsService,private router : Router,private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.cartItems = this.cartItemsService.getCartItems();

    this.route.queryParams.subscribe((params) => {
      if (params['query']) {
        this.searchQuery = params['query'];
        this.performSearch();
      }
    });
  }

  toggleAccountMenu(): void {
    this.isAccountMenuOpen = !this.isAccountMenuOpen;
  }

  toggleCartViewOpen(): void {
    this.isCartViewOpen = !this.isCartViewOpen;
  }

  incrementQuantity() {
    this.quantity += 0.5;
  }

  decrementQuantity() {
    if (this.quantity > 0) {
      this.quantity -= 0.5;
      
    }
  }

  calculateGrandTotal(): number {
    return  this.itemsTotal + this.deliveryCharge + this.handlingCharge;  
  }
  calculateHandlingCharge(){
    return this.handlingCharge = this.cartItemsService.calculateHandlingCharge();
  }
  calculateDeliveryCharge() {
    return this.deliveryCharge= this.cartItemsService.calculateDeliveryCharge();
  }
  calculateItemsTotal(cartItems: CartItem[]): number {
    return this.itemsTotal= this.cartItemsService.calculateTotal(this.cartItems);
  }

  performSearch() {

    this.router.navigate([''], {
      relativeTo: this.route,
      queryParams: { query: this.searchQuery },
      queryParamsHandling: 'merge', // Keep other query params
    });

    // Filter items based on the search query
    this.filteredItems = this.items.filter((item) =>
      item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    
  }
  collapseSearchBar() {
    if (!this.searchQuery) {
      this.isSearchExpanded = false;
    }
  }
  expandSearchBar() {
    this.isSearchExpanded = true;
  }
}
