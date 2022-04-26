import { Component, OnInit } from '@angular/core';
import {CRUDService} from "../services/crud.service";
import {CategoriesService} from "../services/categories.service";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.page.html',
  styleUrls: ['./categorie.page.scss'],
})
export class CategoriePage implements OnInit {


  constructor(private categoriesService: CategoriesService,
              private navController: NavController,
              private  crudService: CRUDService) {

  }

  ngOnInit() {
  }


  backButton() {
    this.navController.navigateForward('/categories')
  }

  showingDetails(image) {
    this.crudService.currentImage = image;
    this.crudService.gettingUser();
    //this.navController.navigateForward('/cart');
  }
}
