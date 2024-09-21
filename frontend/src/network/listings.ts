import axios from "./axios-defaults";
import { globalErrorHandler } from "./api-helpers";

const baseUrl = "listing"; 

export interface ListingsOptionsRequest {
  page: number;              
  limit: number;             
  projectName?: string;       
  bedrooms?: number;          
  bathrooms?: number;         
  search?: string;            
  refNumber?: string;         
  name?: string;              
  adType?: string;         
}

export function getListings(params?: ListingsOptionsRequest): Promise<any> {
  return axios
      .get(baseUrl, { params })
      .catch(globalErrorHandler);
}