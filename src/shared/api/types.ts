

export interface IResponseSuccess<T> {
  success: true;
  data: T;
  status: number;
}

export interface IResponseFailure {
  success: false;
  message: string;
  status: number;
}

export type APIResponse<T> = Promise<IResponseFailure | IResponseSuccess<T>>;

export type ReqState = {
  error?: string;
  isLoading: boolean;
};
