import {IBaseResponse} from "@/app/models/interfaces/api/base-response.interface";
import {IListing} from "@/app/models/interfaces/listing.interface";
import {PaginationDetails} from "@/app/models/interfaces/pagination-details.interface";

export interface IListingsApiResponse extends IBaseResponse{
    listings:IListing[],
    pagination: PaginationDetails
}