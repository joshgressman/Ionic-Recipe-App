import { Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';

import { RecipeService } from '../../services/recipe';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  recipes: Recipe[] = [];

  constructor(private navCtrl: NavController, private recipeService: RecipeService){}

  //Navigate to edit recipe page
  onNewRecipe(){
   this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

  onLoadRecipe(){}

  //Loads recipes once view is entered after creating a recipe in the recip-edit comp
  ionViewWillEnter(){
   this.recipes = this.recipeService.getRecipes();
   console.log(this.recipes);
  }

}
