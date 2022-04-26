import { Component, OnInit } from '@angular/core';
import {CRUDService} from "../services/crud.service";
import {NavController} from "@ionic/angular";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-livre-details',
  templateUrl: './livre-details.page.html',
  styleUrls: ['./livre-details.page.scss'],
})
export class LivreDetailsPage implements OnInit {

  constructor(
              private crudService: CRUDService,
              private navController: NavController,
              private toastr:ToastrService,
  ) {
    if(this.crudService.currentImage == null){
      this.navController.navigateForward('/home')
    }
  }

  ngOnInit() {

  }

  backButton() {
    this.crudService.gettingUserFavoris()
    this.navController.navigateForward('/home')
  }

  toggleFavoris(image) {
    //this.crudService.currentImage.Favoris=!this.crudService.currentImage.Favoris;
    this.crudService.changerData(image);
  }

  toggleCart(currentImage) {
    this.toastr.toastrConfig.positionClass= "toast-bottom-center";
    this.toastr.toastrConfig.preventDuplicates = true;
    this.toastr.toastrConfig.timeOut= 2000;
    this.toastr.toastrConfig.closeButton = true;
    this.toastr.success('Added To Cart');
    this.crudService.addToCart(currentImage);
  }
}
