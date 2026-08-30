import {callApi} from './ApiService.Services'
import type {AxiosObject} from '../types/Axios.Types'
import type {HealthResponse} from '../types/HealthDetails'


export async function healthCheck(): Promise<HealthResponse> {
  const apiObject: AxiosObject = {
    method: "GET",
    endpoint: "health",
  };

 return callApi<HealthResponse>(apiObject);
}