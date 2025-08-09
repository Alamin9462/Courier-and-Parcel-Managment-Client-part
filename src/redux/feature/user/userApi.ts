import { baseApi } from "../../api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (data) => ({
        url: "user/create-user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    getUsers: build.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    // Get Assigned Parcels for Delivery Agent

    getAssignedParcels: build.query({
      query: (agentId: string) => ({
       url: `/user/assigned-parcels/${agentId}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getUserById: build.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    updateUser: build.mutation({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    deactivateUser: build.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    assignParcelsToAgent: build.mutation({
      query: (data) => ({
        url: "/user/assign-parcels",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Parcel", "User"],
    }),

    updateAgentLocation: build.mutation({
      query: (data) => ({
        url: "/user/update-location",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeactivateUserMutation,
  useAssignParcelsToAgentMutation,
  useUpdateAgentLocationMutation,
  useGetAssignedParcelsQuery 
} = userApi;
