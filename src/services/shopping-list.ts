
import { Ingredient } from '../models/ingredient';

export class ShoppingListService {

 private ingredients: Ingredient[] = [];

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

}
