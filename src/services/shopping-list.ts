
import { Ingredient } from '../models/ingredient';

export class ShoppingListService {

 ingredients: Ingredient[] = [];

 addIngedient(newIngredient: Ingredient){
   this.ingredients.push(newIngredient);
   console.log("inggredients array", this.ingredients);
 }

}
