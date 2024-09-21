import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import { validationError } from "../network/response";

export const validateGetItemsQuery = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  const schemaQuery = Joi.object({
    includeProjects: Joi.string().valid("true", "false").optional(),
    includeAmenities: Joi.string().valid("true", "false").optional(),
  }).or("includeProjects", "includeAmenities");

  const isValidQuery = schemaQuery.validate(req.query);
  if (isValidQuery.error) {
    let errorMsg = isValidQuery.error.details[0].message;
    return validationError(res, errorMsg);
  }

  next();
};
