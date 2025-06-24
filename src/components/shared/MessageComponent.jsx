import { Box, Typography } from '@mui/material';
import { lightBlue } from '../../constants/color';
import React, { memo } from 'react'
import moment from 'moment';
import { fileFormat } from '../../lib/features';
import RenderAttachment from './RenderAttachment';
import { motion } from "motion/react"

const MessageComponent = ({ message, user }) => {
    const { sender, content, attachments = [], createdAt } = message;
    const sameSender = sender?._id === user?._id;


    const timeAgo = moment(createdAt).fromNow();
    return (
        <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            style={{
                alignSelf: sameSender ? "flex-end" : "flex-start",
                backgroundColor: "white",
                color: "black",
                borderRadius: "5px",
                padding: "0.5rem",
                width: "fit-content",
            }}
        >
            {
                !sameSender && <Typography fontWeight={"600"} color={lightBlue} variant={"caption"}>{sender.name}</Typography>
            }
            {
                content && <Typography variant={"body2"}>{JSON.stringify(content)}</Typography>
            }
            {
                attachments.length > 0 && (
                    attachments.map((attachment, index) => {
                        const url = attachment.url;
                        const file = fileFormat(url);

                        return (
                            <Box key={index}>
                                <a href={url} target='_blank' download style={{
                                    color: "black",
                                }}>
                                    <RenderAttachment file={file} url={url} />
                                </a>
                            </Box>
                        )
                    })
                )
            }
            <Typography variant='caption' color={"text.secondary"}>{timeAgo}</Typography>
        </motion.div>
    )
}

export default memo(MessageComponent);