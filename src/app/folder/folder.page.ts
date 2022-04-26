import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {MenuController, NavController} from "@ionic/angular";
import {AuthenticationService} from "../services/authentication.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import { Observable } from 'rxjs';
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  validations_form: FormGroup;
  errorMessage: string = '';
  items: Observable<any[]>;



  constructor(private activatedRoute: ActivatedRoute,
              private navCtrl: NavController,
              private authService: AuthenticationService,
              private formBuilder: FormBuilder,
              private toastr: ToastrService,
              public menu: MenuController) {
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
    });

  }
  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };


  LoginUser(value) {
    this.authService.loginUser(value)
      .then(res => {
        this.toastr.toastrConfig.positionClass= "toast-top-center";
        this.toastr.toastrConfig.preventDuplicates = true;
        this.toastr.info('Welcome aboard');
        this.navCtrl.navigateForward('/home');
      }, err => {
        this.toastr.toastrConfig.positionClass= "toast-bottom-center";
        this.toastr.toastrConfig.preventDuplicates = true;
        this.toastr.error(err.message);
      })

  }

}
