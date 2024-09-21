import { Request, Response } from "express";
import { ok, serverError } from "../network/response";
import { OptionsMessages } from "../../contants/network-enums/messages";
import { OptionsResponse } from "../../models/responses/options-response.interface";
import ProjectModel from "../../models/schemas/project.model";
import AmenityModel from "../../models/schemas/amenity.model";

/**
 * @swagger
 * /options:
 *   get:
 *     summary: Get projects and amenities
 *     tags: [Options]
 *     parameters:
 *       - in: query
 *         name: includeProjects
 *         required: false
 *         description: Include projects in the response
 *         schema:
 *           type: boolean
 *           example: true
 *       - in: query
 *         name: includeAmenities
 *         required: false
 *         description: Include amenities in the response
 *         schema:
 *           type: boolean
 *           example: true
 *     responses:
 *       200:
 *         description: Options fetched successfully
 *       500:
 *         description: Server error
 */
export const getProjectsAndAmenities = async (
  req: Request,
  res: Response,
): Promise<Response<OptionsResponse> | void> => {
  try {
    const { includeProjects, includeAmenities } = req.query;

    const responseBody: OptionsResponse = {};

    if (includeProjects === "true") {
      responseBody.projects = await ProjectModel.find();
    }

    if (includeAmenities === "true") {
      responseBody.amenities = await AmenityModel.find();
    }

    responseBody.message = OptionsMessages.OPTIONS_FETCHED_SUCCESSFULLY;

    return ok<OptionsResponse>(res, responseBody);
  } catch (error) {
    console.error(error);
    return serverError(res, OptionsMessages.OPTIONS_FETCHING_ERROR);
  }
};
