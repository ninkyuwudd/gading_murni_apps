interface DataHeader {
  status: string;
  message: string;
  time_stamp: string;
  trace_code: string;
}

export interface ApiResponse<T = unknown> {
  data_header: DataHeader;
  data_body: T;
}
