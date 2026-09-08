import {callApi} from './ApiService.Services'
import type {AxiosObject} from '../types/AxiosObject.Types'
import type {HealthResponse} from '../types/HealthDetails'


export async function healthCheck(): Promise<HealthResponse> {
  const apiObject: AxiosObject = {
    method: "GET",
    endpoint: "auth/me",
    requiresAuth: true,
  };

 return callApi<HealthResponse>(apiObject);
}