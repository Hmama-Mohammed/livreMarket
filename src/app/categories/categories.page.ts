import { Component, OnInit } from '@angular/core';
import {CRUDService} from "../services/crud.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {CategoriesService} from "../services/categories.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  livresCategories: any[];

  constructor(public firebase: AngularFireAuth,
              private crudService: CRUDService,
              private categoriesService: CategoriesService
  ) {
    this.crudService.getCategories();
  }

  ngOnInit() {
  }


  getCategorie(Nom: any) {
    this.categoriesService.currentCat = Nom;
    this.categoriesService.getImagesOfCategorieDatabase()
  }
}
