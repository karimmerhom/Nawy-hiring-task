import { IProject } from "../interfaces/project.interface";
import { IAmenity } from "../interfaces/amenity.interface";

export interface OptionsResponse {
  message?: string;
  projects?: IProject[];
  amenities?: IAmenity[];
}
