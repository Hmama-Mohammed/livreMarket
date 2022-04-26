import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {CRUDService} from "../services/crud.service";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {NavController, NavParams} from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  slideOpts = {
    initialSlide: 1,
    speed: 200
  };
  constructor(public firebase: AngularFireAuth,
              private crudService: CRUDService,
              public afDB: AngularFireDatabase,
              public afSG: AngularFireStorage,
              ) {


  }
  ngOnInit() {
  }



  showingDetails(image) {
    this.crudService.currentImage = image;
    this.crudService.gettingUser();
    //this.navController.navigateForward('/cart');
  }
}
