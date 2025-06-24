import { createSlice } from "@reduxjs/toolkit";
import { getAllSavedStorage } from "../../lib/features";
import { NEW_MESSAGE_ALERT } from "../../shared/events";

const initialState = {
  notificationCount: 0,
  newMessagesAlert: getAllSavedStorage({
    key: NEW_MESSAGE_ALERT,
    get: true,
  }) || [
    {
      chatId: "",
      count: 0,
    },
  ],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    incrementNotificationCount: (state) => {
      state.notificationCount = state.notificationCount + 1;
    },
    resetNotificationCount: (state) => {
      state.notificationCount = 0;
    },
    setNewMessagesAlert: (state, action) => {
      //finding index of chatId in newMessagesAlert
      const index = state.newMessagesAlert.findIndex(
        (item) => item.chatId === action.payload.chatId
      );

      console.log(index);
      //if chatid found
      if (index !== -1) {
        state.newMessagesAlert[index].count += 1;
      } else {
        state.newMessagesAlert.push({
          chatId: action.payload.chatId,
          count: 1,
        });
      }
    },

    removeNewMessagesAlert: (state, action) => {
      state.newMessagesAlert = state.newMessagesAlert.filter(
        (item) => item.chatId !== action.payload
      );
    },
  },
});

export default chatSlice;
export const {
  setNewMessagesAlert,
  incrementNotificationCount,
  resetNotificationCount,
  removeNewMessagesAlert,
} = chatSlice.actions;
