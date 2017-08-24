import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import  firebase  from 'firebase';
import { TabsPage } from '../pages/tabs/tabs';
import { RecipesPage } from '../pages/recipes/recipes';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { AuthService } from '../services/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage = TabsPage;
  signinPage = SigninPage;
  signupPage = SignupPage;
  isAuthenticated = false;
 //Referecnces the tabs nav
 @ViewChild('nav') nav: NavController;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController, private authService: AuthService) {
    //set up firebase within the application
    firebase.initializeApp({
      apiKey: "AIzaSyDjdKIVvYFVtKuDJbfJzs_moPfby0VmFfg",
      authDomain: "ng-recipe-book-a78ad.firebaseapp.com"
    });
    //Auth signin for triggered when auth state is changed
    firebase.auth().onAuthStateChanged(user => {
      if (user) { //Checks if user is authenticated
        this.isAuthenticated = true;
        //switch root page if the user is authenticated
        this.nav.setRoot(this.tabsPage);
      } else {
        this.isAuthenticated = false;
        this.nav.setRoot(this.signinPage);
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any){
  //used for the side bar / tabs navigation
  this.nav.setRoot(page);
  this.menuCtrl.close();
  }

  onLogout(){
   this.authService.logout();
   this.menuCtrl.close();
  }



}
