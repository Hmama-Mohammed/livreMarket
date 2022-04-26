import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {CRUDService} from "../services/crud.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {getDatabase, ref, update} from "@angular/fire/database";
import {RegisterPage} from "../register/register.page";
import {ToastrService} from "ngx-toastr";
import {getAuth} from "firebase/auth";
import {sendPasswordResetEmail} from "@angular/fire/auth";

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  userInfo: FormGroup;
  fullName: string = this.crudService.user.payload.exportVal().name;
  phone: string=this.crudService.user.payload.exportVal().phone;
  bio: string=this.crudService.user.payload.exportVal().bio;
  email: string=this.crudService.user.payload.exportVal().email;
  constructor(public firebase: AngularFireAuth,
              private crudService: CRUDService,
              private toastr: ToastrService,

  ) {
  }

  ngOnInit() {

  }

  updateInfo() {
    const db = getDatabase();
    update(ref(db,'/Users/'+this.crudService.currentUserKey),{
      name: this.fullName,
      email: this.email,
      phone: this.phone,
      bio: this.bio,
    })

    this.toastr.toastrConfig.positionClass= "toast-bottom-center";
    this.toastr.toastrConfig.preventDuplicates = true;
    this.toastr.success('Updated Successfully');
  }

  resetPassword(){
    const auth = getAuth();
    sendPasswordResetEmail(auth, this.email)
      .then(() => {
        this.toastr.toastrConfig.positionClass= "toast-bottom-center";
        this.toastr.toastrConfig.preventDuplicates = true;
        this.toastr.success('Email Sent Successfully');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

  }



}
