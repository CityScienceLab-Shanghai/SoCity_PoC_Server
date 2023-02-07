export default interface AxiosResponse {
  status?: number;
  statusText?: string;
  headers?: any;
  data?: {
    status?: string;
    msg?: string;
    data?: any;
  };
}
