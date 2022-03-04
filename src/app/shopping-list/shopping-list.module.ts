// import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    declarations: [
    ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports: [
        SharedModule,
        FormsModule,
        RouterModule.forChild([{ path: '', component: ShoppingListComponent }])//moving shopping list path to lazy loading** empty path to our global lazy loading path. 
    ]
})

export class ShoppingListModule {}