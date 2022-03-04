import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f',{static: false}) slForm: NgForm; // access our form from the local reference. 
  subscription: Subscription;
  editMode = false; //whether or not we are editing
  editedItemIndex: number; // the index of the item we are editing
  editedItem: Ingredient;

  // @ViewChild('nameInput', {static:false}) nameInputRef: ElementRef; //pass our local reference as argument in @viewchild.
  // @ViewChild('amountInput', {static:false}) amountInputRef: ElementRef;
  // ingredientAdded = new EventEmitter<Ingredient>(); 
  //emit an event where pass this data to parent component which is shopping list. Passing object here as an argument
  //which will hold the name and amount

  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      );
  }
  
//we can now create new ingredient here with new keyword and then simply pass a name input ref native element value here that simply be the value of the input element and same for the amount.
  onSubmit(form: NgForm) {
    const value = form.value;
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(value.name, value.amount);//we specified name and amount  in our form.
    // this.ingredientAdded.emit(newIngredient); replaced by service.

    //allows us to edit the item. update the number of items.
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
