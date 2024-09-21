import {IProject} from "@/app/models/interfaces/project.interface";
import {IAmenity} from "@/app/models/interfaces/amenity.interface";
import {ILocation} from "@/app/models/interfaces/location.interface";


export interface IUnit  {
  name: string;
  refNumber: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  unityType: string;
  imageUrls: string[];
  location: ILocation;
  project?: IProject;
  amenities?: IAmenity[];
}


