import {
    Avatar,
    Button,
    Dialog,
    DialogTitle,
    ListItem,
    Skeleton,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import React, { memo, useState } from "react";
import { sampleUsers } from "../../constants/sampleData.js";
import UserItem from "../shared/UserItem.jsx";
import { useInputValidation } from "6pp";
import { useDispatch, useSelector } from "react-redux";
import { useAvailableFriendsQuery, useNewGroupMutation } from "../../redux/api/api.js";
import { useAsyncMutation, useErrors } from "../../hooks/hook.jsx";
import { setIsNewGroup } from "../../redux/reducers/misc.js";
import toast from "react-hot-toast";
function NewGroup() {
    const dispatch = useDispatch();
    const { isNewGroup } = useSelector(state => state.misc)
    const { isError, isLoading, error, data } = useAvailableFriendsQuery();
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [newGroup, isLoadingNewGroup] = useAsyncMutation(useNewGroupMutation);

    useErrors([{ isError, error }]);

    console.log(data);

    const selectMemberHandler = (id) => {
        setSelectedMembers(prev => (prev.includes(id)) ? prev.filter(i => i !== id) : [...prev, id]);
    }
    console.log(selectedMembers);

    const groupName = useInputValidation()

    const submitHandler = () => {
        if (!groupName.value) return toast.error("Group name is required.");
        if (selectedMembers.length < 2) return toast.error("Please select atleast 2 members.");
        //creating group
        newGroup("New Group Created Successfully", { name: groupName.value, members: selectedMembers });
        closeHandler();
    }

    const closeHandler = () => {
        dispatch(setIsNewGroup(false))
    }

    return (
        <Dialog open={isNewGroup} onClose={closeHandler}>
            <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"2rem"}>
                <DialogTitle variant="h4">New Group</DialogTitle>

                <TextField label="Group Name" value={groupName.value} onChange={groupName.changeHandler} />
                <Typography variant={"body1"}>Members</Typography>
                <Stack direction={"column"} justifyContent={"space-between"} alignItems={"center"} width={"100%"}>
                    {
                        isLoading ? <Skeleton /> : data?.friends?.map((user, idx) => (
                            <UserItem user={user} handler={selectMemberHandler} key={idx} isAdded={selectedMembers.includes(user._id)} />
                        ))
                    }
                </Stack>

                <Stack direction={"row"} justifyContent={"flex-end"} gap={"1rem"} width={"100%"}>
                    <Button variant={"outlined"} color="error" size="large" onClick={closeHandler}>Cancel</Button>
                    <Button variant={"contained"} size="large"
                        onClick={submitHandler}
                        disabled={isLoadingNewGroup}
                    >Create</Button>
                </Stack>

            </Stack>
        </Dialog>
    )
}

export default NewGroup