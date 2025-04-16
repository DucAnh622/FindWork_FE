import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Avatar,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/userService";
import { logoutRedux } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const pages = ["Job", "Company", "Resume"];

export const Header = () => {
  const user = useSelector((state) => state.user?.login?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = async () => {
    handleCloseUserMenu();
    const res = await logout();
    if (res && res.statusCode === 201) {
      toast.success(res.message);
      dispatch(logoutRedux());
      navigate("/login");
    } else {
      toast.error(res.message);
    }
  };

  const handleNavigatePage = (page) => {
    handleCloseNavMenu();
    switch (page) {
      case "Job":
        navigate("/job");
        break;
      case "Company":
        navigate("/company");
        break;
      case "Resume":
        navigate("/resume");
        break;
      case "Myaccount":
        navigate(`/my-account/${user?._id}`);
        break;
      case "Myresume":
        navigate(`/my-resume/${user?._id}`);
        break;
      default:
        break;
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#6f42c1" }}>
      <Container maxWidth={false} disableGutters>
        <Toolbar sx={{ px: 1 }}>
          <AdbIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: "#fff" }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            FindWork
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              sx={{ color: "#fff" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleNavigatePage(page)}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <AdbIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1, color: "#fff" }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#fff",
              textDecoration: "none",
            }}
          >
            FindWork
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{
                  my: 2,
                  color: "#fff",
                  display: "block",
                  "&:hover": { color: "#d6bbfb" },
                }}
                onClick={() => handleNavigatePage(page)}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user?.email ? (
              <>
                <Button
                  onClick={handleOpenUserMenu}
                  sx={{
                    textTransform: "none",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    "&:hover": { color: "#d6bbfb" },
                  }}
                >
                  <Avatar
                    alt={user.name}
                    src={
                      user.image 
                    }
                    sx={{ width: 50, height: 50 }}
                  />
                </Button>
                <Menu
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem
                    onClick={() => handleNavigatePage("Myaccount")}
                    sx={{ "&:hover": { color: "#6f42c1" } }}
                  >
                    <AccountCircleIcon sx={{ mr: 1 }} />
                    {user.name}
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleNavigatePage("Myresume")}
                    sx={{ "&:hover": { color: "#6f42c1" } }}
                  >
                    <FolderSharedIcon sx={{ mr: 1 }} />
                    My resume
                  </MenuItem>
                  <MenuItem
                    onClick={handleLogout}
                    sx={{ "&:hover": { color: "#6f42c1" } }}
                  >
                    <LogoutIcon sx={{ mr: 1 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button sx={{ color: "#fff" }} onClick={() => navigate("/login")}>
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
