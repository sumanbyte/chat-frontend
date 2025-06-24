import { Avatar, IconButton, List, ListItem, Stack, Typography } from '@mui/material';
import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import React, { memo } from 'react'
import { transformImage } from '../../lib/features';

function UserItem({ user, handler, styling = {}, handlerIsloading, isAdded = false }) {
    const { name, _id, avatar } = user;

    return (

        <ListItem sx={{ width: "100%", justifyContent: "space-between" }}>
            <Stack {...styling} sx={{ width: "100%" }} display={"flex"} direction={"row"} spacing={"1rem"} justifyContent={"space-between"} alignItems={"center"} width={"100%"}  >
                <Avatar src={transformImage(avatar)} />
                <Typography
                    variant='body1'
                    sx={{
                        flexGrow: 1,
                        display: "flex",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >{name}</Typography>
                <IconButton
                    size='small'
                    sx={{
                        bgcolor: isAdded ? "error.main" : "primary.main",
                        color: "white",
                        "&:hover": {
                            bgcolor: isAdded ? "error.dark" : "primary.dark"
                        }
                    }}
                    onClick={() => handler(_id)} disabled={handlerIsloading}>
                    {
                        isAdded ? <RemoveIcon /> : <AddIcon />
                    }
                </IconButton>
            </Stack>
        </ListItem>

    )
}

export default memo(UserItem)