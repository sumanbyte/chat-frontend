import { useInputValidation } from "6pp";
import {
    Button,
    Container,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { bgGradient } from "../../constants/color";
import { useSelector, useDispatch } from "react-redux";
import { adminLogin, getAdmin } from "../../redux/thunks/admin";
import { useEffect } from "react";

const AdminLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAdmin } = useSelector(state => state.auth)
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(adminLogin(secretKey.value))
    }
    const secretKey = useInputValidation("");

    useEffect(() => {
        dispatch(getAdmin())
    }, [dispatch])

    if (isAdmin) navigate("/admin/dashboard")
    return <div
        style={{
            backgroundImage: bgGradient,
        }}
    >
        <Container
            component="main"
            maxWidth="xs"
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Paper
                elevation={6}
                square
                sx={{
                    padding: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <form action="#" onSubmit={submitHandler}>
                    <TextField
                        required
                        fullWidth
                        label="Secret Key"
                        margin="normal"
                        variant="outlined"
                        value={secretKey.value}
                        onChange={secretKey.changeHandler}
                    />

                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ marginTop: "1rem" }}
                        type="submit"
                    >
                        Login
                    </Button>

                </form>

            </Paper>
        </Container>
    </div>
}

export default AdminLogin;