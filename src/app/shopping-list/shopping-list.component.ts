import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[]; //set to uninitialized array
  private igChangeSub: Subscription; //store subscription in some property and clean it up when we leave component. 

  constructor(private slService: ShoppingListService, private loggingService : LoggingService) { }

  //assigning ingredients to whatever the shopping list service returns.
  ngOnInit(): void {
    this.ingredients = this.slService.getIngredients();
    this.igChangeSub = this.slService.ingredientsChanged.subscribe((ingredients: Ingredient[]) => {
      this.ingredients = ingredients;
      
    });
    //reach out to my shopping list service and simply subscribe to that ingredients changed event.
    // So now whenever ingredients change, I know that I will get them,

    this.loggingService.printLog('Hello from shopping list component'); //testing service
  }

  //we receive an ingredient here of type ingredient that is what our event emits the data we set up there
  //now we can reach out to our ingredients array and push a new ingredient
  // onIngredientAdded(ingredient: Ingredient) {
  //   this.ingredients.push(ingredient);
  // }
  onEditItem(index: number) {
    this.slService.startedEditing.next(index);// emit a new value the index pass it to subject so we can listen to it in shopping edit component. 
}

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe();
  }
}
