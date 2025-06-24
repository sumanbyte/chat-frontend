import { useInputValidation } from "6pp";
import { Search as SearchIcon } from '@mui/icons-material';
import { Dialog, DialogTitle, InputAdornment, List, Stack, TextField } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncMutation } from '../../hooks/hook';
import { useLazySearchUserQuery, useSendFriendRequestMutation } from '../../redux/api/api';
import { setIsSearch } from '../../redux/reducers/misc';
import UserItem from '../shared/UserItem';

function Search() {
    const search = useInputValidation("")

    const [searchUser] = useLazySearchUserQuery();
    const [sendFriendRequest, isLoadingSendFriendRequest] = useAsyncMutation(useSendFriendRequestMutation);

    const dispatch = useDispatch()

    const { isSearch } = useSelector(state => state.misc)
    const searchCloseHandler = () => {
        dispatch(setIsSearch(false))
    }

    const [users, setUsers] = React.useState([]);
    const addFriendHandler = async (id) => {
        await sendFriendRequest("Sending friend request...", { userId: id });
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            searchUser(search.value).then((data) => {
                setUsers(data.data.users)
            }).catch(error => {
                console.log(error)
            })
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, [search.value])
    return (
        <Dialog open={isSearch} onClose={searchCloseHandler}>
            <Stack px={"2rem"} direction={"column"} alignItems={"center"} width={"25rem"}>
                <DialogTitle textAlign={"center"}>
                    Find People
                </DialogTitle>
                <TextField label="" fullWidth value={search.value} onChange={search.changeHandler} variant='outlined' size='small' InputProps={{
                    startAdornment: (
                        <InputAdornment position='start'>
                            <SearchIcon />
                        </InputAdornment>
                    )
                }} />
                <List sx={{ width: "100%" }}>
                    {
                        users?.map((user, idx) => (
                            <UserItem user={user} handler={addFriendHandler} handlerIsloading={isLoadingSendFriendRequest} key={idx} />
                        ))
                    }
                </List>
            </Stack>
        </Dialog>
    )
}

export default Search