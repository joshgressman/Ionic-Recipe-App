
import { Ingredient } from '../models/ingredient';

export class ShoppingListService {

 private ingredients: Ingredient[] = [];

 addIngedient(name: string, amount: number){
   this.ingredients.push(new Ingredient(name, amount));
   console.log("inggredients array", this.ingredients);
 }

}
