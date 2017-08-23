import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(private authService: AuthService, private loadingCtrl: LoadingController, private alertCtlr: AlertController){}

onSignin(form: NgForm){
  //create a loadin icon when signin up
  //Loading is configured in the javascript object
  const loading = this.loadingCtrl.create({
   content: 'Signing In'
   });
  loading.present(); //presents loading
  this.authService.signin(form.value.email, form.value.password)
  .then(data => {
   loading.dismiss();
  })
  .catch(error => {
    loading.dismiss();
    const alert = this.alertCtlr.create({
      title: 'Signin Failed',
      message: error.message,
      buttons: ['OK']
    });
    alert.present();
  });
}

}
