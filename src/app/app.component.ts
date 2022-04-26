import { Component } from '@angular/core';
import {MenuController} from "@ionic/angular";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {CRUDService} from "./services/crud.service";
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  currentUser: string;
  navigate: any;
  //Les noms pour les parties de menu avec leurs URL
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Cart', url: '/cart', icon: 'cart' },
    { title: 'Favoris', url: '/favoris', icon: 'heart',clicke: this.crudService.gettingUserFavoris() },
    { title: 'Categories', url: '/categories', icon: 'menu' },
  ];
  public labels = [
    { title: 'Account', url: '/account', icon: 'settings' },
    { title: 'Log Out', url: '/home', icon: 'log-out' },
  ];

  constructor(private menu: MenuController,
              public firebase: AngularFireAuth,
              public crudService: CRUDService
  ) {
      this.crudService.getUsers();

  }
  ngOnInit() {
  }

  // Pour fermer le menu
    closeMenu(){
      this.menu.close();

    }
  //Savoir l'utilsateur actuellemnt connecte
  gettingUser (){
    //Getting email of the current User
    this.firebase.currentUser.then(res =>{
      console.log(this.crudService.getUsers());
      for(let one of this.crudService.users){
        if(one.email.toLowerCase().toString() == res.email.toLowerCase().toString()){
          this.currentUser = one.name;
        }
      }
    })

  }
}
