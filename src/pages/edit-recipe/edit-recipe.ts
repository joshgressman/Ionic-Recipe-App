import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {
  mode = 'New';
  selectOPtions = ['easy', 'medium', 'hard'];
  recipeForm: FormGroup;

  constructor(private navParams: NavParams){}

//Property being sent from the recipes page
ngOnInit(){
 this.mode = this.navParams.get('mode');
 this.initalizeForm();
}

onSubmit(){
  console.log(this.recipeForm);
}

onManageIngredients(){}

//Helper function that creates an instance of the reactive form
private initalizeForm() {
  this.recipeForm = new FormGroup({
   'title': new FormControl(null, Validators.required),
   'description': new FormControl(null, Validators.required ),
   'difficulty': new FormControl('Medium', Validators.required)

  });
}

}
