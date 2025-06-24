import React from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/styles/StyledComponent";
import { useFileHandler, useInputValidation, useStrongPassword } from "6pp";
import { usernameValidator } from "../utils/validators";
import { bgGradient } from "../constants/color";
import { server } from "../constants/config";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userExists } from "../redux/reducers/auth";
import toast from "react-hot-toast";

function Login() {
  const [isLogin, setIsLogin] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const toggleLogin = () => setIsLogin(!isLogin);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");
  const avatar = useFileHandler("single");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    setIsLoading(true);
    const toastId = toast.loading("Logging in...");
    e.preventDefault();
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          username: username.value,
          password: password.value,
        },
        config
      );
      dispatch(userExists(true));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    setIsLoading(true);
    const toastId = toast.loading("Registering...");
    e.preventDefault();

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const formData = new FormData();
    if (avatar.file) {
      formData.append("avatar", avatar.file);
    }
    formData.append("name", name.value);
    formData.append("username", username.value);
    formData.append("password", password.value);
    formData.append("bio", bio.value);

    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/new`,
        formData,
        config
      );
      dispatch(userExists(true));
      toast.success(data.message, { id: toastId });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong", {
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
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
          {isLogin ? (
            <>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <form action="#" onSubmit={handleLogin}>
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  type="password"
                  label="Password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ marginTop: "1rem" }}
                  type="submit"
                  disabled={isLoading}
                >
                  Login
                </Button>
                <Typography
                  textAlign={"center"}
                  variant="body2"
                  sx={{ marginTop: "1rem" }}
                >
                  OR
                </Typography>
                <Box textAlign={"center"}>
                  Don't have an account?{" "}
                  <Button onClick={toggleLogin}>Register</Button>
                </Box>
              </form>
            </>
          ) : (
            <>
              <Typography component="h1" variant="h5">
                Register
              </Typography>
              <form action="#" onSubmit={handleSignup}>
                <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                  <Avatar
                    sx={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "contain",
                    }}
                    src={avatar.preview ?? ""}
                  />

                  <label
                    htmlFor="avatar-upload"
                    style={{ position: "absolute", bottom: 0, right: 0 }}
                  >
                    <IconButton
                      component="span"
                      sx={{
                        color: "white",
                        bgcolor: "rgba(0,0,0, 0.5)",
                        ":hover": {
                          bgcolor: "rgba(0,0,0, 0.7)",
                        },
                      }}
                    >
                      <CameraAltIcon />
                    </IconButton>
                  </label>
                  <VisuallyHiddenInput
                    type="file"
                    id="avatar-upload"
                    name="Upload Avatar"
                    accept="image/*"
                    onChange={avatar.changeHandler}
                  />
                  {avatar.error && (
                    <Typography
                      width={"fit-content"}
                      display={"block"}
                      color={"error"}
                      variant="body2"
                      marginTop={1}
                    >
                      {avatar.error}
                    </Typography>
                  )}
                </Stack>
                <TextField
                  required
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  value={name.value}
                  onChange={name.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Bio"
                  margin="normal"
                  variant="outlined"
                  value={bio.value}
                  onChange={bio.changeHandler}
                />
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />
                {username.error && (
                  <Typography color={"error"} variant="body2" marginTop={1}>
                    {username.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  type="password"
                  label="Password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                {password.error && (
                  <Typography color={"error"} variant="body2" marginTop={1}>
                    {password.error}
                  </Typography>
                )}
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ marginTop: "1rem" }}
                  type="submit"
                  disabled={isLoading}
                >
                  Register
                </Button>
                <Typography
                  textAlign={"center"}
                  variant="body2"
                  sx={{ marginTop: "1rem" }}
                >
                  OR
                </Typography>
                <Box textAlign={"center"}>
                  Already have an account?{" "}
                  <Button onClick={toggleLogin}>Login</Button>
                </Box>
              </form>
            </>
          )}
        </Paper>
      </Container>
    </div>
  );
}

export default Login;
