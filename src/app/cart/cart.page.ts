import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {CRUDService} from "../services/crud.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  constructor(public firebase: AngularFireAuth,
              private crudService: CRUDService) {
    this.crudService.gettingUserShoppingCart()
  }

  ngOnInit() {
  }



}
