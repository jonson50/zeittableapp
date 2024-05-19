import { Project } from "./project.interface";
import { Setting } from "./setting.interface";

export interface UserDataResponse {
  roles: string[];
  settings: Setting[];
  projects: Project[];
}
