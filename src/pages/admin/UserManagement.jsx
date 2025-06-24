import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import { Avatar } from '@mui/material'
import { transformImage } from '../../lib/features'
import { useGetDashboardUsersQuery } from '../../redux/api/api'
import { useErrors } from '../../hooks/hook'
import { LayoutLoader } from '../../components/layout/Loaders'

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
        renderCell: (params) => <Avatar alt={params.row.name} src={params.row.avatar} />
    },
    {
        field: "name",
        headerName: "Name",
        headerClassName: "table-header",
        width: 200
    },
    {
        field: "username",
        headerName: "Username",
        headerClassName: "table-header",
        width: 200
    },
    {
        field: "friends",
        headerName: "Friends",
        headerClassName: "table-header",
        width: 200
    },
    {
        field: "groups",
        headerName: "Groups",
        headerClassName: "table-header",
        width: 200
    },
]

const UserManagement = () => {
    const [rows, setRows] = useState([])
    const { data, isLoading, isError, error } = useGetDashboardUsersQuery();

    useErrors([{ error: error, isError: isError }])

    useEffect(() => {
        if (data) {
            setRows(data?.data?.map((i) => ({
                ...i,
                id: i._id,
                avatar: transformImage(i.avatar, 50)
            })))
        }
    }, [data])
    return (
        <AdminLayout>
            {
                isLoading ? (<LayoutLoader />) :
                    <Table heading={"All Users"} cols={cols} rows={rows} />
            }
        </AdminLayout>
    )
}

export default UserManagement