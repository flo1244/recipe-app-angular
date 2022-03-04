import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

// import { RecipesModule } from './recipes/recipes.module'; **LAZY loading can't be here or we will load both eagerly and lazy breaks app. 
// import { ShoppingListModule } from './shopping-list/shopping-list.module'; LAZY LOADING
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
// import { AuthModule } from './auth/auth.module';LAZY LOADING




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // RecipesComponent,
    // RecipeListComponent,//multiple declarations of the same thing is not allowed. 
    // RecipeDetailComponent,
    // RecipeItemComponent,
    // ShoppingListComponent,
    // ShoppingEditComponent,
    // DropdownDirective,
    // RecipeStartComponent,
    // RecipeEditComponent,
    // AuthComponent,
    // LoadingSpinnerComponent,
    // AlertComponent,
    // PlaceholderDirective
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // FormsModule,
    ReactiveFormsModule,
    HttpClientModule, //unlocks the http client  so we can inject it 
    // RecipesModule, **LAZY loading can't be here or we will load both eagerly and lazy breaks app.
    // ShoppingListModule, *LAZY LOADING
    SharedModule,
    CoreModule,
    // AuthModule * LAZY LOADING
  ],
  // providers: [
  //   ShoppingListService,
  //   RecipeService,
  //   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  // ],  //adding this provider so we can access it in our recipe folder as well. Or application wide. 
  bootstrap: [AppComponent],
  // entryComponents: [AlertComponent]
})
export class AppModule { }

// **crucial to  provide services through @injectable or in the app module unless you want multiple instances.
//ng build --prod uses ahead of time computation. optimizing our app because it will be compiled already. 



// import { RecipesComponent } from './recipes/recipes.component';
// import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
// import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
// import { RecipeItemComponent } from './recipes/recipe-list/recipe-item/recipe-item.component';
// import { ShoppingListComponent } from './shopping-list/shopping-list.component';
// import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
// import { DropdownDirective } from './shared/dropdown.directive';
// import { ShoppingListService } from './shopping-list/shopping-list.service';
// import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
// import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
// import { RecipeService } from './recipes/recipe.service';
// import { RecipesResolverService } from './recipes/recipes-resolver.service';
// import { AuthComponent } from './auth/auth.component';
// import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
// import { AuthInterceptorService } from './auth/auth-interceptor.service';
// import { AlertComponent } from './shared/alert/alert.component';
// import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';