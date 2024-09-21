import mongoose from "mongoose";
import { ISeller } from "../interfaces/seller.interface";

const sellerSchema = new mongoose.Schema<ISeller>({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
});

const SellerModel = mongoose.model("seller", sellerSchema);

export default SellerModel;
