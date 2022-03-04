import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  // @Input() recipe: Recipe; no longer need as we are using routes to fetch our data.
  recipe: Recipe;
  id: number; //store id
  
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  //instead of using snapshot we will use subscribe to react any changes in our route params
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']; // so we can identify our recipe.
      this.recipe = this.recipeService.getRecipe(this.id); //fetching new recipe passing id as argument.
    });
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients); //these ingredients are passed to the recipe service
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']); //once deleted navigates to main view again. redirecting
  }
}
