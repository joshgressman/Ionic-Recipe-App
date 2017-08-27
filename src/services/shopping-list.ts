
import { Ingredient } from '../models/ingredient';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx'; //unlocks obsevable operators
import { AuthService } from './auth';

@Injectable() //used to inject the Http service
export class ShoppingListService {

 private ingredients: Ingredient[] = [];

  constructor(private http: Http, private authService: AuthService){}

  //Adds a single ingredient
 addItem(name: string, amount: number){
   this.ingredients.push(new Ingredient(name, amount));
   console.log("inggredients array", this.ingredients);
 }

  //add multiple ingredients in an arrat,deconstructs array with ... and pushes
 addItems(items: Ingredient[]){
   this.ingredients.push(...items); /// ... deconstructs array to push to another array
 }

 //Gets instance of ingredients[] with .slice()
 getItems(){
   return this.ingredients.slice();
 }

 //Removes item in the ingredients[]
 removeItem(index: number){
   this.ingredients.splice(index, 1);
 }
  //With the token we will create a seperate node / object per user
  //will send the list of ingredients within this service
  storeList(token: string){
   const userId = this.authService.getActiveUser().uid;
   return this.http.put('https://ng-recipe-book-a78ad.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token, this.ingredients)
   .map((response: Response) => {
     return response.json();
   });
  }

  fetchList(token: string){
    const userId = this.authService.getActiveUser().uid;
    return this.http.get('https://ng-recipe-book-a78ad.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token)
    .map((response: Response) => {
     return response.json();
    })
    .do((data) => {
      this.ingredients = data;
    });
  }
}
