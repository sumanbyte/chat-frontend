import { Avatar, Backdrop, Box, Button, CircularProgress, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { KeyboardBackspace as KBackIcon, Menu as MenuIcon, Edit as EditIcon, Done as DoneIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material'
import React, { lazy, memo, Suspense, useEffect, useState } from 'react'
import { bgGradient, matBlack } from '../constants/color'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Link } from "../components/styles/StyledComponent"
import AvatarCard from "../components/shared/AvatarCard";
import UserItem from '../components/shared/UserItem'
import { useAddGroupMembersMutation, useChatDetailsQuery, useDeleteChatMutation, useMyGroupsQuery, useRemoveGroupMembersMutation, useRenameGroupMutation } from '../redux/api/api'
import { useAsyncMutation, useErrors } from '../hooks/hook'
import { LayoutLoader } from '../components/layout/Loaders'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAddMember } from '../redux/reducers/misc'
const ConfirmDeleteDialog = lazy(() => import("../components/dialogs/ConfirmDeleteDialog"))
const AddMemberDialog = lazy(() => import("../components/dialogs/AddMemberDialog"))


function Groups() {
    const chatId = useSearchParams()[0].get("group");
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isAddMember } = useSelector(state => state.misc)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

    const [groupName, setGroupName] = useState("")
    const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");

    const [members, setMembers] = useState([]);
    const myGroups = useMyGroupsQuery("");
    const groupDetails = useChatDetailsQuery({ chatId, populate: true }, { skip: !chatId });

    const [renameGroup, isLoadingRenameGroup] = useAsyncMutation(useRenameGroupMutation);
    const [removeMember, isLoadingRemoveMember] = useAsyncMutation(useRemoveGroupMembersMutation);
    const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(useDeleteChatMutation);



    useErrors([{ isError: myGroups.isError, error: myGroups.error }, { isError: groupDetails.isError, error: groupDetails.error }]);

    useEffect(() => {
        const groupData = groupDetails.data;
        if (groupData) {
            setGroupName(groupData?.chat?.name)
            setGroupNameUpdatedValue(groupData?.chat.name)
            setMembers(groupData.chat.members)
        }

        return () => {
            setGroupName("");
            setGroupNameUpdatedValue("");
            setMembers([]);
            setIsEdit(false);
        }

    }, [groupDetails.data])


    const navigateBack = () => {
        navigate("/")
    }
    const handleMobile = () => {
        setIsMobileMenuOpen(prev => !prev);
    }

    const updateGroupNameHandler = () => {
        setIsEdit(false);
        renameGroup("Updated Group Name", { chatId, name: groupNameUpdatedValue })
    }
    const openConfirmDeleteHandler = () => {
        setConfirmDeleteDialog(true);
        console.log("delete")
    }
    const closeConfirmDeleteHandler = () => {
        setConfirmDeleteDialog(false);
    }

    const deleteHandler = () => {
        deleteGroup("Deleting Group...", { chatId })
        closeConfirmDeleteHandler();
        navigate("/groups");
    }


    const openAddMemberHandler = () => {
        dispatch(setIsAddMember(true))
    }

    const removeMemberHandler = (userId) => {
        removeMember("Removed Member", { chatId, members: [userId] })
    }

    useEffect(() => {
        if (chatId) {
            setGroupName("Group Name " + chatId);
            setGroupNameUpdatedValue("Group Name " + chatId);

        }

        return () => {
            setIsEdit(false);
        }
    }, [chatId]);

    const IconBtns = () => (
        <>
            <Box sx={{
                display: {
                    xs: "block",
                    sm: "none",
                    position: "fixed",
                    right: "1rem",
                    top: "1rem"
                }
            }}>
                <Tooltip title="menu" >
                    <IconButton onClick={handleMobile}>
                        <MenuIcon />
                    </IconButton>

                </Tooltip>
            </Box>
            <Tooltip title="Back">
                <IconButton
                    sx={{
                        position: "absolute",
                        left: "2rem",
                        top: "2rem",
                        bgcolor: matBlack,
                        color: "white",
                        ":hover": {
                            bgcolor: "rgba(0,0,0,0.7)",
                        },
                    }}
                    onClick={navigateBack}
                >
                    <KBackIcon />
                </IconButton>
            </Tooltip>
        </>
    )

    const GroupName = () => <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} padding={"3rem"}>
        {
            isEdit ? <>
                <TextField value={groupNameUpdatedValue} onChange={e => setGroupNameUpdatedValue(e.target.value)} />
                <IconButton onClick={updateGroupNameHandler} disabled={isLoadingRenameGroup}><DoneIcon /></IconButton>
            </> : <>
                <Typography variant='h4'>{groupName}</Typography>
                <IconButton onClick={() => setIsEdit(true)}
                    disabled={isLoadingRenameGroup}
                ><EditIcon /> </IconButton>
            </>
        }
    </Stack>
    const ButtonGroup = () => <Stack
        direction={{
            sm: "row",
            xs: "column-reverse"
        }}
        spacing={"1rem"}
        p={{
            sm: "1rem",
            xs: "0",
            md: "1rem 4rem"
        }}
    >
        <Button size={"large"} color={"error"} startIcon={<DeleteIcon />}
            onClick={openConfirmDeleteHandler}>Delete Group </Button>
        <Button size={"large"} variant={"contained"} startIcon={<AddIcon />}
            onClick={openAddMemberHandler}>Add Member </Button>
    </Stack>



    return myGroups.isLoading ? (<LayoutLoader />) : (
        <Grid
            container
            sx={{
                height: "100vh"
            }}
        >
            <Grid
                size={{ sm: 4 }}
                sx={{
                    display: {
                        xs: "none",
                        sm: "block",

                    },
                    overflowY: "auto",
                    height: "100%"

                }}
                bgcolor={bgGradient}
            >
                <GroupsList myGroups={myGroups?.data?.groups} chatId={chatId} />
            </Grid>
            <Grid
                size={{ xs: 12, sm: 8 }}
                sx={{
                    display: "flex",
                    flexDirection: 'column',
                    position: "relative",
                    padding: "1rem 3rem",
                }}
            >

                <IconBtns />
                <GroupName />

                <Typography
                    margin={"2rem"}
                    alignSelf={"flex-start"}
                    variant='body1'
                >Members</Typography>

                <Stack
                    maxWidth={"45rem"}
                    width={"100%"}
                    boxSizing={"border-box"}
                    padding={{
                        sm: "1rem",
                        xs: "0",
                        md: "1rem 4rem"
                    }}
                    spacing={"2rem"}
                    height={"50vh"}
                    overflow={"auto"}
                    display={"flex"}
                    alignItems={"center"}
                >
                    {/* member  */}
                    {
                        isLoadingDeleteGroup ? (<CircularProgress />) : members.map((user) => (
                            <UserItem key={user._id} styling={{
                                boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                                padding: "1rem 2rem",
                                borderRadius: "1rem",

                            }}
                                handlerIsloading={isLoadingRemoveMember}
                                handler={removeMemberHandler}
                                user={user} isAdded />
                        ))
                    }
                </Stack>

                <ButtonGroup />

            </Grid>

            {
                isAddMember && <Suspense fallback={<Backdrop open />}><AddMemberDialog chatId={chatId} /></Suspense>
            }

            {
                confirmDeleteDialog && <Suspense fallback={<Backdrop open />}><ConfirmDeleteDialog open={confirmDeleteDialog} handleClose={closeConfirmDeleteHandler} deleteHandler={deleteHandler} /></Suspense>
            }

            <Drawer sx={{
                display: {
                    xs: "block",
                    sm: "none",
                }
            }} open={isMobileMenuOpen} onClose={handleMobile}>
                <GroupsList w='50vw' myGroups={myGroups?.data?.groups} chatId={chatId} />
            </Drawer>
        </Grid>
    )
}

const GroupsList = ({ w = "100%", myGroups = [], chatId, }) => {
    return <Stack width={w}>
        {
            myGroups.length > 0 ? (
                myGroups.map((group, index) => <GroupListItem group={group} chatId={chatId} key={index} />)
            ) : (
                <Typography textAlign={"center"} padding={"1rem"}>No groups</Typography>
            )
        }
    </Stack>
}

const GroupListItem = memo(({ group, chatId }) => {
    const { name, avatar, _id } = group
    return (
        <Link to={`?group=${_id}`}>
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} onClick={e => {
                if (chatId === _id) {
                    e.preventDefault()
                }
            }}>
                <AvatarCard avatar={avatar} />
                <Typography>{name}</Typography>
            </Stack>
        </Link>
    )
})

export default Groups