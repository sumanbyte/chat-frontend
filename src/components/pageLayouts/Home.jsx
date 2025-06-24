import { Box, Typography } from "@mui/material";
import React from "react";
import { grayColor } from "../../constants/color";

function Home() {
    return <Box bgcolor={grayColor} height={"100%"}>
        <Typography p={"2rem"} variant="h5" textAlign={"center"}>
            Select a Friend to chat
        </Typography>
    </Box>
}

export default Home;
