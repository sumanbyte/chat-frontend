import React, { Fragment, useCallback, useEffect, useRef } from 'react'
import AppLayout from '../components/layout/AppLayout';
import { IconButton, Skeleton, Stack } from '@mui/material';
import { grayColor } from '../constants/color';
import { AttachFile as AttachFileIcon, Send as SendIcon } from '@mui/icons-material';
import { InputBox } from '../components/styles/StyledComponent';
import { orange } from '../constants/color';
import FileMenu from '../components/dialogs/FileMenu';
import MessageComponent from '../components/shared/MessageComponent';
import { useSocket } from '../socket';
import { ALERT, CHAT_JOINED, CHAT_LEFT, NEW_MESSAGE, START_TYPING, STOP_TYPING } from '../shared/events';
import { useChatDetailsQuery, useGetMessagesQuery } from '../redux/api/api';
import { useErrors, useSocketEvents } from '../hooks/hook';
import { useInfiniteScrollTop } from "6pp"
import { useDispatch } from 'react-redux';
import { setIsFileMenu } from '../redux/reducers/misc';
import { removeNewMessagesAlert } from '../redux/reducers/chat';
import { TypingLoader } from '../components/layout/Loaders';
import { useNavigate } from 'react-router-dom';



function Chat({ chatId, user }) {
    const containerRef = useRef(null);
    const fileMenuRef = useRef(null);
    const bottomRef = useRef(null);
    const dispatch = useDispatch();

    const socket = useSocket();
    const [message, setMessage] = React.useState("");

    const [messages, setMessages] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [fileMenuAnchor, setIsFileMenuAnchor] = React.useState(null);

    const oldMessagesChunk = useGetMessagesQuery({ chatId, page });
    const [iamTyping, setIamTyping] = React.useState(false);
    const [userTyping, setUserTyping] = React.useState(false);
    const typingTimeout = useRef(null);


    const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(containerRef, oldMessagesChunk?.data?.totalPages, page, setPage, oldMessagesChunk.data?.messages)

    // console.log(oldMessages)


    const chatDetails = useChatDetailsQuery({ chatId }, { skip: !chatId });

    const errors = [
        { isError: chatDetails.isError, error: chatDetails.error },
        { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error }
    ];


    const members = chatDetails?.data?.chat?.members;

    const handleFileOpen = (e) => {
        dispatch(setIsFileMenu(true))
        setIsFileMenuAnchor(e.currentTarget)
    }

    const messageChangeHandler = (e) => {
        setMessage(e.target.value);
        if (!iamTyping) {
            socket.emit(START_TYPING, { members, chatId });
            setIamTyping(true);
        }

        if (typingTimeout.current) clearTimeout(typingTimeout.current);

        typingTimeout.current = setTimeout(() => {
            socket.emit(STOP_TYPING, { members, chatId })
            setIamTyping(false);
        }, 2000);
    }

    const sendMessageHandler = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        socket.emit(NEW_MESSAGE, { chatId, members, message: message.trim() })
        setMessage("");
    }

    useEffect(() => {

        if (members) {

            socket.emit(CHAT_JOINED, { userId: user._id, members });
        }
        dispatch(removeNewMessagesAlert(chatId));
        return () => {
            setMessages([]);
            setMessage("");
            setOldMessages([]);
            setPage(1);
            if (members) {

                socket.emit(CHAT_LEFT, { userId: user._id, members });
            }
        }
    }, [chatId, dispatch]);

    const newMessagesListener = useCallback((data) => {
        if (data.chatId !== chatId) return;

        setMessages(prev => [...prev, data.message]);
    }, [chatId]);

    const alertListener = useCallback((data) => {
        if (data.chatId !== chatId) return;
        const messageForAlert = {
            content: data.message,
            sender: {
                _id: "djasdklfsdlfsldfk",
                name: "Admin",
            },
            chat: data.chatId,
            createdAt: new Date().toISOString(),
        };
        setMessages(prev => [...prev, messageForAlert]);
    }, [chatId])


    const startTypingListener = useCallback((data) => {
        if (data.chatId !== chatId) return;

        setUserTyping(true);
    }, [chatId])

    const stopTypingListener = useCallback((data) => {
        if (data.chatId !== chatId) return;

        setUserTyping(false);
    }, [chatId]);

    const eventHandlers = {
        [ALERT]: alertListener,
        [NEW_MESSAGE]: newMessagesListener,
        [START_TYPING]: startTypingListener,
        [STOP_TYPING]: stopTypingListener
    }


    useSocketEvents(socket, eventHandlers);

    useErrors(errors)

    const allMessages = [...oldMessages, ...messages];

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages])



    return chatDetails.isLoading ? (<Skeleton />) : (
        <Fragment>

            <Stack ref={containerRef} boxSizing={"border-box"} padding={"1rem"} spacing={"5rem"} height={"90%"} sx={{
                overflowX: "hidden",
                overflowY: "auto",

            }}>
                {/* messages render  */}
                {
                    allMessages.map((message, index) => {
                        return (
                            <MessageComponent
                                key={index}
                                message={message}
                                user={user}
                            />
                        )
                    })
                }

                {
                    userTyping && <TypingLoader />
                }

                <div ref={bottomRef} />


            </Stack>



            <form style={{
                height: "10%"
            }} onSubmit={sendMessageHandler} >
                <Stack direction={"row"}
                    padding={"1rem"} alignItems={"center"} position={"relative"}>

                    <IconButton
                        sx={{
                            position: "absolute",
                            left: "1.5rem",
                            rotate: "30deg"
                        }}
                        onClick={handleFileOpen}
                        ref={fileMenuRef}
                    >
                        <AttachFileIcon />
                    </IconButton>
                    <InputBox sx={{
                        bgcolor: grayColor,
                        ":hover": {
                            bgcolor: "whitesmoke"
                        },
                        ":focus": {
                            bgcolor: "whitesmoke"
                        }
                    }} placeholder='Type a message' value={message} onChange={messageChangeHandler} />
                    <IconButton type='submit' sx={{
                        rotate: "-30deg",

                        bgcolor: orange,
                        color: "white",
                        marginLeft: "1rem",
                        ":hover": {
                            bgcolor: orange,
                            color: "white"
                        },

                    }}>

                        <SendIcon />
                    </IconButton>
                </Stack>

            </form>

            <FileMenu anchorE1={fileMenuAnchor} chatId={chatId} />

        </Fragment>
    )
}

const WrappedChat = AppLayout()(Chat);
export default WrappedChat