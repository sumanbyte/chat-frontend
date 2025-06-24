import { Stack } from '@mui/material'
import React from 'react'
import ChatItem from '../shared/ChatItem'
import { bgGradient } from '../../constants/color';

function ChatList({
    w = "100%",
    chats = [],
    chatId,
    onlineUsers = [],
    newMessagesAlert = [
        {
            chatId: "",
            count: 0
        }
    ],
    handleDeleteChat
}) {
    return (
        <Stack sx={{
            height: "100vh",
            overflowY: "auto",
            bgcolor: bgGradient
        }} width={w} direction={"column"}
        >
            {
                chats?.map((chat, index) => {
                    const { _id, name, lastMessage, groupChat, sameSender, members, avatar } = chat;
                    const newMessageAlert = newMessagesAlert.find((alert) => alert.chatId === _id);

                    const isOnline = members?.some(member => onlineUsers.includes(member));

                    return (
                        <ChatItem key={index} name={name} newMessageAlert={newMessageAlert} isOnline={isOnline} avatar={avatar} _id={_id} groupChat={groupChat} sameSender={chatId === _id} handleDeleteChat={handleDeleteChat} index={index} />
                    )
                })
            }
        </Stack>
    )
}

export default ChatList