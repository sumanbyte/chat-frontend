import React from 'react'
import { Avatar, Icon, Stack, Typography } from '@mui/material'
import {
  Face as FaceIcon,
  AlternateEmail as AlternateEmailIcon,
  CalendarMonth as CalendarMonthIcon,
}
  from "@mui/icons-material";
import moment from "moment";
import { transformImage } from '../../lib/features';


function Profile({ user }) {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        src={transformImage(user?.avatar?.url)}
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "5px solid white"
        }} />
      <ProfileCard heading={"Username"} text={user?.username} />
      <ProfileCard heading={"Name"} text={user?.name} />
      <ProfileCard heading={"Bio"} text={user?.bio || "No Bio"} Icon={<AlternateEmailIcon />} />
      <ProfileCard heading={"Joined"} text={moment(user?.createdAt).fromNow()} Icon={<CalendarMonthIcon />} />
    </Stack>
  )
}

const ProfileCard = ({ text, Icon, heading }) => {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={"1rem"}
      color={"white"}
      textAlign={"center"}>
      {Icon && Icon}
      <Stack>
        <Typography variant='body1'>{text}</Typography>
        <Typography color='gray' variant='caption'>{heading}</Typography>
      </Stack>
    </Stack>
  )
}

export default Profile