import {ApiResponse} from './apiResponse';

export type NotificationsParams = {
  page?: number;
  size?: number;
};

export type NotificationsPaginated = {
  current_page: number;
  data: Notification[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};

export type Notification = {
  id: string;
  user_id: string;
  from_user_id: string;
  type: string;
  is_read: number;
  title: string;
  body: string;
  data: {
    id: string;
  };
  created_at: string;
  updated_at: string;
};

export type PaginationLink = {
  url: string | null;
  label: string;
  active: boolean;
};

export type NotificationsResponse = ApiResponse<{
  inbox_paginated: NotificationsPaginated;
}>;

export type UpdateStatusReadAllResponse = ApiResponse<{}>;

export type UpdateStatusReadResponse = ApiResponse<{}>;

export type NotificationCount = {
  inbox_unread: number;
  inbox_read: number;
};

export type NotificationCountResponse = ApiResponse<NotificationCount>;
