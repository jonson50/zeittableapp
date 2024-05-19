import { Setting } from "@app/shared/interfaces/setting.interface";
import Parse from 'parse';

export class ParseSetting implements Setting {
  id: string;
  current: boolean;
  workingDaysHours: any;
  maxCompensatory: number;
  zone: any;
  previousOverHours: number;
  validityTimeEntry: number;
  nightHours: any;
  yearHolodays: any[];
  exceptionWorkingDays: any[];

  constructor(object: Parse.Object) {
    this.id = object.id;
    this.current = object.get('current');
    this.workingDaysHours = object.get('workingDaysHours');
    this.maxCompensatory = object.get('maxCompensatory');
    this.zone = object.get('zone');
    this.previousOverHours = object.get('previousOverHours');
    this.validityTimeEntry = object.get('validityTimeEntry');
    this.nightHours = object.get('nightHours');
    this.yearHolodays = object.get('yearHolodays');
    this.exceptionWorkingDays = object.get('exceptionWorkingDays');
  }
}
