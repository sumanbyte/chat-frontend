import React from 'react'
import { Avatar, Stack, AvatarGroup, Box } from '@mui/material'
import { transformImage } from '../../lib/features'

// todo transform 
function AvatarCard({ avatar = [], max = 4 }) {
    return (
        <Stack direction="row" spacing={0.5}>
            <AvatarGroup max={max} sx={{ position: "relative" }}>
                <Box width="5rem" height="3rem">
                    {avatar.map((av, index) => (
                        <Avatar key={Math.random()} src={transformImage(av)} alt={`Avatar ${index}`}
                            sx={{
                                width: "3rem",
                                height: "3rem",
                                border: "2px solid white",
                                position: "absolute",
                                left: {
                                    xs: `${0.5 + index}rem`,
                                    sm: `${index}rem`,

                                }
                            }} />
                    ))}
                </Box>
            </AvatarGroup>

        </Stack>
    )
}

export default AvatarCard