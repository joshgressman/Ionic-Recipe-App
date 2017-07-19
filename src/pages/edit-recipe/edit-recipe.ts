import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {
  mode = 'New';
  selectOPtions = ['easy', 'medium', 'hard'];

  constructor(private navParams: NavParams){}

//Property being sent from the recipes page
ngOnInit(){
 this.mode = this.navParams.get('mode');
}

}
