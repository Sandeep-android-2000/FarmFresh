import { Component, inject} from "@angular/core";
import { Farmer } from "../../model/farmer.model";
import { FarmerService } from "../../services/farmer.service";



@Component({
  selector: 'app-best-farmers',
  standalone: true,
  imports: [],
  templateUrl: './best-farmers.component.html',
  styleUrl: './best-farmers.component.css'
})
export class BestFarmersComponent {

  farmers! : Farmer[]

  private farmerService = inject(FarmerService)

  constructor(){
    this.farmers = this.farmerService.getFarmersData()
  }

}
