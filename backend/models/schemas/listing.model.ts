import mongoose from "mongoose";
import UnitModel from "./unit.model";
import SellerModel from "./seller.model";
import { RentType } from "../../contants/enums/RentType";
import { ListingType } from "../../contants/enums/ListingType";
import { IListing } from "../interfaces/listing.interface";

const listingSchema = new mongoose.Schema<IListing>({
  description: { type: String, required: true },
  adType: {
    type: String,
    enum: Object.values(ListingType),
    required: true,
  },
  price: { type: Number, required: true },
  rentType: {
    type: String,
    enum: Object.values(RentType),
    required: false,
  },
  featured: { type: Boolean, default: false },
  unit: { type: UnitModel.schema, required: true },
  seller: { type: SellerModel.schema, required: true },
});

const ListingModel = mongoose.model("Listing", listingSchema);

export default ListingModel;
