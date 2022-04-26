import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import { getAuth, signOut } from "firebase/auth";
import {AngularFireDatabase,AngularFireList} from "@angular/fire/compat/database";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Router} from "@angular/router";
import {getDatabase, push, ref, set, update} from "@angular/fire/database";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {RegisterPage} from "../register/register.page";

@Injectable({
  providedIn: 'root'
})
export class CRUDService {
  categories: any[];
  users : any[];
  currentUser : string;
  currentUserKey: string;
  user: any;
  imagesEditeurChoice = [];
  imagesNewBooks = [];
  imagesFavoris = [];
  imagesTendances = [];
  userKey;
  currentImage ;
  userFavoris =[];

  constructor(public fStore: AngularFirestore,
              public afDB: AngularFireDatabase,
              public afSG: AngularFireStorage,
              private router: Router,
              public firebase: AngularFireAuth,
             ) {
    //To run the function once a time
    this.getImagesTendancesDatabase();
    this.getImagesEditeurDatabase();
    this.getImagesFavorisDatabase();
    this.getImagesNewBookDatabase();
  }

  getCategories(){

    this.fStore.collection('Categories').valueChanges()
      .subscribe(response => {
        this.categories = response;
      })
  }

  getUsers(){
    this.afDB.list('/Users').snapshotChanges(['child_added']).subscribe(users => {
      this.users=[]
      users.forEach(user => {
        this.users.push(user)
      });
    });

  }

  gettingUser (){
    //Getting email of the current User

    this.firebase.currentUser.then(res =>{
      for(let one of this.users){
        if(one.payload.exportVal().email.toLowerCase().toString() == res.email.toLowerCase().toString()){
          this.currentUser = one.payload.exportVal().name;
          this.user = one;
          this.currentUserKey = one.payload.exportVal().key;
        }
      }

    })

  }
//getting images Tendances
  getImagesTendancesDatabase() {
    this.afDB.list('/Images/Tendance').snapshotChanges(['child_added']).subscribe(images => {
      images.forEach(image => {
        this.getImagesTendanceStorage(image);
      });
    });
  }

  getImagesTendanceStorage(image: any) {
    const imgRef = image.payload.exportVal().Ref;
    this.afSG.ref(imgRef).getDownloadURL().subscribe(imgUrl => {
      this.imagesTendances.push({
        name: image.payload.exportVal().Titre,
        url: imgUrl,
        description: image.payload.exportVal().Desc,
        Auteur:image.payload.exportVal().Auteur,
        Date:image.payload.exportVal().Date,
        Details: image.payload.exportVal().Details,
        Langue:image.payload.exportVal().Langue,
        Pages:image.payload.exportVal().Pages,
        Price:image.payload.exportVal().Price,
        Favoris:image.payload.exportVal().Favoris,
        Path:image.payload.exportVal().Path,
      });
    });
  }
  //getting images Editeur choice
  getImagesEditeurDatabase() {
    this.afDB.list('/Images/EditeurChoice').snapshotChanges(['child_added']).subscribe(images => {
      images.forEach(image => {
        this.getImagesEditeurStorage(image);
      });
    });
  }

  getImagesEditeurStorage(image: any) {
    const imgRef = image.payload.exportVal().Ref;
    this.afSG.ref(imgRef).getDownloadURL().subscribe(imgUrl => {
      this.imagesEditeurChoice.push({
        name: image.payload.exportVal().Titre,
        url: imgUrl,
        description: image.payload.exportVal().Desc,
        Auteur:image.payload.exportVal().Auteur,
        Date:image.payload.exportVal().Date,
        Details: image.payload.exportVal().Details,
        Langue:image.payload.exportVal().Langue,
        Pages:image.payload.exportVal().Pages,
        Price:image.payload.exportVal().Price,
        Favoris:image.payload.exportVal().Favoris,
        Path:image.payload.exportVal().Path,
      });
    });
  }
  //getting images New Book
  getImagesNewBookDatabase() {
    this.afDB.list('/Images/NewBook').snapshotChanges(['child_added']).subscribe(images => {
      images.forEach(image => {
        this.getImagesNewBookStorage(image);
      });
    });
  }

  getImagesNewBookStorage(image: any) {
    const imgRef = image.payload.exportVal().Ref;
    this.afSG.ref(imgRef).getDownloadURL().subscribe(imgUrl => {
      this.imagesNewBooks.push({
        name: image.payload.exportVal().Titre,
        url: imgUrl,
        description: image.payload.exportVal().Desc,
        Auteur:image.payload.exportVal().Auteur,
        Date:image.payload.exportVal().Date,
        Details: image.payload.exportVal().Details,
        Langue:image.payload.exportVal().Langue,
        Pages:image.payload.exportVal().Pages,
        Price:image.payload.exportVal().Price,
        Favoris:image.payload.exportVal().Favoris,
        Path:image.payload.exportVal().Path,
      });
    });
  }
  //getting images Favoris
  getImagesFavorisDatabase() {
    this.afDB.list('/Images/Favoris').snapshotChanges(['child_added']).subscribe(images => {
      images.forEach(image => {
        this.getImagesFavorisStorage(image);
      });
    });
  }

  getImagesFavorisStorage(image: any) {
    const imgRef = image.payload.exportVal().Ref;
    this.afSG.ref(imgRef).getDownloadURL().subscribe(imgUrl => {
      this.imagesFavoris.push({
        name: image.payload.exportVal().Titre,
        url: imgUrl,
        description: image.payload.exportVal().Desc,
        Auteur:image.payload.exportVal().Auteur,
        Date:image.payload.exportVal().Date,
        Details: image.payload.exportVal().Details,
        Langue:image.payload.exportVal().Langue,
        Pages:image.payload.exportVal().Pages,
        Price:image.payload.exportVal().Price,
        Favoris:image.payload.exportVal().Favoris,
        Path:image.payload.exportVal().Path,
      });
    });
  }


  gettingUserFavoris(){
    this.userFavoris = [];
    this.afDB.list('/Users/'+this.currentUserKey+'/Favoris').snapshotChanges(['child_added']).subscribe(Favoris => {
      Favoris.forEach(one => {
        this.userFavoris.push(one)
      });
    });
  }

  userShoppingCart:any;
  subTotal:number ;
  gettingUserShoppingCart(){
    this.userShoppingCart = [];

    this.afDB.list('/Users/'+this.currentUserKey+'/ShoppingCart').snapshotChanges(['child_added']).subscribe(Items => {
      Items.forEach(one => {
        this.userShoppingCart.push(one)
        //this.subTotal+=one.payload.exportVal().Price;
        this.gettingSubTotal()
      });
    });
}
gettingSubTotal(){
  this.subTotal = 0;
    this.userShoppingCart.forEach(one =>{

      this.subTotal+=one.payload.exportVal().Price;
    })
}

  removeFromCart(image) {
    this.userShoppingCart.forEach(one =>{
      if(one.payload.exportVal().name === image.payload.exportVal().name){
        this.userShoppingCart.splice(this.userShoppingCart.indexOf(one),1)
          .then(this.gettingSubTotal());

      }
    });
  }
  changerData(image) {
    this.afDB.list('/Users/'+this.currentUserKey+'/Favoris').push(image);

  }

  addToCart(image) {
    this.afDB.list('/Users/'+this.currentUserKey+'/ShoppingCart').push(image);
  }



  logOut(){
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      this.router.navigate(['/login']);
    }).catch((error) => {
      // An error happened.
    });
  }



}
