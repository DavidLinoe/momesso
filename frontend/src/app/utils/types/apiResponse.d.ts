export interface ResponseApi<T> {
  statusCode: number;
  message: string;
  loading: boolean;
  error: string | null;
  data: T;
  count?: number;
}
