import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { NavParams } from 'ionic-angular';
import { ActionSheetController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {
  mode = 'New';
  selectOPtions = ['easy', 'medium', 'hard'];
  recipeForm: FormGroup;

  constructor(private navParams: NavParams, private actionSheetCtrl: ActionSheetController, private alertCtrl: AlertController){}

//Property being sent from the recipes page
ngOnInit(){
 this.mode = this.navParams.get('mode');
 this.initalizeForm();
}

onSubmit(){
  console.log(this.recipeForm);
}

//action sheet popup on click
onManageIngredients(){
 const actionSheet = this.actionSheetCtrl.create({
   title: 'What do you want to do?',
   buttons: [
    {
      text: 'Add Ingredient',
      handler: () => {

      }
    },
   {
     text: 'Remove all ingredients',
     role: 'destructive',
     handler: () => {

      }
   },
   {
     text: 'Cancel',
     role: 'cancel'
   }
  ]
 });

}

private createNewIngredientAlert(){
  const newIngredientAlert = this.alertCtrl.create({
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
        role: 'cancel'
      },
      {
        text: 'Add',
        handler: data => {
          if(data.name.trim() == '' || data.name == null){

          }
        }
      }
    ]
  });
}

//Helper function that creates an instance of the reactive form
private initalizeForm() {
  this.recipeForm = new FormGroup({
   'title': new FormControl(null, Validators.required),
   'description': new FormControl(null, Validators.required ),
   'difficulty': new FormControl('Medium', Validators.required),
   'ingredients': new FormArray([])

  });
}

}
