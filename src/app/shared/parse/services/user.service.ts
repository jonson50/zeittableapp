import { Attribute, Injectable } from "@angular/core";
import { UserDataResponse } from "@app/shared/interfaces/user-data-response.interface";
import Parse from 'parse';
import { Observable, from, map } from "rxjs";
import { ParseSetting } from "../models/setting";
import { Setting } from "@app/shared/interfaces/setting.interface";


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public getUserData(): Observable<UserDataResponse> {
    return from(Parse.Cloud.run('getUserData')).pipe(
      map((response) => {
        console.log(response)
        return {
          roles: response.roles.map((r:Parse.Object) => r.get('name')),
          settings: response.settings.map((setting:Parse.Object) => new ParseSetting(setting)),
          projects: response.projects.map((r:Parse.Object) => r.attributes),
        }
      })
    );
  }
}
