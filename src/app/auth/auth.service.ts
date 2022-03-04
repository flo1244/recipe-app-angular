import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { catchError } from "rxjs/operators";
import { BehaviorSubject, throwError, tap } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

//data we want to return 
export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root'})
export class AuthService {
    user = new BehaviorSubject<User>(null);// null here because we don't want to start off with a user. 
    private tokenExpirationTimer: any; //stores our token. 
    


    constructor(private http: HttpClient, private router: Router) {}

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAc83Ksq-xZ5FMNfluWtBV5UCJPXG84lQo', {
            email: email,
            password: password,
            returnSecureToken: true
        }
        ).pipe(catchError(this.handleError), tap(resData => {
            const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
            const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);
            this.user.next(user);//emit this as our currently logged in user. 
                }
            )
        );
            
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAc83Ksq-xZ5FMNfluWtBV5UCJPXG84lQo', {
            email: email,
            password: password,
            returnSecureToken: true //takes these as the body. 
        }
        ).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }
        ));
    }

    //will check our local storage for login so we can auto login.
    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout() {
        this.user.next(null); //treats the user as un-authenticated. 
        this.router.navigate(['/auth']); //redirects after page is logged out. 
        localStorage.removeItem('userData'); //clears data when user logs out. 
        //checking if we do have a active timer. 
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    //manages a timer based on token to make it invalid to automatically log out. 
    autoLogout(expirationDuration: number) {
        console.log(expirationDuration);
       this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
            const user = new User(email, userId, token, expirationDate);
        this.user.next(user)
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user)); //storing our local user data. 
    }

    //central function to handle our errors. 
    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
            if (!errorRes.error || !errorRes.error.error) {
                return throwError(errorMessage);
            }
            switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = 'This email exists already!!!';
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'This email does not exist';
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = 'This password is not  correct.';
                    break;
                        }
            return throwError(errorMessage);
                        
        
    }
}


//code that has been refactored :
 //     (errorRes => {
        //     let errorMessage = 'An unknown error occurred!';
        //     if (!errorRes.error || !errorRes.error.error) {
        //         return throwError(errorMessage);
        //     }
        //     switch (errorRes.error.error.message) {
        //                     case 'EMAIL_EXISTS':
        //                         errorMessage = 'This email exists already!!!';
        //                 }
        //     return throwError(errorMessage);
                        
        // })
         //holds three properties email, password, returnsecuretoken according to docs. 