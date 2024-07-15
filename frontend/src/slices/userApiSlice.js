import { UPLOAD_URL, USERS_URL } from "../Constant";
import { apiSlice } from "./apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data
            })
        }),
        createEnquiry: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/enquiry`,
                method: 'POST',
                body: data
            })
        }),
        getUserProfile: builder.query({
            query: () => ({
                url: `${USERS_URL}/profile`
            })
        }),
        uploadUserProfile: builder.mutation({
            query: (data) => ({
                url: `${UPLOAD_URL}/`,
                method: 'POST',
                body: data
            })
        }),
        updateUserProfile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data
            })
        }),
        getUserEnquiries: builder.query({
            query: () => ({
                url: `${USERS_URL}/user-enquiry`,
            })
        }),
        createEnquiryLoggedInUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/user-enquiry`,
                method: 'POST',
                body: data
            })
        }),

        getUserRentDetails: builder.query({
            query: (userId) => ({
                url: `${USERS_URL}/rent-details/${userId}`
            })
        }),

        getPdfPaths: builder.query({
            query: (data) => ({
                url: `${USERS_URL}/show-pdf/${data}`
            })
        }),
        downloadPdf: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/download-pdf/${data.userId}`,
                method: 'POST',
                body: data
            })
        }),
        paidRentDetails: builder.query({
            query: () => ({
                url: `${USERS_URL}/paid-rent-details`
            })
        }),
        updateUserPassword: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/update-password`,
                method: 'PUT',
                body: data
            })
        }),

        forgotPassword: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/forgot-password`,
                method: 'POST',
                body: data
            })
        }),
        resetPassword: builder.mutation({
            query: ({ data }) => ({
                url: `${USERS_URL}/reset-password`,
                method: 'POST',
                body: data

            })
        }),

        postTestimony: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/testimony`,
                method: 'POST',
                body: data
            })
        }),
        getTestimony: builder.query({
            query: () => ({
                url: `${USERS_URL}/testimony`,
            }),
            keepUnusedDataFor: 5
        })


    })
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useCreateEnquiryMutation, useGetUserProfileQuery, useUploadUserProfileMutation, useUpdateUserProfileMutation, useGetUserEnquiriesQuery, useCreateEnquiryLoggedInUserMutation, useGetUserRentDetailsQuery, useGetPdfPathsQuery, useDownloadPdfMutation, usePaidRentDetailsQuery, useUpdateUserPasswordMutation, useForgotPasswordMutation, useResetPasswordMutation, usePostTestimonyMutation, useGetTestimonyQuery } = userApiSlice;