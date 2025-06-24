import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography
} from "@mui/material";
import React, { memo } from "react";
import { transformImage } from "../../lib/features";
import { useAcceptFriendRequestMutation, useGetNotificationsQuery } from "../../redux/api/api";
import { useErrors } from "../../hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotification } from "../../redux/reducers/misc"
import toast from "react-hot-toast";

function Notifications() {
  const { isNotification } = useSelector(state => state.misc)
  const dispatch = useDispatch();
  const { isLoading, data, isError, error } = useGetNotificationsQuery();
  useErrors([{ error, isError }]);
  const [acceptRequest] = useAcceptFriendRequestMutation();
  console.log(data);
  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
    try {
      const res = await acceptRequest({ requestId: _id, accept });
      if (res.data?.success) {
        console.log("Use socket here")
        toast.success(res.data.message);
      } else {
        toast.error(res.error?.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");

    }
  };

  const closeHandler = () => dispatch(setIsNotification(false))
  return (
    <Dialog open={isNotification} onClose={closeHandler}>
      <Stack p={{ xs: "1rem", sm: "2rem" }} maxWidth={"25rem"}>
        <DialogTitle>Notifications</DialogTitle>

        {
          isLoading ? (<Skeleton />) : (
            <>
              {data?.allRequests.length > 0 ? (
                <>
                  {data.allRequests.map((i) => (
                    <NotificationItem
                      key={i._id}
                      sender={i.sender}
                      _id={i._id}
                      handler={friendRequestHandler}
                    />
                  ))}
                </>
              ) : (
                <Typography
                  variant="body1"
                  sx={{
                    textAlign: "center",
                    color: "text.secondary",
                    fontStyle: "italic",
                    padding: "2rem",
                    backgroundColor: "background.paper",
                    borderRadius: 1,
                    boxShadow: 1,
                  }}
                >
                  No notifications yet
                </Typography>
              )}
            </>
          )
        }

      </Stack>
    </Dialog>
  );
}

const NotificationItem = memo(({ sender, _id, handler }) => {
  return (
    <ListItem

    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={transformImage(sender.avatar)} />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "flex",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {`${sender.name} sent you a friend request`}
        </Typography>

        <Stack direction={{
          xs: "column",
          sm: "row"
        }}>
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>Reject</Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default Notifications;
