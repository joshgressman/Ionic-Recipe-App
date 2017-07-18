import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../services/shopping-list';


@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})

export class ShoppingListPage {

  constructor(private shoppingListService: ShoppingListService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
  }

  onAddItem(form: NgForm){
    let ingredient = {
      name: form.value.ingredientName,
      amount: form.value.amount
    }
    this.shoppingListService.addIngedient(ingredient);
  }

}
