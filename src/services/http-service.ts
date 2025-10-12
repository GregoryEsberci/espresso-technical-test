import { Axios, AxiosRequestConfig } from 'axios';

export class HttpService {
  constructor(protected axios: Axios) {}

  async get<T>(url: string, config?: AxiosRequestConfig) {
    return this.axios.get<T>(url, config);
  }

  async post<T, D>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
    return this.axios.post<T>(url, data, config);
  }

  async put<T, D>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
    return this.axios.put<T>(url, data, config);
  }

  async patch<T, D>(url: string, data?: D, config?: AxiosRequestConfig<D>) {
    return this.axios.patch<T>(url, data, config);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig) {
    return this.axios.delete<T>(url, config);
  }

  async head<T>(url: string, config?: AxiosRequestConfig) {
    return this.axios.head<T>(url, config);
  }

  async options<T>(url: string, config?: AxiosRequestConfig) {
    return this.axios.options<T>(url, config);
  }
}
