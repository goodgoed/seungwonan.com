import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Stack
      spacing={2}
      sx={{ height: "100%", justifyContent: "center", alignItems: "center" }}
    >
      <Typography variant="h2" component="h1">
        Error 404
      </Typography>
      <Button variant="outlined">
        <Link href="/">GO BACK</Link>
      </Button>
    </Stack>
  );
}
