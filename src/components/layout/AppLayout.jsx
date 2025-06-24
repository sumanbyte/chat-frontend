/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef } from 'react'
import Header from './Header'
import Title from "../shared/Title";
import { Drawer, Grid, Skeleton } from '@mui/material';
import ChatList from '../specific/ChatList';
import { useNavigate, useParams } from 'react-router-dom';
import Profile from '../specific/Profile';
import { useMyChatsQuery } from '../../redux/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { setIsDeleteMenu, setIsMobile, setSelectedDeleteChat } from '../../redux/reducers/misc';
import { useErrors, useSocketEvents } from '../../hooks/hook';
import { useSocket } from '../../socket';
import { NEW_MESSAGE_ALERT, NEW_REQUEST, ONLINE_USERS, REFETCH_CHATS } from "../../shared/events";
import { useCallback } from 'react';
import { incrementNotificationCount, setNewMessagesAlert } from "../../redux/reducers/chat"
import { getAllSavedStorage } from '../../lib/features';
import DeleteChatMenu from '../dialogs/DeleteChatMenu';

const AppLayout = () => (WrappedComponent) => {
    return props => {
        const params = useParams();
        const deleteMenuAnchor = useRef(null);
        const dispatch = useDispatch();
        const navigate = useNavigate()
        const { chatId } = params;

        const [onlineUsers, setOnlineUsers] = React.useState([]);


        const socket = useSocket();

        const { isMobile } = useSelector(state => state.misc)
        const { user } = useSelector(state => state.auth)
        const { newMessagesAlert } = useSelector(state => state.chat)


        const { isLoading, data, isError, error, refetch } = useMyChatsQuery();

        const newMessageAlertListener = useCallback((data) => {
            if (data.chatId === chatId) return;
            dispatch(setNewMessagesAlert(data));
        }, [dispatch, chatId]);


        const newRequestListener = useCallback(() => {
            dispatch(incrementNotificationCount())
        }, [dispatch])

        const refetchListener = useCallback(() => {
            refetch();
            navigate("/")
        }, [refetch, navigate])
        const onlineUsersListener = useCallback((data) => {
            console.log("invoked");
            setOnlineUsers(data);
        }, [])

        const eventHandlers = {
            [NEW_MESSAGE_ALERT]: newMessageAlertListener,
            [NEW_REQUEST]: newRequestListener,
            [REFETCH_CHATS]: refetchListener,
            [ONLINE_USERS]: onlineUsersListener,

        }

        useSocketEvents(socket, eventHandlers);
        useErrors([{ isError, error }]);


        const handleDeleteChat = (e, chatId, groupChat) => {
            e.preventDefault();
            dispatch(setIsDeleteMenu(true));
            dispatch(setSelectedDeleteChat({ chatId, groupChat }))
            deleteMenuAnchor.current = e.currentTarget;
        }
        const handleMobileClose = () => {
            dispatch(setIsMobile(false))
        }

        useEffect(() => {
            getAllSavedStorage({ key: NEW_MESSAGE_ALERT, value: newMessagesAlert })
        }, [newMessagesAlert]);
        return (<>
            <Title title={props.title} description={props.description} />
            <Header />
            <DeleteChatMenu dispatch={dispatch} deleteOptionAnchor={deleteMenuAnchor.current} />

            {
                isLoading ? (<Skeleton />) : (
                    <Drawer open={isMobile} onClose={handleMobileClose}>
                        <ChatList
                            w='70vw'
                            chats={data?.chats}
                            chatId={chatId}
                            handleDeleteChat={handleDeleteChat}
                            newMessagesAlert={newMessagesAlert}
                            onlineUsers={onlineUsers}

                        />

                    </Drawer>
                )
            }

            <Grid container height={"calc(100vh - 4rem)"} width={"100%"}>
                <Grid size={{ sm: 4, md: 3 }} sx={{
                    display: { xs: "none", sm: "block" },
                }} >
                    {
                        isLoading ? (<Skeleton />) : (
                            <ChatList
                                handleDeleteChat={handleDeleteChat}
                                onlineUsers={onlineUsers}
                                chats={data?.chats}
                                chatId={chatId} newMessagesAlert={newMessagesAlert}
                            />
                        )
                    }
                </Grid>
                <Grid size={{ xs: 12, sm: 8, md: 5, lg: 6 }} bgcolor={"ButtonFace"} height={"100%"}>
                    <WrappedComponent {...props} chatId={chatId} user={user} />
                </Grid>
                <Grid size={{ md: 4, lg: 3 }} sx={{
                    display: { xs: "none", md: "block" },
                    padding: "2rem",
                    bgcolor: "rgba(0,0,0,0.85)"
                }}>
                    <Profile user={user} />
                </Grid>
            </Grid>
        </>)
    }
}

export default AppLayout