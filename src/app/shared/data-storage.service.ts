import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { map, tap, take, exhaustMap } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Injectable({ providedIn: 'root' }) //instead of putting in providers array in app module. 
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { } // injecting httpClient so we can use it.
    
    storeRecipes() {
        const recipes = this.recipeService.getRecipes(); //retrieves our recipes
        //put request overrides  all data that is stored under that node
        this.http.put('https://ng-course-recipe-book-ebcc5-default-rtdb.firebaseio.com/recipes.json', recipes) //sending our recipes
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes() {
        //takes 1 value and automatically unsubscribes and we don't want set an on going subscription to get users. Ondemand with fetch is executed.
        // return this.authService.user.pipe(take(1), exhaustMap(user => {
            return this.http.get<Recipe[]>('https://ng-course-recipe-book-ebcc5-default-rtdb.firebaseio.com/recipes.json', 
                // {params: new HttpParams().set('auth', user.token)}
            ).pipe(
                    map(recipes => {
                        return recipes.map(recipe => {
                            return {
                                ...recipe,
                                ingredients: recipe.ingredients ? recipe.ingredients : []
                            };
                        });
                    }),
                    tap(recipes => {
                        this.recipeService.setRecipes(recipes);
                    })
                );
       
        }
    }
      
            // .pipe(map(recipes => {//map here allows us to transform the data
            //     return recipes.map(recipe => {//map is allowing us to transform to elements into a array  we will return the transformed recipe
            //         return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []} //when we return a ingredient that does not have any we set it to empty array to avoid bugs. 
            //     });//**provides protection from bugs and errors to at least provide an empty array. */
            // }),
            //     tap(recipes => {
            //         this.recipeService.setRecipes(recipes);
            // })
        
            //     .subscribe(recipes => {
            //         this.recipeService.setRecipes(recipes); //will forward our recipes.
            //         // console.log(recipes);
            // })
        

//we subscribe where we want to get a response. 
// Instead, it would be fine to just subscribe in the data storage service where we already inject the

// recipes service because maybe we can do something with the recipes service then to push or to move our

// fetched recipes into that recipes service which in the end is the place where we do manage our recipe.