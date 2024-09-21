import { ListingType } from "../../contants/enums/ListingType";
import { RentType } from "../../contants/enums/RentType";
import { IUnit, IUnitMinimized } from "./unit.interface";
import { ISeller } from "./seller.interface";

export interface IListingBase extends Document {
  adType: ListingType;
  price: number;
  rentType?: RentType;
  featured: boolean;
}

export interface IListingMinimized extends IListingBase {
  unit: IUnitMinimized;
}

export interface IListing extends IListingBase {
  description: string;
  unit: IUnit;
  seller: ISeller;
}
