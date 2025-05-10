"use client";

import { useState, useMemo } from "react";
import Link from "@/components/Link";
import { usePathname } from "next/navigation";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { useSpring, animated } from "@react-spring/web";
import GlobeIcon from "@mui/icons-material/Language";

import { LOCALES } from "@/constant";
import { Locale } from "@/locales/dictionaries";
import { Box, Button, ButtonProps, Stack } from "@mui/material";

export default function Toggler(props: ButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const path = usePathname().slice(4);
  const open = Boolean(anchorEl);

  const styles = useSpring({
    opacity: open ? 1 : 0,
    transform: open ? `translateY(0px)` : `translateY(-10px)`,
    config: { tension: 250, friction: 20 },
  });

  const localeFullName = useMemo(
    () => ({
      en: "ENGLISH",
      ko: "KOREAN",
    }),
    []
  );

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        {...props}
        onClick={handleToggle}
        sx={{
          minWidth: 0,
        }}
      >
        <GlobeIcon />
      </Button>

      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        disablePortal
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          {/* @ts-expect-error I am not so sure. */}
          <animated.div style={styles}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 1,
              }}
            >
              <Stack
                direction="column"
                component="ul"
                sx={{ listStyle: "none", m: 0, p: 1, gap: 1 }}
              >
                {LOCALES.map((locale) => (
                  <Box component="li" key={locale}>
                    <Link
                      href={`/${locale}/${path}`}
                      sx={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      {localeFullName[locale as Locale]}
                    </Link>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </animated.div>
        </ClickAwayListener>
      </Popper>
    </>
  );
}
