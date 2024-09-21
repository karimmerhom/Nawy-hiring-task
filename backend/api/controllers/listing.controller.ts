import { Request, Response } from "express";
import { notFound, ok, serverError } from "../network/response";
import { generateUniqueRandomDigits } from "../helpers/utilities";
import {
  AmenitiesMessages,
  ListingMessages,
  ProjectMessages,
} from "../../contants/network-enums/messages";
import {
  GetAllListingsResponse,
  ListingResponse,
} from "../../models/responses/listing-response.interface";
import { IProject } from "../../models/interfaces/project.interface";
import ProjectModel from "../../models/schemas/project.model";
import { IAmenity } from "../../models/interfaces/amenity.interface";
import AmenityModel from "../../models/schemas/amenity.model";
import {
  IListing,
  IListingMinimized,
} from "../../models/interfaces/listing.interface";
import ListingModel from "../../models/schemas/listing.model";

/**
 * @swagger
 * /listing:
 *   post:
 *     summary: Create a new listing
 *     tags: [Listings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               adType:
 *                 type: string
 *               price:
 *                 type: number
 *               unit:
 *                 type: object
 *                 properties:
 *                   projectId:
 *                     type: string
 *                   amenitiesIds:
 *                     type: array
 *                     items:
 *                       type: string
 *     responses:
 *       200:
 *         description: Listing created successfully
 *       404:
 *         description: Project or amenity not found
 *       500:
 *         description: Server error
 */ export const createListing = async (
  req: Request,
  res: Response,
): Promise<Response<ListingResponse> | void> => {
  try {
    const body = req.body;
    const { unit } = body;

    const project: IProject | null = await ProjectModel.findById(
      unit.projectId,
    );
    if (!project) {
      return notFound(res, ProjectMessages.PROJECT_NOT_FOUND);
    }

    const amenitiesIds: string[] = unit.amenitiesIds;
    let amenities: IAmenity[] = [];
    if (amenitiesIds && amenitiesIds.length > 0) {
      amenities = await AmenityModel.find({ _id: { $in: amenitiesIds } });
      if (amenities.length !== amenitiesIds.length) {
        return notFound(res, AmenitiesMessages.AMENITY_NOT_FOUND);
      }
    }

    const { projectId, amenitiesId, ...unitDetails } = body.unit;
    body.unit = {
      ...unitDetails,
      refNumber: generateUniqueRandomDigits(5),
      project,
      amenities,
    };

    const listing: IListing = body;

    let createdListing: IListing = await ListingModel.create(listing);
    const responseBody: ListingResponse = {
      message: ListingMessages.LISTING_CREATED_SUCCESSFULLY,
      listing: createdListing,
    };
    return ok<ListingResponse>(res, responseBody);
  } catch (e) {
    console.log(e);
    return serverError(res, ListingMessages.LISTING_CREATION_ERROR);
  }
};

/**
 * @swagger
 * /listing/{id}:
 *   get:
 *     summary: Get a listing by ID
 *     tags: [Listings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The listing ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Listing fetched successfully
 *       404:
 *         description: Listing not found
 *       500:
 *         description: Server error
 */
export const getListing = async (
  req: Request,
  res: Response,
): Promise<Response<ListingResponse> | void> => {
  try {
    const { id } = req.params;
    const listing: IListing | null = await ListingModel.findById(id);

    if (!listing) {
      return notFound(res, ListingMessages.LISTING_NOT_FOUND);
    }
    const responseBody: ListingResponse = {
      message: ListingMessages.LISTING_FETCHED_SUCCESSFULLY,
      listing: listing,
    };
    return ok<ListingResponse>(res, responseBody);
  } catch (e) {
    console.log(e);
    return serverError(res, ListingMessages.LISTING_FETCHING_ERROR);
  }
};

/**
 * @swagger
 * /listing:
 *   get:
 *     summary: Get all listings
 *     tags: [Listings]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: projectName
 *         schema:
 *           type: string
 *       - in: query
 *         name: bedrooms
 *         schema:
 *           type: integer
 *       - in: query
 *         name: bathrooms
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: adType
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Listings fetched successfully
 *       500:
 *         description: Server error
 */
export const getAllListings = async (
  req: Request,
  res: Response,
): Promise<Response<GetAllListingsResponse> | void> => {
  try {
    const {
      page,
      limit,
      projectName,
      bedrooms,
      bathrooms,
      search,
      adType,
    } = req.query;

    let query: any = {};

    if (projectName) {
      query["unit.project.name"] = projectName;
    }

    if (bedrooms) {
      query["unit.bedrooms"] = Number(bedrooms);
    }

    if (bathrooms) {
      query["unit.bathrooms"] = Number(bathrooms);
    }


    if (adType) {
      query["adType"] = adType;
    }

    if (search) {
      query["$or"] = [
        { "unit.name": { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { "unit.project.name": { $regex: search, $options: "i" } },
        { "unit.refNumber": { $regex: search, $options: "i" } },
      ].filter((condition) => Object.keys(condition).length);
    }

    const skip: number = (Number(page) - 1) * Number(limit);
    const listings: IListingMinimized[] = await ListingModel.find(query)
      .skip(skip)
      .limit(Number(limit))
      .select(
        "price adType rentType featured unit.location unit.name unit.imageUrls unit.area unit.bedrooms unit.bathrooms unit.unitType unit.refNumber _id",
      );

    const totalListings: number = await ListingModel.countDocuments(query);
    const responseBody: GetAllListingsResponse = {
      message: ListingMessages.LISTINGS_FETCHED_SUCCESSFULLY,
      listings: listings,
      pagination: {
        total: totalListings,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(totalListings/Number(limit))
      },
    };
    return ok<GetAllListingsResponse>(res, responseBody);
  } catch (e) {
    console.log(e);
    return serverError(res, ListingMessages.LISTING_FETCHING_ERROR);
  }
};
