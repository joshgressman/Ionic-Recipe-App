import { Component } from '@angular/core';

import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from 'ionic-angular';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

 constructor(private authService: AuthService, private loadingCtrl: LoadingController, private alertCtlr: AlertController){}

 onSignup(form: NgForm){
   //create a loadin icon when signin up
   //Loading is configured in the javascript object
  const loading = this.loadingCtrl.create({
    content: 'Hang tight while we sign you up'
    });
    loading.present(); //presents loading
  this.authService.signup(form.value.email, form.value.password)
  .then(data => {
      loading.dismiss(); // stop loading
    })
  .catch(error => {
    loading.dismiss();
    const alert = this.alertCtlr.create({
      title: 'Signup Failed',
      message: error.message,
      buttons: ['Ok']
    });
    alert.present();
  });
 }

}
