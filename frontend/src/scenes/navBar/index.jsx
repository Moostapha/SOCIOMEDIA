import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// custom state + component
import { setMode, setLogout } from "state";
import FlexBetween from "components/FlexBetween";

import React from "react";

const NavBar = () => {
  /* LOGICS */

  // ouverture ou pas du toggle menu sur les mobiles
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  // dispatcher les actions venant du reducer
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // user infos
  const user = useSelector((state) => state.user);
  // material ui hook to check mediaqueries
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  // custom colors from themeColor.js
  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryDark = theme.palette.primary.dark;
  const alt = theme.palette.background.alt;

  // Dynamic fullname's user
  const userFullName = `${user.firstName} ${user.lastName}`;
  // userFullName en dur pour avoir le rendu NavBar dans le navigateur
  // const userFullName = "fakePerson";

  // UserNotification on logOut
  // const logoutAlert = () => {
  //   return dispatch(
  //     setUserAlert({
  //       showAlert: true,
  //       alertType: "info",
  //       alertMsg: userFullName + " Déconnexion réussie",
  //     })
  //   );
  // };

  /* JSX */

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          onClick={() => navigate("/home")}
          fontWeight="bold"
          color="primary"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          // css pseudo-property in sx
          sx={{
            "&:hover": {
              color: primaryDark,
              cursor: "pointer",
            },
          }}
        >
          SOCIOPEDIA
        </Typography>

        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAVIGATION */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          {/* dark mode button */}
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={userFullName}>
            <Select
              value={userFullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={userFullName}>
                <Typography>{userFullName}</Typography>
              </MenuItem>

              {/* BUTTON LOGOUT */}
              <MenuItem
              //TODO Fix navigation on logout click
                onClick={() => {
                  dispatch(setLogout());
                  navigate("/");
                }}
              >
                Log Out
              </MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAVIGATION */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="200px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEM */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignitem="center"
            gap="3rem"
          >
            {/* dark mode button */}
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={userFullName}>
              <Select
                value={userFullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={userFullName}>
                  <Typography>{userFullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

// export to HomePage/index.jsx
export default NavBar;
