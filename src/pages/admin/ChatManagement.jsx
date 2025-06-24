import { Avatar, Skeleton, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import AvatarCard from '../../components/shared/AvatarCard'
import Table from '../../components/shared/Table'
import { useErrors } from '../../hooks/hook'
import { transformImage } from '../../lib/features'
import { useGetDashboardChatsQuery } from '../../redux/api/api'

const cols = [
    {
        field: "id",
        headerName: "ID",
        headerClassName: "table-header",
        width: 200
    },
    {
        field: "avatar",
        headerName: "Avatar",
        headerClassName: "table-header",
        width: 150,
        renderCell: (params) => {
            return <AvatarCard avatar={params.row.avatar} />
        }
    },
    {
        field: "name",
        headerName: "Name",
        headerClassName: "table-header",
        width: 250
    },
    {
        field: "groupChat",
        headerName: "Group Chat",
        headerClassName: "table-header",
        width: 250
    },
    {
        field: "totalMembers",
        headerName: "Total Members",
        headerClassName: "table-header",
        width: 120
    },
    {
        field: "members",
        headerName: "Members",
        headerClassName: "table-header",
        width: 400,
        renderCell: (params) => (<AvatarCard max={100} avatar={params.row.members} />)
    },
    {
        field: "totalMessages",
        headerName: "Total Messages",
        headerClassName: "table-header",
        width: 200
    },
    {
        field: "creator",
        headerName: "Created By",
        headerClassName: "table-header",
        width: 250,
        renderCell: (params) => {
            return <Stack direction={"row"} alignItems={"center"} spacing={2}>
                <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
                <span>{params.row.creator.name}</span>
            </Stack>
        }
    },
]

const ChatManagement = () => {
    const [rows, setRows] = useState([])
    const { data, isLoading, error, isError } = useGetDashboardChatsQuery();

    useErrors([{ error: error, isError: isError }]);
    console.log(data);

    useEffect(() => {
        if (data)
            setRows(data?.chats.map(i => (
                {
                    ...i,
                    id: i._id,
                    avatar: i.avatar.map(i => transformImage(i, 50)),
                    members: i.members.map(i => transformImage(i.avatar, 50)),
                    creator: {
                        name: i.creator.name,
                        avatar: transformImage(i.creator.avatar, 50)
                    }
                }
            ))
            );
    }, [data])
    return (
        <AdminLayout>
            {
                isLoading ? (<Skeleton />) :
                    <Table heading={"All Chats"} cols={cols} rows={rows} />
            }
        </AdminLayout>
    )
}

export default ChatManagement