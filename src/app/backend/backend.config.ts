import { BackendController } from "./backend.controller";

export const API_URL = 'http://localhost:4200';

export enum HTTP_METHOD {
  GET = 'GET',
  POST = 'POST',
}

export const ENDPOINTS = {
  DATA: `${API_URL}/data`
}

export const ENDPOINTS_CONTROLLER_METHODS = {
  [HTTP_METHOD.GET]: {
    data: BackendController.getData
  },
  [HTTP_METHOD.POST]: {
    data: BackendController.updateData,
  }
}