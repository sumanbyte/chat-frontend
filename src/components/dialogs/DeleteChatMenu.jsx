import { Menu, Stack, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { setIsDeleteMenu } from '../../redux/reducers/misc';
import { Delete, ExitToApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAsyncMutation } from '../../hooks/hook';
import { useDeleteChatMutation, useLeaveGroupMutation } from '../../redux/api/api';

const DeleteChatMenu = ({ dispatch, deleteOptionAnchor }) => {
    const navigate = useNavigate();
    const closeHandler = () => {
        dispatch(setIsDeleteMenu(false));
        deleteOptionAnchor.current = null;
    };
    const { isDeleteMenu, selectedDeleteChat } = useSelector(state => state.misc);

    const [deleteChatMutate, _, deleteChatData] = useAsyncMutation(useDeleteChatMutation);
    const [leaveGroupMutate, __, leaveGroupData] = useAsyncMutation(useLeaveGroupMutation);

    const leaveGroup = () => {
        closeHandler();
        leaveGroupMutate("Leaving Group...", { chatId: selectedDeleteChat.chatId })
    }

    const deleteChat = () => {
        closeHandler();
        deleteChatMutate("Deleting Chat...", { chatId: selectedDeleteChat.chatId })
    }

    useEffect(() => {
        if (deleteChatData) navigate("/");
    }, [deleteChatData, navigate]);

    useEffect(() => {
        if (leaveGroupData) navigate("/");
    }, [leaveGroupData, navigate])
    return (
        <Menu open={isDeleteMenu} onClose={closeHandler} anchorEl={deleteOptionAnchor}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
            }}
            transformOrigin={{
                vertical: "center",
                horizontal: "center"
            }}
        >
            <Stack sx={{
                width: "10rem",
                padding: "0.5rem",
                cursor: "pointer"
            }}
                direction={"row"}
                alignItems={"center"}
                spacing={"0.5rem"}
                onClick={selectedDeleteChat.groupChat ? leaveGroup : deleteChat}
            >
                {
                    selectedDeleteChat.groupChat ? (<>
                        <ExitToApp />
                        <Typography>
                            Leave Group
                        </Typography>
                    </>) : (<>
                        <Delete />
                        <Typography>
                            Delete Chat
                        </Typography>
                    </>)
                }
            </Stack>
        </Menu>
    )
}

export default DeleteChatMenu