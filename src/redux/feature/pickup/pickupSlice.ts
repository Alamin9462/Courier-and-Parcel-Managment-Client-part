import { baseApi } from "../../api/baseApi";

const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPickupsByAgent: builder.query<
      {
        parcelId: string;
        address: string;
        lat: number | null;
        lng: number | null;
      }[],
      string
    >({
      query: (agentId) => ({
        url: `/parcel/${agentId}/pickups`,
        method: "GET",
      }),
      providesTags: ["Parcel"],
    }),
  }),
});

export const { useGetPickupsByAgentQuery } = parcelApi;
