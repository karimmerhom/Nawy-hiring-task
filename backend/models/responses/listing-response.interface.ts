import { IListing, IListingMinimized } from "../interfaces/listing.interface";

export interface ListingResponse {
  message: string;
  listing: IListing;
}

export interface GetAllListingsResponse {
  message: string;
  listings: IListingMinimized[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
