import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.model';
// import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() index: number; // we can pass the index of this item from outside from recipe list
  // @Output() recipeSelected = new EventEmitter<void>(); //this emitter wont pass any information @output that we can listen to this event from outside
  //recipe of single item component it will be of type Recipe so we have to import it from our own recipe model 
  //initial it will not be defined  there we wont assign a value because we want to get this recipe from outside.
  //to get recipe from the outside we add decorator @input allows us to bind this component property from outside,
  //bind it from recipe ist component now in our recipe list component we bind our recipe referring to the property in the single recipe item bind the recipe of the current loop iteration. 
  // constructor(private recipeService: RecipeService) { } //injecting event emitter from our service. 

  ngOnInit(): void {
  }

  // onSelected() {
  //   this.recipeService.recipeSelected.emit(this.recipe);
  //   // this.recipeSelected.emit();
  // }

}
