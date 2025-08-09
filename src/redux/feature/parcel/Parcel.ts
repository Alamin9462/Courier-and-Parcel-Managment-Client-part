import { baseApi } from "../../api/baseApi";

const parcelApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get all parcels (admin)
    getAllParcels: builder.query({
      query: () => ({
        url: '/parcel',
        method: 'GET',
      }),
      providesTags: ['Parcel'],
    }),

    //  Get current user's parcels (customer)
    getMyParcels: builder.query({
      query: () => ({
        url: '/parcel/my-parcels',
        method: 'GET',
      }),
      providesTags: ['Parcel'],
    }),

    //  Get parcel by ID (any authenticated user)
    getParcelById: builder.query({
      query: (id: string) => ({
        url: `/parcel/${id}`,
        method: 'GET',
      }),
      providesTags: ['Parcel'],
    }),

    // Create a parcel (customer only)
    createParcel: builder.mutation({
      query: (data) => ({
        url: '/parcel',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Parcel'],
    }),

    //  Update parcel info (admin only)
    updateParcel: builder.mutation({
      query: ({ id, data }) => ({
        url: `/parcel/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Parcel'],
    }),

    //  Update parcel status (delivery agent only)
    updateParcelStatus: builder.mutation({
      query: ({ id, data }) => ({
        url: `/parcel/${id}/status`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Parcel'],
    }),

    //  Update parcel location (delivery agent only)
    updateParcelLocation: builder.mutation({
      query: ({ id, data }) => ({
        url: `/parcel/${id}/location`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Parcel'],
    }),

    //  Get parcel location (customer)
    getParcelLocation: builder.query({
      query: (id: string) => ({
        url: `/parcel/${id}/location`,
        method: 'GET',
      }),
      providesTags: ['Parcel'],
    }),

    //  Delete parcel (admin only)
    deleteParcel: builder.mutation({
      query: (id: string) => ({
        url: `/parcel/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Parcel'],
    }),

    //  Get parcel dashboard metrics (admin)
    getParcelMetrics: builder.query({
      query: () => ({
        url: '/parcel/metrics/dashboard',
        method: 'GET',
      }),
    }),

    //  Export parcels as CSV (admin only)
    exportParcelsCSV: builder.query({
      query: () => ({
        url: '/parcel/export/csv',
        method: 'GET',
        responseHandler: (response) => response.blob(), 
      }),
    }),
  }),
});

export const {
  useGetAllParcelsQuery,
  useGetMyParcelsQuery,
  useGetParcelByIdQuery,
  useCreateParcelMutation,
  useUpdateParcelMutation,
  useUpdateParcelStatusMutation,
  useUpdateParcelLocationMutation,
  useGetParcelLocationQuery,
  useDeleteParcelMutation,
  useGetParcelMetricsQuery,
  useLazyExportParcelsCSVQuery 
} = parcelApi;
