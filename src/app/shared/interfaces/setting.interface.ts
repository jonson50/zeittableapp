export interface Setting {
  id:string;
  current: boolean;
  workingDaysHours: any; // To Define
  maxCompensatory: number;
  zone: any // => to Defome
  previousOverHours: number;
  validityTimeEntry: number;
  nightHours: any; // => To define
  yearHolodays: any[]; // To Define
  exceptionWorkingDays: any[] // To Define
}
