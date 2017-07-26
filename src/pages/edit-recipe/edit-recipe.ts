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

//action sheet popup on click will also take in inputs
onManageIngredients(){
 const actionSheet = this.actionSheetCtrl.create({
   title: 'What do you want to do?',
   buttons: [
    {
      text: 'Add Ingredient',
      handler: () => {
        actionSheet.onDidDismiss(() => {
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
            return false;
          }
          (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
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
