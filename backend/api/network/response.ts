import { Response } from "express";
import { statusCodes } from "../../contants/network-enums/statusCodes";

function response<T>(res: Response, status: statusCodes, body?: T): Response {
  return res.status(status).json(body);
}

function ok<T>(res: Response, body?: T): Response {
  return response<T>(res, statusCodes.OK, body);
}

function validationError(res: Response, message: string): Response {
  return response(res, statusCodes.INVALID, { message: message });
}

function notFound(res: Response, message: string): Response {
  return response(res, statusCodes.NOT_FOUND, { message: message });
}

function serverError(res: Response, message: string): Response {
  return response(res, statusCodes.SERVER_ERROR, { message: message });
}

export { response, validationError, serverError, notFound, ok };
