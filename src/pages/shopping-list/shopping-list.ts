import { Component } from '@angular/core';
import { PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../services/shopping-list';
import { Ingredient } from '../../models/ingredient';
import { DatabaseOptionsPage } from '../database-options/database-options';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})

export class ShoppingListPage {
  ingredients: Ingredient[];
  

  constructor(private shoppingListService: ShoppingListService, private popoverCtrl: PopoverController, private authService: AuthService, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
  }

   ionViewWillEnter(){
      this.loadItems();
   }

  onAddItem(form: NgForm){
    this.shoppingListService.addItem(form.value.ingredientName, form.value.amount );
    form.reset();
    this.loadItems();
  }

  onRemove(index: number){
   this.shoppingListService.removeItem(index);
     this.loadItems();
  }

  onShowOptions(event: MouseEvent){
   const loading = this.loadingCtrl.create({
     content: 'Please waite...'
   });
   const popover = this.popoverCtrl.create(DatabaseOptionsPage);
   popover.present({ev: event});
   popover.onDidDismiss(
     data => {
       if(data.action == 'load'){
         loading.present();
         this.authService.getActiveUser().getToken()
         .then(
           (token: string) => {
             this.shoppingListService.fetchList(token)
             .subscribe(
               (list: Ingredient[]) => {
                 loading.dismiss();
                 if(list){
                   this.ingredients = list;
                 } else {
                   this.ingredients = [];
                 }
               },
               error => {
                 loading.dismiss();
                 this.handleError(error.json().error);
               }
             );
           }
         );
       } else if (data.action == 'store') {
         loading.present();
         this.authService.getActiveUser().getToken()
         .then(
           (token: string) => {
             this.shoppingListService.storeList(token)
             .subscribe(
               () => loading.dismiss(),
               error => {
                 loading.dismiss();
                 this.handleError(error.json().error);
               }
             );
           }
         );
       }
     }
   );
  }

  //Helper method to load ingredients from the service upon updating
  private loadItems(){
     this.ingredients = this.shoppingListService.getItems();
  }

  private handleError(errorMessage: string){
    const alert = this.alertCtrl.create({
      title: 'An error occured',
      message: errorMessage,
      buttons: ['Ok']
    });
    alert.present();
  }

}
