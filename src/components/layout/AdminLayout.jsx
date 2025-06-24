import React, { useLayoutEffect } from 'react';
import { Grid, Box, IconButton, Drawer, Stack, Typography } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon, ManageAccounts as ManageAccountsIcon, Groups as GroupsIcon, Message as MessageIcon, Chat as ChatsIcon, ExitToApp as ExitToAppIcon } from "@mui/icons-material"
import { useLocation, Link as LinkComponent, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material';
import { matBlack } from "../../constants/color"
// import { adminTabs } from '../../constants/routes';

import { Dashboard as DashboardIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import { adminLogout, getAdmin } from '../../redux/thunks/admin';
const Link = styled(LinkComponent)`
text-decoration: none;
border-radius: 2rem;
padding: 1rem 2rem;
color: black;
&:hover {
color: rgba(0,0,0,0.54)
}
`;

const adminTabs = [
    {
        name: "Dashboard",
        path: "/admin/dashboard",
        Icon: <DashboardIcon />,
    },
    {
        name: "Users",
        path: "/admin/users",
        Icon: <ManageAccountsIcon />,
    },
    {
        name: "Groups",
        path: "/admin/groups",
        Icon: <GroupsIcon />,
    },
    {
        name: "Chats",
        path: "/admin/chats",
        Icon: <ChatsIcon />,
    },
    {
        name: "Messages ",
        path: "/admin/messages",
        Icon: <MessageIcon />,
    },
];



const Sidebar = ({ w = "100%" }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(adminLogout());
    }


    return (
        <Stack width={w} direction={"column"} px={"1rem"} spacing={"3rem"} sx={{ p: 2, bgcolor: 'grey.200', height: '100%' }}>
            <Typography variant="h4" textAlign={"center"}>Chat app</Typography>

            <Stack spacing={"1rem"}>
                {
                    adminTabs.map(i => (
                        <Link to={i.path} key={i.path} sx={
                            location.pathname === i.path && {
                                bgcolor: matBlack,
                                color: "white",
                                ":hover": {
                                    color: "white"
                                }
                            }
                        }>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", width: "100%", height: "100%" }}>
                                {i.Icon}
                                <Typography fontSize={"1.2rem"}>{i.name}</Typography>
                            </Box>
                        </Link>
                    ))
                }

                <Link onClick={logoutHandler}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", width: "100%", height: "100%" }}>
                        <ExitToAppIcon />
                        <Typography variant="body1">Logout</Typography>
                    </Box>
                </Link>
            </Stack>
        </Stack>
    )
};

const AdminLayout = ({ children }) => {
    const [isMobile, setIsMobile] = React.useState(false);
    const navigate = useNavigate();
    const { isAdmin } = useSelector(state => state.auth)


    useLayoutEffect(() => {
        if (!isAdmin) navigate("/admin")
    }, [isAdmin, navigate])

    const handleMobile = () => {
        setIsMobile(!isMobile)
    }
    const handleClose = () => {
        setIsMobile(false);
    }
    return (
        <Grid container sx={{ minHeight: '100vh' }}>
            <Box
                sx={{
                    display: { xs: "block", sm: "none" },
                    position: "fixed",
                    right: "1rem",
                    top: "1rem"
                }}
            >
                <IconButton onClick={handleMobile}>
                    {
                        isMobile ? <CloseIcon /> : <MenuIcon />
                    }
                </IconButton>
            </Box>
            {/* Sidebar: Hidden on xs screens, visible on sm and above */}
            <Grid
                item
                size={{ xs: 0, sm: 3, md: 2 }}
                sx={{ display: { xs: 'none', sm: 'block' } }}
            >
                <Sidebar />
            </Grid>

            {/* Main Content: Full width on xs screens, adjusted on sm and above */}
            <Grid
                item
                size={{ xs: 12, sm: 9, md: 10 }}
                sx={{ p: 2 }}
            >
                {children}
            </Grid>

            <Drawer open={isMobile} onClose={handleClose}>
                <Sidebar w={"50vw"} />
            </Drawer>
        </Grid>
    )
};

export default AdminLayout;
