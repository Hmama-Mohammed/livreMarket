import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {CRUDService} from "../services/crud.service";

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.page.html',
  styleUrls: ['./favoris.page.scss'],
})
export class FavorisPage implements OnInit {

  constructor(public firebase: AngularFireAuth,
              private crudService: CRUDService,) {
    this.crudService.gettingUserFavoris()
  }

  ngOnInit() {


  }


  showingDetails(image) {
    this.crudService.currentImage = image;
    //this.navController.navigateForward('/cart');
  }
}
