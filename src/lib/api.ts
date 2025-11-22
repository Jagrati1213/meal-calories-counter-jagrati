import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { useAuthStore } from "../stores/authStore";

// Api error type
interface ErrorResponse {
  error?: string;
  message?: string;
  [key: string]: any;
}

// Define a response
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}

// Create a custom error
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any,
    public originalError?: AxiosError
  ) {
    super(message);
    this.name = "ApiError";
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}

// Create a axios instance
const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 10000, // 10 seconds
    withCredentials: false, // Set to true if you need to send cookies
  });

  // Get the current token from the store
  const getToken = () => {
    return useAuthStore.getState().token;
  };

  instance.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response) {
        const { status, data } = error.response as { status: number; data: ErrorResponse };
        return Promise.reject(
          new ApiError(
            data?.error || data?.message || "An unexpected error occurred",
            status,
            data,
            error
          )
        );
      } else if (error.request) {
        // The request was made but no response was received
        return Promise.reject(
          new ApiError(
            "No response received from server",
            undefined,
            undefined,
            error
          )
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        return Promise.reject(
          new ApiError(`Error: ${error.message}`, undefined, undefined, error)
        );
      }
    }
  );

  return instance;
};

// Export a default instance with your API base URL
const api = createAxiosInstance(process.env.NEXT_PUBLIC_API_BASE_URL || "/api");

export default api;
