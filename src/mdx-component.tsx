import React, { ComponentPropsWithoutRef } from "react";
import { ImageProps } from "next/image";
import { MDXComponents } from "mdx/types";
import Image from "next/image";
import { Box, Typography, List, ListItem } from "@mui/material";
import Link from "./components/Link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: (props) => <Link href={props.href} {...props} />,
    figure: (props) => (
      <Box
        component="figure"
        sx={{
          "& > pre": {
            borderRadius: 2,
            overflowX: "auto",
            p: 2,
            "& [data-line]": {
              padding: 0.4,
            },
          },
        }}
        {...props}
      />
    ),
    h1: (props) => (
      <Typography
        variant="h1"
        component="h1"
        sx={{ mt: 4, mb: 2 }}
        {...props}
      />
    ),
    h2: (props) => (
      <Typography
        variant="h2"
        component="h2"
        sx={{ mt: 4, mb: 2 }}
        {...props}
      />
    ),
    h3: (props) => (
      <Typography
        variant="h3"
        component="h3"
        sx={{ mt: 4, mb: 2 }}
        {...props}
      />
    ),
    h4: (props) => (
      <Typography
        variant="h4"
        component="h4"
        sx={{ mt: 4, mb: 2 }}
        {...props}
      />
    ),
    h5: (props) => (
      <Typography
        variant="h5"
        component="h5"
        sx={{ mt: 4, mb: 2 }}
        {...props}
      />
    ),
    h6: (props) => (
      <Typography
        variant="h6"
        component="h6"
        sx={{ mt: 4, mb: 2 }}
        {...props}
      />
    ),
    p: (props) => (
      <Typography
        variant="body1"
        component="p"
        sx={{ mb: 2, lineHeight: 2 }}
        {...props}
      />
    ),
    ul: (props) => <List component="ul" {...props} />,
    ol: (props) => <List component="ol" {...props} />,
    li: (props) => <ListItem component="li" {...props} />,
    blockquote: (props) => (
      <Box
        component="blockquote"
        sx={{
          borderLeft: 4,
          borderColor: "primary.main",
          pl: 2,
          py: 1,
          my: 2,
          bgcolor: "grey.100",
        }}
        {...props}
      />
    ),
    Image: (props: ImageProps & { caption?: string }) => {
      const { caption, ...imageProps } = props;

      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            my: 4,
          }}
        >
          <Box
            component={Image}
            sx={{
              borderRadius: 2,
              my: 0,
            }}
            {...imageProps}
          />
          {caption && (
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
              }}
            >
              {caption}
            </Typography>
          )}
        </Box>
      );
    },
    SideNote: (props: { children: React.ReactNode }) => {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            px: 2,
            py: 2,
            borderRadius: 1,
            border: 1,
            borderColor: "primary.main",
            fontSize: "0.875rem",
            "& > p": {
              mb: 0,
            },
          }}
        >
          <Typography component="span">🔈</Typography>
          {props.children}
        </Box>
      );
    },
    ...components,
  };
}
