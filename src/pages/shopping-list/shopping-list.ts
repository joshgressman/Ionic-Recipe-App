import { Component } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../services/shopping-list';
import { Ingredient } from '../../models/ingredient';
import { SLOptionsPage } from './sl-options/sl-options';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})

export class ShoppingListPage {
  ingredients: Ingredient[];
  slOPtionsPage = SLOptionsPage;

  constructor(private shoppingListService: ShoppingListService, private popoverCtrl: PopoverController, private authService: AuthService) {
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
   const popover = this.popoverCtrl.create(SLOptionsPage);
   popover.present({ev: event});
   popover.onDidDismiss(
     data => {
       if(data.actoin == 'load'){

       } else {
         this.authService.getActiveUser().getToken()
         .then(
           (token: string) => {
             this.shoppingListService.storeList(token)
             .subscribe(
               () => console.log('Success'),
               error => {
                 console.log(error);
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

}
