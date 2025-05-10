import { Box } from "@mui/material";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box component="section" sx={{ px: 1, mt: 6 }}>
      {children}
    </Box>
  );
}
