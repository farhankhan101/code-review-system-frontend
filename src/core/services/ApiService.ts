import type { App } from "vue";
import type { AxiosResponse } from "axios";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/core/services/JwtService";
import type { Router } from "vue-router";
import Swal from "sweetalert2";

const backendUrl = import.meta.env.VITE_APP_API_URL;

/**
 * @description service to call HTTP request via Axios
 */
class ApiService {
  private static vueInstance: App;
  private static router: Router;

  public static init(app: App<Element>, router: Router) {
    ApiService.vueInstance = app;
    ApiService.router = router;

    app.use(VueAxios, axios);
    app.config.globalProperties.axios = axios;
    axios.defaults.baseURL = backendUrl;

    // Request interceptor
    axios.interceptors.request.use((config) => {
      const token = JwtService.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        try {
          console.error("API Error:", error);

          if (error.message !== "Network Error") {
            const originalRequest = error.config;

            if (
              error.response?.status === 401 &&
              !originalRequest._retry &&
              !originalRequest.url.includes("/obtain_token") &&
              !originalRequest.url.includes("/refresh_token")
            ) {
              originalRequest._retry = true;
              try {
                const newAccessToken = await JwtService.refreshToken();
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axios(originalRequest);
              } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                JwtService.destroyTokens();

                // Safe redirect
                if (ApiService.router) {
                  ApiService.router.push("/login");
                }

                return Promise.reject(refreshError);
              }
            }
          }
        } catch (e: any) {
          console.error("Error in interceptor:", e);
          if (e.code === "ERR_NETWORK") {
            Swal.fire({
              icon: "error",
              title: "Network Error",
              text: "The server is unreachable. Please check your internet connection.",
            });
          } else {
            throw e;
          }
        }
        return Promise.reject(error);
      }
    );
  }

  public static getBaseUrl(): string {
    return backendUrl;
  }

  public static setHeader(): void {
    axios.defaults.headers.common["Authorization"] = `Token ${JwtService.getAccessToken()}`;
    axios.defaults.headers.common["Accept"] = "application/json";
  }

  public static query(resource: string, params: any): Promise<AxiosResponse> {
    return axios.get(resource, params);
  }

  public static get(resource: string, slug = ""): Promise<AxiosResponse> {
    return axios.get(`${resource}/${slug}`);
  }

  public static post(resource: string, params: any): Promise<AxiosResponse> {
    return axios.post(`${resource}`, params);
  }

  public static patch(resource: string, params: any): Promise<AxiosResponse> {
    return axios.patch(`${resource}`, params);
  }

  public static multipartPost(resource: string, params: any): Promise<AxiosResponse> {
    return axios.post(`${resource}`, params, {
      headers: {
        Authorization: `Token ${JwtService.getAccessToken()}`,
        "Content-Type": "multipart/form-data",
      },
    });
  }

  public static multipartPut(resource: string, params: any): Promise<AxiosResponse> {
    return axios.patch(`${resource}`, params, {
      headers: {
        Authorization: `Token ${JwtService.getAccessToken()}`,
        "Content-Type": "multipart/form-data",
      },
    });
  }

  public static update(resource: string, slug: string, params: any): Promise<AxiosResponse> {
    return axios.put(`${resource}/${slug}`, params);
  }

  public static put(resource: string, params: any): Promise<AxiosResponse> {
    return axios.put(`${resource}`, params);
  }

  public static delete(resource: string): Promise<AxiosResponse> {
    return axios.delete(resource);
  }
}

export default ApiService;
