import { EXTERNAL_USER } from "../Constant";
import { apiSlice } from "./apiSlice";

export const externalUserApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getRooms: builder.query({
            query: () => ({
                url: `${EXTERNAL_USER}/room-type`,
            })
        }),
        deleteRoom: builder.mutation({
            query: (id) => ({
                url: `${EXTERNAL_USER}/room-type/${id}`,
                method: 'Delete'
            })
        }),

        getServicesType: builder.query({
            query: () => ({
                url: `${EXTERNAL_USER}/service-type`
            })
        }),
        getAllImages: builder.query({
            query: () => ({
                url: `${EXTERNAL_USER}/images`
            })
        })
    })
})

export const { useGetRoomsQuery, useDeleteRoomMutation, useGetServicesTypeQuery, useGetAllImagesQuery } = externalUserApiSlice;
