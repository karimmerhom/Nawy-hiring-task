import express from "express";
import { validateGetItemsQuery } from "../validations/options.validation";
import { getProjectsAndAmenities } from "../controllers/options.controller";

const router = express.Router();
router.get("/", validateGetItemsQuery, getProjectsAndAmenities);
export default router;
