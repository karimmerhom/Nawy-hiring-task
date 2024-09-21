import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import { ListingType } from "../../contants/enums/ListingType";
import { RentType } from "../../contants/enums/RentType";
import { UnitType } from "../../contants/enums/UnitType";
import { validationError } from "../network/response";

const locationSchema = Joi.object({
  region: Joi.string().min(2).required(),
  area: Joi.string().min(2).required(),
  subArea: Joi.string().min(2).required(),
});

const unitSchema = Joi.object({
  name: Joi.string().min(3).required(),
  bedrooms: Joi.number().integer().required(),
  bathrooms: Joi.number().integer().required(),
  area: Joi.number().integer().required(),
  unityType: Joi.string()
    .valid(...Object.values(UnitType))
    .required(),
  imageUrls: Joi.array().items(Joi.string()).default([]),
  projectId: Joi.string().required().length(24).hex().required(),
  amenitiesIds: Joi.array()
    .items(Joi.string().length(24).hex().required())
    .default([]),
  location: locationSchema.required(),
});

const sellerSchema = Joi.object({
  name: Joi.string().required(),
  phoneNumber: Joi.string()
    .pattern(/^\+20\d{10}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Phone number must be a valid format starting with +20.",
      "any.required": "Phone number is required.",
    }),
  email: Joi.string().email().required(),
});

export const validateCreateListing = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  const schemaBody = Joi.object({
    description: Joi.string().min(5).required(),
    adType: Joi.string()
      .valid(...Object.values(ListingType))
      .required(),
    price: Joi.number().positive().required(),
    rentType: Joi.string()
      .valid(...Object.values(RentType))
      .when(Joi.ref("adType"), {
        is: ListingType.RENT,
        then: Joi.required(),
        otherwise: Joi.forbidden(),
      }),
    featured: Joi.boolean().default(false),
    unit: unitSchema.required(),
    seller: sellerSchema.required(),
  });

  const isValidBody = schemaBody.validate(req.body);
  if (isValidBody.error) {
    let errorMsg = isValidBody.error.details[0].message;
    return validationError(res, errorMsg);
  }

  next();
};

export const validateGetListing = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  const schemaParam = Joi.object({
    id: Joi.string().length(24).hex().required(),
  });

  const isValidPrams = schemaParam.validate(req.params);
  if (isValidPrams.error) {
    let errorMsg = isValidPrams.error.details[0].message;
    return validationError(res, errorMsg);
  }

  next();
};

export const validateGetAllListings = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  const schemaQuery = Joi.object({
    page: Joi.string().pattern(/^\d+$/).required(),
    limit: Joi.string().pattern(/^\d+$/).required(),
    projectName: Joi.string().optional(),
    bedrooms: Joi.string().pattern(/^\d+$/).optional(),
    bathrooms: Joi.string().pattern(/^\d+$/).optional(),
    search: Joi.string().optional(),
    adType: Joi.string()
      .valid(...Object.values(ListingType))
      .optional(),
  });
  const isValidQuery = schemaQuery.validate(req.query);
  if (isValidQuery.error) {
    let errorMsg = isValidQuery.error.details[0].message;
    return validationError(res, errorMsg);
  }

  next();
};
