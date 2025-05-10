"use client";

import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-geist-sans)",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    body1: {
      fontWeight: 300,
    },
  },
  cssVariables: true,
});

export default responsiveFontSizes(theme);
