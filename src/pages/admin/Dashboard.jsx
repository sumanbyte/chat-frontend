import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import AdminLayout from "../../components/layout/AdminLayout";
import { AdminPanelSettings as AdminPanelSettingsIcon, Notifications as NotificationsIcon, Groups as GroupsIcon, Person as PersonIcon, Message as MessageIcon } from "@mui/icons-material";
import moment from "moment";
import { CurveButton, SearchField } from "../../components/styles/StyledComponent";
import { matBlack } from "../../constants/color";
import { DoughnutChart, LineChart } from "../../components/specific/Charts";
import { LayoutLoader } from "../../components/layout/Loaders"
import { useGetDashboardStatsQuery } from "../../redux/api/api";
import { useErrors } from "../../hooks/hook";


const Dashboard = () => {

    const { data, error, isError, isLoading } = useGetDashboardStatsQuery()
    useErrors([{ error: error, isError: isError }]);

    const { stats } = data || {};

    const AppBar = <Paper elevation={3} sx={{
        padding: "2rem", margin: "2rem 0", borderRadius: "1rem"
    }} >
        <Stack direction={{
            lg: "row",
            sm: "column"
        }} spacing={"1rem"} alignItems={"center"}>
            <AdminPanelSettingsIcon sx={{
                fontSize: "3rem"
            }} />
            <SearchField placeholder={"Search..."} />
            <CurveButton>Search</CurveButton>
            <Box flexGrow={"1"}>

                <Typography display={{
                    xs: "none",
                    lg: "block"
                }} variant={"body1"}>
                    {moment().format("dddd, D MMMM YYYY")}
                </Typography>
                <NotificationsIcon />
            </Box>
        </Stack>
    </Paper>

    const Widgets = <Stack direction={{
        md: "column",
        lg: "row"
    }}
        justifyContent={"space-between"}
        alignItems={"center"}
        margin={"2rem 0"}
    >
        <Widget title={"Users"} value={stats?.user || 0} Icon={<PersonIcon />} />
        <Widget title={"Chats"} value={(stats?.groupChat || 0)} Icon={<GroupsIcon />} />
        <Widget title={"Messages"} value={stats?.message || 0} Icon={<MessageIcon />} />
    </Stack>
    return isLoading ? (<LayoutLoader />) : <AdminLayout>
        <Container component={"main"}>
            {AppBar}
            <Stack
                direction={"row"} justifyContent={"center"} sx={{ gap: "2rem" }} spacing={"2rem"} flexWrap={{
                    xs: "wrap",
                    lg: "nowrap"
                }}>
                <Paper
                    elevation={3}
                    sx={{
                        padding: "2rem 3.5rem",
                        borderRadius: "1rem",
                        width: "100%",
                        maxWidth: "45rem",
                    }}
                >
                    <Typography variant="h4" margin={"2rem 0"}>Last Messages</Typography>
                    <LineChart value={stats?.messagesChart || []} />
                </Paper>
                <Paper elevation={3}
                    sx={{
                        padding: "1rem",
                        borderRadius: "1rem",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        position: "relative",
                        maxWidth: "45rem",
                    }}
                >
                    <DoughnutChart labels={["Single Chats", "Group Chats"]} value={[stats?.singleChat || 0, stats?.groupChat || 0]} />
                    <Stack
                        position={"absolute"}
                        direction={"row"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        spacing={"0.5rem"}
                        width={"100%"}
                        height={"100%"}
                    >
                        <GroupsIcon />
                        <Typography variant={"body1"}>Vs</Typography>
                        <PersonIcon />
                    </Stack>
                </Paper>
            </Stack>
            {Widgets}
        </Container>
    </AdminLayout>
}

const Widget = ({ title, value, Icon }) => {
    return <Paper elevation={3}
        sx={{
            padding: "2rem 3.5rem",
            borderRadius: "1.5rem",
            width: "100%",
            margin: "2rem 0",
            maxWidth: "45rem",
        }}
    >
        <Stack alignItems={"center"} spacing={"1rem"}>
            <Typography
                sx={{
                    color: "rgba(0,0.0,0.7)",
                    borderRadius: "50%",
                    border: `5px solid ${matBlack}`,
                    width: "5rem",
                    height: "5rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                }}
            >{value}</Typography>
            <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
                {Icon}
                <Typography>{title}</Typography>
            </Stack>
        </Stack>
    </Paper>
}


{/* <Paper elevation={3} sx={{
        padding: "2rem 3.5rem",
        borderRadius: "1rem",
        width: "100%",
        maxWidth: "45rem",
        height: "25rem"
    }}>
        <Typography variant="h4" margin={"2rem 0"}>{title}</Typography>
        {Icon}
    </Paper> */}
export default Dashboard;