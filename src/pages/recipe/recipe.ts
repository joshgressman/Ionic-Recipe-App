import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Recipe } from '../../models/recipe';



@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage {
   recipe: Recipe;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   this.recipe = {title: this.navParams.get('title'), description: this.navParams.get('title'), difficulty: this.navParams.get('difficulty'), ingredients: this.navParams.get('ingredients') }
   console.log('the recipe in params', this.recipe);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  }

}
