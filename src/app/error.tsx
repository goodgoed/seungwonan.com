"use client";

import { Button, Stack, Typography } from "@mui/material";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Stack
      sx={{
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: 4,
      }}
    >
      <Typography variant="h2" component="h1">
        Something went wrong!
      </Typography>
      <Button variant="outlined" onClick={() => reset()}>
        TRY AGAIN
      </Button>
    </Stack>
  );
}
