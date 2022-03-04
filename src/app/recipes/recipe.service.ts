import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";
//replacing event emitter with subject
import { Subject } from "rxjs";

@Injectable() //we injecting service within a service. 
//This service would manage our recipes.
export class RecipeService {
    //recipeSelected = new Subject<Recipe>(); //replaced by routers
    recipesChanged = new Subject<Recipe[]>(); //passes recipe array as a value.

    //no longer needs this since we can load and store our recipes.
    // private recipes: Recipe[] = [
    //     new Recipe('Mandarin Chicken Salad',
    //         'A sweet and savory salad with lemon vinaigrette.',
    //         'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2014/09/Mandarin-Chicken-Salad-8.jpg',
    //         [new Ingredient('Chicken breast', 2),
    //             new Ingredient('Mandarins', 4),
    //             new Ingredient('Lemon vinaigrette', 1),
    //             new Ingredient('Spinach', 3),
    //             new Ingredient('Avocado', 1),
    //             new Ingredient('Green onion', 2)
    //         ]),
    //     new Recipe('Shrimp and Broccoli',
    //         'This ultra flavorful shrimp and broccoli is easy dinner recipe.',
    //         'https://www.acouplecooks.com/wp-content/uploads/2020/03/Shrimp-and-Broccoli-017.jpg',
    //         [new Ingredient('Shrimp', 1),
    //             new Ingredient('Broccoli', 2),
    //             new Ingredient('White onion', 1),
    //             new Ingredient('Rice vinegar', 1),
    //             new Ingredient('Soy sauce', 1),
    //             new Ingredient('Chili garlic sauce', 2),
    //             new Ingredient('Sesame oil', 1)
    //         ])
    // ];
    private recipes: Recipe[] = []; //setting this to empty array so no recipes are loaded by default. 
    
    constructor(private slService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes; //will allow us to override our recipes so we can fetch data. 
        this.recipesChanged.next(this.recipes.slice());
    }

    //Creating method so we can access it from outside.
    //slice will return a new array .
    getRecipes() {
        return this.recipes.slice();
    }

    //we have no way of loading recipe ID in recipe detail component but we can now implement it here...created new method
    getRecipe(id: number) {
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients); //can call out addIngredients and pass our ingredients now. 
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}