import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { take, exhaustMap } from 'rxjs/operators';

//Interceptor manipulates our request instead of manually doing them. 
//This interceptor will add the token to all outgoing requests.

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authService: AuthService){}

    //intercept method takes two arguments the request(HTTP request generic type any) and next: Httphandler 
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(take(1), exhaustMap(user => {
            if (!user) {
                return next.handle(req);
            }               //cloning our params setting them to new http params passing auth and user token.
                const modifiedReq = req.clone({params: new HttpParams().set('auth', user.token)})
                return next.handle(modifiedReq);
            })
            );
               
    }
}