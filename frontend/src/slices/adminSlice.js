import { ADMIN_URL, EXTERNAL_USER } from "../Constant";
import { apiSlice } from "./apiSlice";

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: ({ keyword, pageNumber }) => ({
                url: `${ADMIN_URL}/users`,
                params: {
                    keyword,
                    pageNumber
                }

            }),
            providesTags: ['Users'],
            keepUnusedDataFor: 5
        }),
        getEnquiries: builder.query({
            query: ({ keyword, pageNumber }) => ({
                url: `${ADMIN_URL}/enquiry`,
                params: {
                    keyword,
                    pageNumber
                }
            }),
            providesTags: ['Enquiry'],
            keepUnusedDataFor: 5
        }),

        getEnquiryById: builder.query({
            query: (eqId) => ({
                url: `${ADMIN_URL}/enquiry/${eqId}`
            }),
            keepUnusedDataFor: 5
        }),



        updateEnquiry: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/enquiry/${data.enqId}`,
                method: 'PUT',
                body: data

            })
        }),

        getUserById: builder.query({
            query: (userId) => ({
                url: `${ADMIN_URL}/users/${userId}`
            })
        }),
        updateUserDetails: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/users/${data.userId}`,
                method: 'PUT',
                body: data

            })
        }),
        uploadRoomImage: builder.mutation({
            query: (data) => ({
                url: `/api/frontend-upload/rooms`,
                method: 'POST',
                body: data
            })
        }),
        uploadServiceImage: builder.mutation({
            query: (data) => ({
                url: `/api/frontend-upload/services`,
                method: 'POST',
                body: data
            })
        }),
        uploadGalleryImage: builder.mutation({
            query: (data) => ({
                url: `/api/frontend-upload/gallery`,
                method: 'POST',
                body: data
            })
        }),
        addRoomType: builder.mutation({
            query: (data) => ({
                url: '/api/frontend/room-type',
                method: 'POST',
                body: data
            })
        }),
        addServiceType: builder.mutation({
            query: (data) => ({
                url: '/api/frontend/service-type',
                method: 'POST',
                body: data
            })
        }),
        deleteServiceType: builder.mutation({
            query: (data) => ({
                url: `${EXTERNAL_USER}/service-type/${data}`,
                method: 'Delete'
            })
        }),
        addNewImage: builder.mutation({
            query: (data) => ({
                url: `${EXTERNAL_USER}/images`,
                method: 'POST',
                body: data
            })
        }),
        deleteImage: builder.mutation({
            query: (data) => ({
                url: `${EXTERNAL_USER}/images/${data}`,
                method: "DELETE"
            })
        }),
        getAllRentDetails: builder.query({
            query: (pageNumber) => ({
                url: `${ADMIN_URL}/rent-details`,
                params: {
                    pageNumber
                }
            })

        }),
        getRentDetailsById: builder.query({
            query: (id) => ({
                url: `${ADMIN_URL}/rent-details/${id}`
            })
        }),
        updateRentDetails: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/rent-details/${data.rentId}`,
                method: 'PUT',
                body: data
            })
        }),

        createRentDetailForUser: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/rent-details/${data.userId}`,
                method: 'POST',
                body: data
            })
        }),
        getRentPaidDetails: builder.query({
            query: (id) => ({
                url: `${ADMIN_URL}/rent-paid/${id}`
            })
        }),
        getAllTestimonials: builder.query({
            query: () => ({
                url: `${ADMIN_URL}/testimony`
            })
        })


    })
})

export const { useGetAllUsersQuery, useGetEnquiriesQuery, useUpdateEnquiryMutation, useGetEnquiryByIdQuery, useGetUserByIdQuery, useUpdateUserDetailsMutation, useUploadRoomImageMutation, useAddRoomTypeMutation, useUploadServiceImageMutation, useAddServiceTypeMutation, useDeleteServiceTypeMutation, useAddNewImageMutation, useDeleteImageMutation, useUploadGalleryImageMutation, useGetAllRentDetailsQuery, useGetRentDetailsByIdQuery, useUpdateRentDetailsMutation, useCreateRentDetailForUserMutation, useGetRentPaidDetailsQuery, useGetAllTestimonialsQuery } = adminApiSlice;
