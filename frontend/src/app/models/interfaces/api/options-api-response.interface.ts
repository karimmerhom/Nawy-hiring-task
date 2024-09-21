import {IBaseResponse} from "@/app/models/interfaces/api/base-response.interface";
import {IProject} from "@/app/models/interfaces/project.interface";
import {IAmenity} from "@/app/models/interfaces/amenity.interface";

export interface IOptionsApiResponse extends IBaseResponse{
    projects?:IProject[],
    amenities?:IAmenity[],
}