export default interface AxiosResponse {
  status?: number;
  statusText?: string;
  headers?: any;
  data?: {
    status?: number;
    msg?: string;
    data?: any;
  };
}
