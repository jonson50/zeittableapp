import { Injectable, inject } from '@angular/core';
import { environment } from '@environments/environment';
import Parse from 'parse';
import { Observable, catchError, from, map, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
    Parse.initialize(environment.APP_ID, environment.JS_KEY);
    Parse.serverURL = environment.apiURL;
    let localData = localStorage.getItem(`Parse/${environment.APP_ID}/currentUser`);
    console.log(localData)
  }

  public login(user: string, password: string) {
    return from(Parse.User.logIn(user, password))
  }

  public logout() {
    //await Parse.User.logOut();
    console.log(`Parse/${environment.APP_ID}/currentUser`)
    this.removeItem(`Parse/${environment.APP_ID}/currentUser`);
    this.removeItem(`Parse/${environment.APP_ID}/installationId`);
  }

  public check(): Observable<boolean> {
    let currentUser = this.currentUser();
    if (!currentUser) return of(false);

    return from(Parse.User.become(currentUser.getSessionToken())).pipe(
      map(() => true),
      catchError(() => of(false))
    )
  }

  public currentUser() {
    return Parse.User.current()
  }

  private removeItem(key: string) {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  }
}
