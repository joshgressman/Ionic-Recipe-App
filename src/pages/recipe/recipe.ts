import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Recipe } from '../../models/recipe';

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {
   recipe: Recipe;
   index: number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}


    //navParams is used when receivig data from the navController
    //Receiving data from another page
  ngOnInit(){
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  //Add edit functionality

}
