import { Component, inject, OnInit } from '@angular/core';
import {
  Chart,
  PieController,
  LineController,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js';
import { FarmerService } from '../../../services/farmer.service';
import { FarmerCredentials } from '../../../model/farmer.model';
import { FormsModule } from '@angular/forms';

// Register required components
Chart.register(
  PieController,
  LineController,
  CategoryScale,
  LinearScale,
  ArcElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);


@Component({
  selector: 'app-farmer',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './farmer.component.html',
  styleUrl: './farmer.component.css'
})
export class FarmerComponent implements OnInit {

  //farmerDetails! : FarmerCredentials;

  private farmerService = inject(FarmerService)
  farmerDetails: FarmerCredentials = this.farmerService.getFarmerData()
  // Modal state for government schemes
  isGovernmentSchemeModalOpen = true;
  isVegetableUploadModalOpen = false
  governmentSchemes: any;

  farmer = {
    id: 1,
    firstname: 'John',
    lastname: 'Doe',
    gender: 'Male',
    age: 35,
    image: 'https://via.assets.so/img.jpg?w=400&h=150&tc=blue&bg=#cecece',
    rating: 4.8,
  };

  newVegetable = {
    name: '',
    price: NaN,
    unit: '',
    image: '',
    description: ''
  }

  // Vegetable details
  vegetables = [
    {
      id: 1,
      name: 'Tomatoes',
      price: 20,
      unit: '1kg',
      image: 'path-to-tomato-image.jpg',
      description: 'Freshly grown organic tomatoes.',
    },
    {
      id: 2,
      name: 'Potatoes',
      price: 15,
      unit: '1kg',
      image: 'path-to-potato-image.jpg',
      description: 'High-quality potatoes.',
    },
  ];

  // Example sales data for graphical representation
  salesData = {
    labels: ['Tomatoes', 'Potatoes', 'Carrots'],
    values: [60, 30, 10],
  };

  // Customer orders

  customerOrders = [
    {
      id: 101,
      customer: 'Alice',
      item: 'Tomatoes',
      quantity: '2kg',
      total: 40,
      status: 'Pending', // Status of the order
    },
    {
      id: 102,
      customer: 'Bob',
      item: 'Potatoes',
      quantity: '3kg',
      total: 45,
      status: 'Fulfilled',
    },
    {
      id: 103,
      customer: 'Charlie',
      item: 'Carrots',
      quantity: '1kg',
      total: 25,
      status: 'Pending',
    },
  ];


  closeGovernmentSchemeModal() {
    this.isGovernmentSchemeModalOpen = false;
  }

  openVegetableUploadModal() {
    this.isVegetableUploadModalOpen = true;
  }
  closeVegetableUploadModal() {
    this.isVegetableUploadModalOpen = false
  }

  handleImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.newVegetable.image = file.name; // Save image file name or process it
    }
  }



  // Function to mark an order as completed
  completeOrder(orderId: number) {
    const order = this.customerOrders.find((o) => o.id === orderId);
    if (order) {
      order.status = 'Fulfilled';
    }
  }

  uploadProfilePhoto(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.farmer.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Function to edit profile
  editProfile() {
    console.log('Edit Profile clicked');
    // Implement profile editing logic here
  }

  vegetableSalesChart!: any;
  monthlySalesChart!: any;

  vegetableSalesData = {
    labels: ['Tomatoes', 'Potatoes', 'Onions', 'Carrots', 'Capsicum'],
    datasets: [
      {
        data: [30, 20, 15, 25, 10], // Example sales data in percentages
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  monthlySalesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [1200, 1500, 1700, 2000, 2200, 1800, 1900, 2100, 2300, 2500, 2700, 3000],
        borderColor: '#4BC0C0',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  ngOnInit(): void {
    this.initializeVegetableSalesChart();
    this.initializeMonthlySalesChart();
  }

  initializeVegetableSalesChart() {
    const ctx = document.getElementById('vegetableSalesChart') as HTMLCanvasElement;
    this.vegetableSalesChart = new Chart(ctx, {
      type: 'pie',
      data: this.vegetableSalesData
    })
  }

  initializeMonthlySalesChart() {
    const ctx = document.getElementById('monthlySalesChart') as HTMLCanvasElement;
    this.monthlySalesChart = new Chart(ctx, {
      type: 'line',
      data: this.monthlySalesData,
    });
  }

  submitVegetable() {
    console.log('Vegetable Data:', this.newVegetable);
    this.closeVegetableUploadModal();
    // Add logic to send the data to the backend
  }





}
