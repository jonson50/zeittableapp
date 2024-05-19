import { Attribute, Injectable } from "@angular/core";
import { UserDataResponse } from "@app/shared/interfaces/user-data-response.interface";
import Parse from 'parse';
import { Observable, from, map } from "rxjs";
import { ParseSetting } from "../models/setting";
import { Setting } from "@app/shared/interfaces/setting.interface";


@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  public getEmployees(): Observable<UserDataResponse> {
    return from(Parse.Cloud.run('getEmployees')).pipe(
      map((response) => {
        console.log(response)
        return response
      })
    );
  }
}
