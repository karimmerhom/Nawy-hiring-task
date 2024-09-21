import { UnitType } from "../../contants/enums/UnitType";
import { IProject } from "./project.interface";
import { IAmenity } from "./amenity.interface";

export interface IUnitBase extends Document {
  name: string;
  refNumber: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  unityType: UnitType;
  imageUrls: string[];
  location: Location;
}

export interface IUnitMinimized extends IUnitBase {}

export interface IUnit extends IUnitBase {
  project: IProject;
  amenities: IAmenity[];
}
