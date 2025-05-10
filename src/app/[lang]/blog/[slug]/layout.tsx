import { Box } from "@mui/material";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box component="section" sx={{ pb: 4 }}>
      {children}
    </Box>
  );
}
