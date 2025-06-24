import React, { memo } from 'react'
import { Link } from '../styles/StyledComponent'
import { Stack, Typography, Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import AvatarCard from './AvatarCard';
import { motion } from "motion/react"

function ChatItem({
    avatar = [],
    name,
    _id,
    lastMessage,
    groupChat = false,
    sameSender = false,
    isOnline = false,
    newMessageAlert,
    index = 0,
    handleDeleteChat
}) {

    return (
        <Link sx={{ padding: 0 }} to={`/chat/${_id}/`} onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}>
            <motion.div
                initial={{ opacity: 0, y: "-100%" }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1rem",
                    backgroundColor: sameSender ? "black" : "unset",
                    color: sameSender ? "white" : "black",
                    borderBottom: "1px solid #f0f0f0",
                    gap: "1rem",
                    position: "relative",
                }}>
                {/* avatarcard  */}
                <AvatarCard avatar={avatar} />
                <Stack sx={{ flexGrow: 1 }}>
                    <Typography >{name}</Typography>
                    {
                        newMessageAlert && (
                            <Typography>{newMessageAlert.count} New Messages</Typography>
                        )
                    }
                </Stack>

                {
                    isOnline && (
                        <Box
                            sx={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                backgroundColor: "green",
                                position: "relative",
                                top: "50%",
                                right: "1rem",
                                transform: "translateY(-50%)",
                            }}
                        >

                        </Box>
                    )
                }

            </motion.div>
        </Link>
    )
}

export default memo(ChatItem);