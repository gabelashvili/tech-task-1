export interface ResponseModel<T> {
  data: T;
  errorMessage: string | null;
}
