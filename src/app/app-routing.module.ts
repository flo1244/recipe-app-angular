//root routes providing the routing to our application bundling all the routing functionality.

import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";


//this will hold our array of routes ** we need a route to load our recipe section and one that loads our shopping list section
const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' }, //will only redirect if the path is empty.
    { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) }, // LAZY Loading ** use load children special property to only load the code content or add a module. To a string to the path you want to load when dispathcher is visited. 
    //***here we are adding a anonymous arrow function to call import as a function to import modules but call dynamically
    //**passing  the path to the module. the import resolves a promise. "then()" lock you pass a function which
    //receives the end of the module which is loaded here* /
    { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule) },
    { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
   
];
//add ngmodule to class to transform it fro normal TS class into angular module
@NgModule({
    //**passed another argument in our forRoot preloadingstrategy telling angular generally using lazy loading so it will not put all the code into one bundle it will split it  preload bundles asap  auth, recipes, and shopping list */
    imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules } )], //configs router module Angular ships with. configured and added to @angular/router
    exports: [RouterModule] //exports our configured router. 
})
export class AppRoutingModule {

}









// import { AuthComponent } from "./auth/auth.component";
// import { AuthGuard } from "./auth/auth.guard";
// import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
// import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
// import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
// import { RecipesResolverService } from "./recipes/recipes-resolver.service";
// import { RecipesComponent } from "./recipes/recipes.component";
// import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

 // {
    //     path: 'recipes', component: RecipesComponent,
    //     canActivate: [AuthGuard], //protects our route
    //     children: [
    //         { path: '', component: RecipeStartComponent }, //route to our recipe start component showing to select a recipe.
    //         { path: 'new', component: RecipeEditComponent }, // load our recipe detail component route.
    //         { path: ':id', component: RecipeDetailComponent, resolve:[RecipesResolverService] }, //route for new recipe
    //         { path: ':id/edit', component: RecipeEditComponent, resolve:[RecipesResolverService] }
    // ] },
    // { path: 'shopping-list', component: ShoppingListComponent },
    // { path: 'auth', component: AuthComponent}