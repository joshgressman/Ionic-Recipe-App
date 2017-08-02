import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipePage } from '../recipe/recipe';

import { RecipeService } from '../../services/recipe';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  recipes: Recipe[] = [];

  constructor(private navCtrl: NavController, private recipeService: RecipeService, private navParams: NavParams){}

  //Navigate to edit recipe page
  onNewRecipe(){
   this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

  //Method is push / navigating to the next page with an object / value
  onLoadRecipe(recipe: Recipe, index: number){
   this.navCtrl.push(RecipePage, {recipe: recipe, index: index});

  }

  //Loads recipes once view is entered after creating a recipe in the recip-edit comp
  ionViewWillEnter(){
   this.recipes = this.recipeService.getRecipes();
   console.log(this.recipes);
  }

}
