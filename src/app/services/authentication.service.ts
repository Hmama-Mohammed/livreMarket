import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private fAuth: AngularFireAuth,private toastr: ToastrService,) {
  }

  registerUser(value) {
    return new Promise<any>((resolve, reject) => {

      this.fAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })

  }

  loginUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.fAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => {
            resolve(res);

          },
          err => reject(err))
    })
  }

  logoutUser() {
    return new Promise((resolve, reject) => {
      if (this.fAuth.currentUser) {
        this.fAuth.signOut()
          .then(() => {
            console.log("LOG Out");

          }).catch((error) => {
          reject();
        });
      }
    })
  }
}
