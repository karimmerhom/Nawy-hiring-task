import {ISeller} from "@/app/models/interfaces/seller.interface";
import {IUnit} from "@/app/models/interfaces/unit.interface";


export interface IListing  {
  _id: string;
  adType: string;
  price: number;
  unit: IUnit;
  featured: boolean;
  description: string;
  rentType?: string;
  seller?: ISeller;
}


