import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { NavParams } from 'ionic-angular';
import { ActionSheetController, AlertController, ToastController, NavController } from 'ionic-angular';
import { RecipeService } from '../../services/recipe';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {
  mode = 'New';
  selectOPtions = ['easy', 'medium', 'hard'];
  recipeForm: FormGroup;
  recipe: Recipe;
  index: number;

  constructor(private navParams: NavParams,
              private actionSheetCtrl: ActionSheetController,
              private alertCtrl: AlertController,
              private toastCtlr: ToastController,
              private recipeService: RecipeService,
              private navCtrl: NavController){}

//Property being sent from the recipes page
ngOnInit(){
 this.mode = this.navParams.get('mode');
 if(this.mode == 'Edit'){
   this.recipe = this.navParams.get('recipe');
   this.index = this.navParams.get('index');
 }
 this.initalizeForm();
}

onSubmit(){
 const value = this.recipeForm.value;
 let ingredients = [];
 if(value.ingredients.length > 0) {
  //.map() will iterate through each array value and create an object per array item value
    ingredients = value.ingredients.map(name => {
      return {name: name, amount: 1}
    });
 }
 if(this.mode == 'Edit'){
  this.recipeService.updateRecipe(this.index, value.title, value.description, value.difficulty,ingredients);
} else {
 this.recipeService.addRecipe(value.title, value.description, value.difficulty,ingredients );
 }
 this.recipeForm.reset();
 this.navCtrl.popToRoot();
}

//action sheet popup on click will also take in inputs
onManageIngredients(){
 const actionSheet = this.actionSheetCtrl.create({
   title: 'What do you want to do?',
   buttons: [
    {
      text: 'Add Ingredient',
      handler: () => {
        actionSheet.onDidDismiss(() => { //onDidDismiss() was applied to correct the alert not canceling
         //Alert being invoked from below
          this.createNewIngredientAlert().present();
      });
      }
    },
   {
     text: 'Remove all Ingredients',
     role: 'destructive',
     handler: () => {
       const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
       const len = fArray.length;
       if(len > 0){
         for(let i = len - 1; i >= 0; i--){
           fArray.removeAt(i);
         }
         //Helper message when ingredients are deleted
         const toast = this.toastCtlr.create({
           message:'Ingredients have been deleted',
           duration: 3000,
           position: 'middle'
         });
          toast.present();
       }
      }
   },
   {
     text: 'Cancel',
     role: 'cancel'
   }
  ]
 });
  actionSheet.present();

}



private createNewIngredientAlert(){
   return this.alertCtrl.create({
    title: 'Add Ingredient',
    inputs: [
      {
        name: 'name',
        placeholder: 'Name'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
         console.log('Cancel clicked');
       }
      },
      {
        text: 'Add',
        handler: data => {
          if (data.name.trim() == '' || data.name == null){
           //Helper message if the input is empty or invalid
           const toast = this.toastCtlr.create({
             message:'Please add a valid ingredient',
             duration: 3000,
             position: 'middle'
           });
            toast.present();
            return false;
          }
          (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
        }
      }
    ]
  });
}

//Helper function that creates an instance of the reactive form
//if edit
private initalizeForm() {
  let title = null;
  let description = null;
  let difficulty = 'Medium';
  let ingredients =[];

  if(this.mode == 'Edit'){
    title = this.recipe.title;
    description = this.recipe.description;
    difficulty = this.recipe.difficulty;
    for(let ingredient of this.recipe.ingredients){
      ingredients.push(new FormControl(ingredient.name, Validators.required));
    }

  }

  this.recipeForm = new FormGroup({
   'title': new FormControl(title, Validators.required),
   'description': new FormControl(description, Validators.required ),
   'difficulty': new FormControl(difficulty, Validators.required),
   'ingredients': new FormArray(ingredients)

  });
}

}
