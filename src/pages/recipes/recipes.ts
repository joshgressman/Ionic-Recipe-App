import { Component} from '@angular/core';
import { NavController, NavParams, PopoverController, AlertController, LoadingController } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipePage } from '../recipe/recipe';
import { DatabaseOptionsPage } from '../database-options/database-options';
import { RecipeService } from '../../services/recipe';
import { Recipe } from '../../models/recipe';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  recipes: Recipe[] = [];

  constructor(private navCtrl: NavController, private recipeService: RecipeService, private navParams: NavParams, private popoverCtrl: PopoverController, private alertCtrl: AlertController, private loadingCtrl: LoadingController, private authService: AuthService){}

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

  onShowOptions(event: MouseEvent){
   const loading = this.loadingCtrl.create({
     content: 'Please waite...'
   });
   const popover = this.popoverCtrl.create(DatabaseOptionsPage);
   popover.present({ev: event});
   popover.onDidDismiss(
     data => {
       //corrects error when no action is selected and you click away
       if(!data){
         return;
       }
       if(data.action == 'load'){
         loading.present();
         this.authService.getActiveUser().getToken()
         .then(
           (token: string) => {
             this.recipeService.fetchList(token)
             .subscribe(
               (list: Recipe[]) => {
                 loading.dismiss();
                 if(list){
                   this.recipes = list;
                 } else {
                   this.recipes = [];
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
             this.recipeService.storeList(token)
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
     this.recipes = this.recipeService.getItems();
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
