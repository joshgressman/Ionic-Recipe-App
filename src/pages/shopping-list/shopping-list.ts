import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../services/shopping-list';
import { Ingredient } from '../../models/ingredient';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})

export class ShoppingListPage {
  ingredients: Ingredient[];

  constructor(private shoppingListService: ShoppingListService) {
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

  //Helper method to load ingredients from the service upon updating
  private loadItems(){
     this.ingredients = this.shoppingListService.getItems();
  }

}
