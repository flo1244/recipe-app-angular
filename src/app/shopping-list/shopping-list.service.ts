
//replace emit with next() instead...
import { Ingredient } from "../shared/ingredient.model";

//replacing our emitters with subjects
import { Subject } from 'rxjs';

export class ShoppingListService {
    // ingredientsChanged = new EventEmitter<Ingredient[]>(); //informing the component that new data is available.**if not our slice would not allow us to add new ingredient original not a copy. 
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
 ];
   //add a getIngredients method here where return ingredients but only a copy of it with slice method. So can't access the original array stored.  
    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index]; //get the ingredient which expects  to get the index of a number returning as the ingredient from the array. 
    }

    //allows to add ingredients. 
    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    //now we always have the right ingredients array in the service and we inform other interested components
    // about that change in the event we're emitting here.
     //we simply call this ingredients changed and emit a new event
    
    
    //we shall receive our ingredients
    addIngredients(ingredients: Ingredient[]) {
        // for (let ingredient of ingredients) {
        //     this.addIngredient(ingredient);
        // } this is a viable option but emitts a lot of events could cause bugs.
        this.ingredients.push(...ingredients); //access our ingredients call push method use spread operator to allow us to turn array elements into a list of elements *bc push method can can't handle multiple items in array it would push single item.
        this.ingredientsChanged.next(this.ingredients.slice());//emitt the event
    }

    //reaching out to our ingredients get the one with the index  set it to new ingredient and call ingredients changed and emit updateIngredients.
    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    //allows to remove the index of an item.
    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}