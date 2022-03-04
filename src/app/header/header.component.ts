import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})


export class HeaderComponent implements OnInit, OnDestroy{
    collapsed = true;
    isAuthenticated = false;
    private userSub: Subscription;

    // we attach @output property decorator to make it listenable from the parent component
    // @Output() featureSelected = new EventEmitter<string>();
    // we need to emit our event
    // onSelect(feature: string) {
    //     // now we use this property which now holds this event emitter as a value to emit an event whenever we click one of the buttons
    //     //string we recieve from these method calls here in our template.
    //     // this.featureSelected.emit(feature);
    // }
    constructor(private dataStorageService: DataStorageService, private authService: AuthService){} // injecting our datastorage service

    ngOnInit(): void {
        this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user; //not not user checking if we no have a user which will be true if the user is null and false if we have a user object. 
        });
    }

    onSaveData() {
        this.dataStorageService.storeRecipes();//calling our data storage to save data. 
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout() {
        this.authService.logout();
    }

    //clears the subscription
    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }

    
}