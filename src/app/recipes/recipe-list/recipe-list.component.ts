import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();**no longer need as we use the service now. // we are pass the recipe as type because the recipe that was select is the info that the recipes component will need.
  //@output so we can listen this event from the outside. 
  
  recipes: Recipe[];
  subscription: Subscription;

  //   new Recipe('Test', 'This is a test', 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2014/09/Mandarin-Chicken-Salad-8.jpg'),
  //   new Recipe('A Test Recipe', 'This is a test', 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2014/09/Mandarin-Chicken-Salad-8.jpg')
  // ];
  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute ) { }  //creating a instance of the service.

  ngOnInit(): void {
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );//allows up to update the recipe array with new recipe ...

    this.recipes = this.recipeService.getRecipes();
  }

  //here we implement our method 
  // now we can go to our recipe component for this feature area  on the list now listen to recipeWasSelected.
  // onRecipeSelected(recipe: Recipe) {
  //   this.recipeWasSelected.emit(recipe);
  // } *** no longer needed since we moved the event emitter to our service in recipe.service.

  //want to target or use the router us navigate method to target the path that needs to go to. Using relative route but we need to inform our router this by adding ActivatedRoute.
  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route}) //will point to current route. 
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
