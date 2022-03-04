import { Component, OnInit } from '@angular/core';
// import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  // providers: [RecipeService] moving this to app module so we can have instance of this across our app so doesn't break. 
})
//we are putting recipe service in this component bc it serve for all recipe child components sharing the same instance
  
export class RecipesComponent implements OnInit {
  // selectedRecipe: Recipe; //this is undefined because I'm not assigning a value. I will assign a value here once this event here occurs**
  
  // constructor(private recipeService: RecipeService ) { }
  constructor() { }

  ngOnInit(): void {
    // this.recipeService.recipeSelected.subscribe((recipe: Recipe) => {
    //   this.selectedRecipe = recipe;
    // });
  }
  //decide whether the selected recipe and should render the detail component or if we should show "pleas select recipe".
  //this component is injected with the service so that all components within recipe folder use same instance.
  

}
