import express from "express";
import {
  createListing,
  getAllListings,
  getListing,
} from "../controllers/listing.controller";
import {
  validateCreateListing,
  validateGetAllListings,
  validateGetListing,
} from "../validations/listing.validation";

const router = express.Router();

// Define create listing route
router.post("/", validateCreateListing, createListing);

// Define get listings route
router.get("/", validateGetAllListings, getAllListings);

// Define get listing route
router.get("/:id", validateGetListing, getListing);

// Export the router
export default router;
