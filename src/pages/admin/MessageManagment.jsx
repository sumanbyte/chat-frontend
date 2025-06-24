import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import { Avatar, Box, Skeleton, Stack } from '@mui/material'
import { dashboardData } from '../../constants/sampleData'
import { fileFormat, transformImage } from '../../lib/features'
import moment from 'moment';
import RenderAttachment from "../../components/shared/RenderAttachment"
import { useGetDashboardMessagesQuery } from '../../redux/api/api'
import { useErrors } from '../../hooks/hook'

const cols = [
    {
        field: "id",
        headerName: "ID",
        headerClassName: "table-header",
        width: 200
    },
    {
        field: "attachments",
        headerName: "Attachments",
        headerClassName: "table-header",
        width: 200,
        renderCell: (params) => {
            const { attachments } = params.row;

            return attachments?.length > 0 ? attachments.map((i) => {
                const url = i.url;
                const file = fileFormat(url);
                return <Box>
                    <a href={url} target='_blank' rel='noreferrer' style={{
                        color: "black"
                    }}>
                        <RenderAttachment file={file} url={url} />
                    </a>
                </Box>
            }) : "No Attachments"
        }
    },
    {
        field: "content",
        headerName: "Content",
        headerClassName: "table-header",
        width: 400
    },
    {
        field: "sender",
        headerName: "Sent By",
        headerClassName: "table-header",
        width: 200,
        renderCell: (params) => <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
            <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
            <span>{params.row.sender.name}</span>
        </Stack>
    },
    {
        field: "chat",
        headerName: "Chat",
        headerClassName: "table-header",
        width: 200
    },
    {
        field: "groupChat",
        headerName: "Group Chat",
        headerClassName: "table-header",
        width: 100
    },
    {
        field: "createdAt",
        headerName: "Time",
        headerClassName: "table-header",
        width: 250
    },
]

const MessageManagement = () => {
    const [rows, setRows] = useState([])
    const { data, isLoading, error, isError } = useGetDashboardMessagesQuery();
    console.log(data)
    useErrors([{ error: error, isError: isError }]);

    useEffect(() => {
        if (data)
            setRows(data?.messages.map(i => ({
                ...i,
                id: i._id,
                sender: {
                    name: i.sender.name,
                    avatar: transformImage(i.sender.avatar, 50)
                },
                createdAt: moment(i.createdAt).format("MMMM Dd YYYY, hh:mm a")
            })))
    }, [data])
    return (
        <AdminLayout>
            {
                isLoading ? (<Skeleton />) :
                    <Table heading={"All Messages"} cols={cols} rows={rows} rowHeight={200} />
            }
        </AdminLayout>
    )
}

export default MessageManagement