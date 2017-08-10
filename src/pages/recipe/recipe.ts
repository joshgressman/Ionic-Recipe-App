import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Recipe } from '../../models/recipe';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipesPage } from '../recipes/recipes';
import { ShoppingListService } from '../../services/shopping-list';
import { RecipeService } from '../../services/recipe';

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {
   recipe: Recipe;
   index: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, private slService: ShoppingListService, private recipeService: RecipeService) {}


    //navParams is used when receivig data from the navController
    //Receiving data from another page
  ngOnInit(){
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onEditRecipe(){
    this.navCtrl.push(EditRecipePage, {mode: 'Edit', recipe: this.recipe, index: this.index})
  }

  onAddingIngredients(){
    this.slService.addItems(this.recipe.ingredients);
  }

  onDeleteRecipe(){
    this.recipeService.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }

}
