
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component} from '@angular/core';
import { Category } from '../../../model/category.model';
import { NavbarComponent } from "../../navbar/navbar.component";
import { BestFarmersComponent } from "../../best-farmers/best-farmers.component";
import { RecentlyListedComponent } from "../../recently-listed/recently-listed.component";


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NgClass, NgFor, NavbarComponent, BestFarmersComponent, RecentlyListedComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  
  categories: Category[] = [
    { id: '1', name: 'Veggies', icon: '🥬', selected: false },
    { id: '2', name: 'Fruits', icon: '🍎', selected: false },
    { id: '3', name: 'Dairy Products', icon: '🥛', selected: false },
    { id: '4', name: 'Cereals', icon: '🌾', selected: false },
    
    { id: '5', name: 'Organic', icon: '🌿', selected: false },
    { id: '6', name: 'Nuts', icon: '🥜', selected: false },
    { id: '7', name: 'Spices', icon: '🌶️', selected: false }
  ];

  get selectedCategories(): Category[] {
    return this.categories.filter(category => category.selected);
  }

  selectCategory(category: Category): void {
    category.selected = !category.selected;
  }

  

}
