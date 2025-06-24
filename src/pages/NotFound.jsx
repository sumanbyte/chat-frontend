import { Error } from '@mui/icons-material'
import { Container, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <Container maxWidth="lg" sx={{
            height: "100vh"
        }}>
            <Stack alignItems={"center"} spacing={"2rem"} justifyContent={"center"} height={"100%"}>
                <Error sx={{ fontSize: "10rem" }} />
                <Typography variant="h4">404</Typography>
                <Typography variant="h4">Not Found</Typography>
                <Link to={"/"} >Go back to home</Link>
            </Stack>
        </Container>
    )
}

export default NotFound