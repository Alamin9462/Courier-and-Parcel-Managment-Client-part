/* eslint-disable @typescript-eslint/no-explicit-any */

import type {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  DefinitionType,
} from "@reduxjs/toolkit/query";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { toast } from "sonner";

import { logout, setUser } from "../feature/auth/authSlice";
import type { RootState } from "../feature/store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // Sending refresh token
    toast.error((result?.error?.data as { message?: string })?.message);

    //toast.error("user not found");
  }
  if (result?.error?.status === 401) {
    // console.log('Sending refresh token');

    const res = await fetch("http://localhost:5000/api/refresh-token", {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["Parcel", "User"],
  endpoints: () => ({}),
});
