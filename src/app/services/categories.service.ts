import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  imagesOfCategorie = [];
  currentCat : String;

  constructor(public afDB: AngularFireDatabase,
              public afSG: AngularFireStorage,)
  {
  }



  //getting images Tendances
  getImagesOfCategorieDatabase() {
    this.afDB.list('/Livres/'+this.currentCat).snapshotChanges(['child_added']).subscribe(images => {
      console.log(this.currentCat)
      images.forEach(image => {
        this.getImagesOfCategorieStorage(image);
      });
    });
  }

  getImagesOfCategorieStorage(image: any) {
    const imgRef = image.payload.exportVal().Ref;
    this.imagesOfCategorie = [];
    this.afSG.ref(imgRef).getDownloadURL().subscribe(imgUrl => {

      this.imagesOfCategorie.push({
        name: image.payload.exportVal().Titre,
        url: imgUrl,
        description: image.payload.exportVal().Desc,
        Auteur:image.payload.exportVal().Auteur,
        Date:image.payload.exportVal().Date,
        Details: image.payload.exportVal().Details,
        Langue:image.payload.exportVal().Langue,
        Pages:image.payload.exportVal().Pages,
        Price:image.payload.exportVal().Price,
      });
    });
  }
}
