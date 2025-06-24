import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Skeleton, Stack, Typography } from '@mui/material'
import UserItem from "../shared/UserItem";
import React, { useState } from 'react'
import { useAddGroupMembersMutation, useAvailableFriendsQuery } from '../../redux/api/api';
import { useAsyncMutation, useErrors } from '../../hooks/hook';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAddMember } from '../../redux/reducers/misc';

const AddMemberDialog = ({ chatId }) => {
    const dispatch = useDispatch()
    const { isAddMember } = useSelector(state => state.misc);
    const { isLoading, data, error, isError } = useAvailableFriendsQuery(chatId);
    const [addMembers, isLoadingAddMembers] = useAsyncMutation(useAddGroupMembersMutation);
    const [selectedMembers, setSelectedMembers] = useState([]);


    const selectMemberHandler = (id) => {
        setSelectedMembers(prev => (prev.includes(id)) ? prev.filter(i => i !== id) : [...prev, id]);
    }
    const addFriendHandler = () => {
        console.log("add friend")
    }


    const addMemberSubmitHandler = () => {
        addMembers("Adding Members...", { chatId, members: selectedMembers })
        closeHandler();
    }

    const closeHandler = () => {
        dispatch(setIsAddMember(false));
        setSelectedMembers([]);
    }
    useErrors([{ isError, error }]);
    return (
        <Dialog open={isAddMember} onClose={closeHandler}>
            <Stack width={"25rem"} p={{ xs: "1rem", sm: "1rem" }}>
                <DialogTitle>Add Member</DialogTitle>
                <Stack>
                    {
                        isLoading ? <Skeleton /> : data?.friends?.length > 0 ? (
                            data?.friends?.map((user) => (
                                <UserItem key={user._id} user={user} handler={selectMemberHandler} isAdded={selectedMembers.includes(user._id)} />
                            ))
                        ) : (
                            <Typography textAlign={"center"} padding={"1rem"}>No Friends</Typography>
                        )
                    }

                </Stack>
            </Stack>
            <DialogContent>
                <DialogContentText>
                    Add members
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeHandler}>Cancel</Button>
                <Button color='error' disabled={isLoadingAddMembers} onClick={addMemberSubmitHandler}>Submit Changes</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddMemberDialog