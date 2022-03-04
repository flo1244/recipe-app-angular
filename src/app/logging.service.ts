import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'}) //if we moved this to app module in providers array it would have the same affect.
export class LoggingService {
    lastlog: string;

    printLog(message: string) {
        console.log(message);
        console.log(this.lastlog);
        this.lastlog = message;
    }
}

//if we provide this service in a lazy loading module we may encounter issues.
//such as the shopping list module which uses its own instance and all the components in there
//use a separate instance of logging service they don't use it app wide instance they user their
// own created by the child injector. 