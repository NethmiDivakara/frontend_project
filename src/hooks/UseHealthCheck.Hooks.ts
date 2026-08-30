import { healthCheck } from "../services/HealthCheck.Service";
import type { HealthResponse } from "../types/HealthDetails";

export function useHealthCheck() {
	const checkHealth = async (): Promise<HealthResponse | undefined> => {
		try {
			const response = await healthCheck();
			console.log("Health check response:", response);
			return response;
		} catch (error) {
			console.error("Health check failed:", error);
			return undefined;
		}
	};

	return { checkHealth };
}
