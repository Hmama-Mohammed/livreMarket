import {Component, Injectable, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {MenuController, NavController} from "@ionic/angular";
import {AuthenticationService} from "../services/authentication.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ToastrService} from "ngx-toastr";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {getDatabase, ref, update} from "@angular/fire/database";
import {CRUDService} from "../services/crud.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  nomUser: String;
  emailUser: String;
  id:number = 0;
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  constructor(
    private authService: AuthenticationService,
    private navCtrl :NavController,
    public firestore: AngularFirestore,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public menu: MenuController,
    public afDB: AngularFireDatabase,
    private crudService: CRUDService
  ) {
    //this.menu.enable(false, 'menu');
  }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
      nomComplet: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      passwordConf: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }
  showToastEror() {
    this.toastr.error('L\'utilsateur Existe Deja');
    console.log("Eroor");
  }

  key;
  registerUser(value){
    if(value.password === value.passwordConf){
      this.authService.registerUser(value)
        .then(res => {
          const db = getDatabase();
          //Creating a user in Realtime Database
          this.key=this.afDB.list('/Users').push({
            name: this.nomUser,
            email: this.emailUser,
            phone: '',
            bio: '',
            key: '',
          }).key;

          update(ref(db,'/Users/'+this.key),{
            key: this.key,
          });
          this.crudService.userKey = this.key;
          this.toastr.toastrConfig.positionClass= "toast-bottom-center";
          this.toastr.toastrConfig.preventDuplicates = true;
          this.toastr.success('Account Created');
          this.navCtrl.navigateForward('/login');
        }, err => {
          this.toastr.toastrConfig.positionClass= "toast-bottom-center";
          this.toastr.toastrConfig.preventDuplicates = true;
          this.toastr.error(err.message);
          this.errorMessage = err.message;
        })
    }else  {
      this.toastr.toastrConfig.positionClass= "toast-bottom-center";
      this.toastr.toastrConfig.preventDuplicates = true;
      this.toastr.error("Password not identical");

    }


  }

}
