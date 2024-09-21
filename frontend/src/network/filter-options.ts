import axios from "./axios-defaults";
import { globalErrorHandler } from "./api-helpers";

const baseUrl = "options"; 


export function getProjects(): Promise<any> {
  return axios
      .get(baseUrl+"?includeProjects=true")
      .catch(globalErrorHandler);
}