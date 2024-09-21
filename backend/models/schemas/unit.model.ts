import mongoose from "mongoose";
import LocationModel from "./location.model";
import AmenityModel from "./amenity.model";
import ProjectModel from "./project.model";
import { UnitType } from "../../contants/enums/UnitType";
import { IUnit } from "../interfaces/unit.interface";

const unitSchema = new mongoose.Schema<IUnit>({
  name: { type: String, required: true },
  refNumber: { type: String, required: true, unique: true },
  bedrooms: { type: Number, required: true },
  bathrooms: { type: Number, required: true },
  area: { type: Number, required: true },
  unityType: {
    type: String,
    enum: Object.values(UnitType),
    required: true,
  },
  imageUrls: { type: [String], default: [] },
  project: { type: ProjectModel.schema, required: true },
  amenities: [{ type: AmenityModel.schema, require: true }],
  location: { type: LocationModel.schema, require: true },
});

const UnitModel = mongoose.model("unit", unitSchema);

export default UnitModel;
