import mongoose from "mongoose";
import { ILocation } from "../interfaces/location.interface";

const locationSchema = new mongoose.Schema<ILocation>({
  region: { type: String, required: true },
  area: { type: String, required: true },
  subArea: { type: String, required: true },
});

const LocationModel = mongoose.model("location", locationSchema);

export default LocationModel;
