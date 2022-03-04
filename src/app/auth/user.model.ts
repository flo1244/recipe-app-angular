//model stores core data that makes up a user and validate them. 
export class User {
    constructor(public email: string, public id: string, private _token: string, private _tokenExpirationDate: Date) {
        
    }
//getter allows us to access the token like a property so we can do something with it. 
    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }
}
