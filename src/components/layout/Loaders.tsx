import React from "react";
import { Grid, Skeleton, Stack } from "@mui/material";
import { BouncingSkeleton } from "../styles/StyledComponent";

export function LayoutLoader() {
  return (
    <Grid
      container
      height={"calc(100vh - 4rem)"}
      width={"100%"}
      spacing={"1rem"}
    >
      <Grid
        size={{ sm: 4, md: 3 }}
        sx={{
          display: { xs: "none", sm: "block" },
        }}
      >
        <Skeleton variant="rectangular" height={"100vh"} />
      </Grid>
      <Grid size={{ xs: 12, sm: 8, md: 5, lg: 6 }} bgcolor={"ButtonFace"}>
        <Stack spacing={"1rem"}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              height={100}
              sx={{
                marginBottom: "1rem",
                borderRadius: "0.5rem",
              }}
            />
          ))}
        </Stack>
      </Grid>
      <Grid
        size={{ md: 4, lg: 3 }}
        sx={{
          display: { xs: "none", md: "block" },
        }}
      >
        <Skeleton variant="rectangular" height={"100vh"} />
      </Grid>
    </Grid>
  );
}

export const TypingLoader = () => {
  return (
    <Stack
      spacing={"0.5rem"}
      direction={"row"}
      padding={"0.5rem"}
      justifyContent={"center"}
    >
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.1s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.2s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.3s",
        }}
      />
      <BouncingSkeleton
        variant="circular"
        width={15}
        height={15}
        style={{
          animationDelay: "0.4s",
        }}
      />
    </Stack>
  );
};
