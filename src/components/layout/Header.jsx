import {
    Add as AddIcon,
    Group as GroupIcon,
    Logout as LogoutIcon,
    Menu as MenuIcon,
    Notifications as NotificationsIcon,
    Search as SearchIcon
} from '@mui/icons-material';
import { AppBar, Backdrop, Badge, Box, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { orange } from '../../constants/color';
import axios from 'axios';
import { server } from '../../constants/config';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { userNotExists } from '../../redux/reducers/auth';
import { setIsMobile, setIsNewGroup, setIsNotification, setIsSearch } from '../../redux/reducers/misc';
import { resetNotificationCount } from '../../redux/reducers/chat';

const SearchDialog = React.lazy(() => import('../specific/Search'))
const NotificationsDialog = React.lazy(() => import('../specific/Notifications'))
const NewGroupDialog = React.lazy(() => import('../specific/NewGroup'))

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isNewGroup } = useSelector(state => state.misc);
    const { isSearch, isNotification } = useSelector(state => state.misc)
    const { notificationCount } = useSelector(state => state.chat);
    const handleMobile = () =>
        dispatch(setIsMobile(true))

    const openSearchDialog = () =>
        dispatch(setIsSearch(true))


    const openNewGroup = () => {
        dispatch(setIsNewGroup(true));
    }

    const navigateToGroup = () => {
        navigate("/groups")

    }
    const logoutHandler = async () => {
        try {
            const { data } = await axios.get(`${server}/api/v1/user/logout`, {
                withCredentials: true
            });
            dispatch(userNotExists());
            toast.success(data.message);
        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");
        }

    }
    const openNotification = () => {
        dispatch(setIsNotification(true))
        dispatch(resetNotificationCount())
    }

    return (
        <>
            <Box sx={{ flexGrow: 1 }} height={"4rem"}>
                <AppBar position="static" sx={{
                    bgcolor: orange
                }}>
                    <Toolbar>
                        <Typography variant='h6' sx={{ display: { xs: "none", sm: "block" } }}>
                            Chat app
                        </Typography>
                        <Box sx={{
                            display: { xs: "block", sm: "none" }
                        }}>
                            <IconButton color='inherit' onClick={handleMobile}>
                                <MenuIcon />
                            </IconButton>

                        </Box>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box>
                            <IconBtn icon={<SearchIcon />} title="Search" onClick={openSearchDialog} />
                            <IconBtn icon={<AddIcon />} title="New Group" onClick={openNewGroup} />
                            <IconBtn icon={<GroupIcon />} title="Groups" onClick={navigateToGroup} />

                            <IconBtn icon={<NotificationsIcon />} title="Notifications" onClick={openNotification} value={notificationCount} />

                            <IconBtn icon={<LogoutIcon />} title="Logout" onClick={logoutHandler} />
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
            {
                isSearch && (
                    <Suspense fallback={<Backdrop open={true} />}>
                        <SearchDialog />
                    </Suspense>
                )

            }
            {
                isNotification && (
                    <Suspense fallback={<Backdrop open={true} />}>
                        <NotificationsDialog />
                    </Suspense>
                )

            }
            {
                isNewGroup && (
                    <Suspense fallback={<Backdrop open={true} />}>
                        <NewGroupDialog />
                    </Suspense>
                )

            }
        </>
    )
}

export default Header

const IconBtn = ({ icon, title, onClick, value = "" }) => {
    return (
        <Tooltip title={title} arrow>
            <IconButton color='inherit' size='large' onClick={onClick}>
                {
                    value ? <Badge badgeContent={value} color='error' children={icon} /> : icon
                }
            </IconButton>
        </Tooltip>
    )
}