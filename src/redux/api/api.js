import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1`,
  }),
  tagTypes: ["Chat", "User", "Message"],
  endpoints: (builder) => ({
    myChats: builder.query({
      query: () => ({
        url: "/chat/my",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    searchUser: builder.query({
      query: (name) => ({
        url: `/user/search?name=${name}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: "/user/sendrequest",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getNotifications: builder.query({
      query: () => ({
        url: `/user/notifications`,
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),
    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: "/user/acceptrequest",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),
    chatDetails: builder.query({
      query: ({ chatId, populate = false }) => {
        let url = `/chat/${chatId}`;
        if (populate) url = `${url}?populate=true`;
        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),
    getMessages: builder.query({
      query: ({ chatId, page }) => ({
        url: `/chat/message/${chatId}?page=${page}`,
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),
    sendAttachments: builder.mutation({
      query: (data) => ({
        url: "/chat/message",
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Message"],
    }),
    myGroups: builder.query({
      query: () => ({
        url: "/chat/my/groups",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    availableFriends: builder.query({
      query: (chatId) => {
        let url = `/user/friends`;
        if (chatId) url += `?chatId=${chatId}`;
        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),
    newGroup: builder.mutation({
      query: ({ name, members }) => ({
        url: "/chat/new",
        method: "POST",
        credentials: "include",
        body: { name, members },
      }),
      invalidatesTags: ["Chat"],
    }),
    renameGroup: builder.mutation({
      query: ({ chatId, name }) => ({
        url: `/chat/${chatId}`,
        method: "PUT",
        credentials: "include",
        body: { name },
      }),
      invalidatesTags: ["Chat"],
    }),
    removeGroupMembers: builder.mutation({
      query: ({ chatId, members }) => ({
        url: `/chat/removemembers`,
        method: "PUT",
        credentials: "include",
        body: { chatId, members },
      }),
      invalidatesTags: ["Chat"],
    }),
    addGroupMembers: builder.mutation({
      query: ({ members, chatId }) => ({
        url: `/chat/addmembers`,
        method: "PUT",
        credentials: "include",
        body: { chatId, members },
      }),
      invalidatesTags: ["Chat"],
    }),
    deleteChat: builder.mutation({
      query: ({ chatId }) => ({
        url: `/chat/${chatId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
    leaveGroup: builder.mutation({
      query: ({ chatId }) => ({
        url: `/chat/leave/${chatId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
    getDashboardStats: builder.query({
      query: () => ({
        url: `/admin/stats`,
        credentials: "include",
      }),
    }),
    getDashboardUsers: builder.query({
      query: () => ({
        url: `/admin/users`,
        credentials: "include",
      }),
    }),
    getDashboardChats: builder.query({
      query: () => ({
        url: `/admin/chats`,
        credentials: "include",
      }),
    }),
    getDashboardMessages: builder.query({
      query: () => ({
        url: `/admin/messages`,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useMyChatsQuery,
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
  useGetNotificationsQuery,
  useAcceptFriendRequestMutation,
  useChatDetailsQuery,
  useGetMessagesQuery,
  useSendAttachmentsMutation,
  useMyGroupsQuery,
  useAvailableFriendsQuery,
  useNewGroupMutation,
  useRenameGroupMutation,
  useRemoveGroupMembersMutation,
  useAddGroupMembersMutation,
  useDeleteChatMutation,
  useLeaveGroupMutation,
  useGetDashboardStatsQuery,
  useGetDashboardUsersQuery,
  useGetDashboardChatsQuery,
  useGetDashboardMessagesQuery,
} = api;
