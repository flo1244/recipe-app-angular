import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { onErrorResumeNext } from 'rxjs/operators';
import { AuthResponseData, AuthService } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';


@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent implements OnDestroy{
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

    private closeSub: Subscription;

    constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver){}

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode; //reverses the login mode. true -> false false ->true;

    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        
        this.isLoading = true;

        let authObs: Observable<AuthResponseData>;

        if (this.isLoginMode) {
            authObs = this.authService.login(email, password)
        } else {

            authObs = this.authService.signup(email, password) //forward the email and password which we extracted. we need to subscribe to the response data or return the value  of sign up which is that observable
        }
            
            authObs.subscribe(
                resData => {
                     console.log(resData);
                    this.isLoading = false;
                    this.router.navigate(['/recipes']);
                    },
                    errorMessage => {
                        console.log(errorMessage);
                        this.error = errorMessage;
                        this.showErrorAlert(errorMessage);//programmatic creation
                        this.isLoading = false;
                    });

            // console.log(form.value);
            form.reset();
        
    }


    onHandleError() {
        this.error = null;
    }

    ngOnDestroy(): void {
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }
    }

    //programmatic creation replaces our alert component modal
    private showErrorAlert(message: string) {
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        }); 
    }
}
