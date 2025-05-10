import React from "react";
import "../../assets/styles/header.scss";
import {
  Box,
  Button,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../../assets/images/Logo1.jpg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../services/userService";
import { logoutRedux } from "../../redux/slices/userSlice";
import { toast } from "react-toastify";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import BusinessIcon from '@mui/icons-material/Business';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
export const Header = () => {
  const user = useSelector((state) => state.user?.login?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = async () => {
    handleCloseUserMenu();
    const res = await logout();
    if (res?.statusCode === 201) {
      toast.success(res.message);
      dispatch(logoutRedux());
      navigate("/login");
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Box className="header">
      <Box className="container">
        <Box className="header-left">
          <Box className="logo">
            <img src={logo} alt="TopCV Logo" />
          </Box>

          <Box className="nav-menu">
            <NavLink to="/" className="nav-item">
              <Typography className="nav-item">Home</Typography>
            </NavLink>
            <Box className="nav-item-dropdown">
              <NavLink to="/job" className="nav-item">
                <Typography className="nav-item">
                  Job <ExpandMoreIcon />
                </Typography>
              </NavLink>
              <Box className="dropdown-menu">
                <Link to="/job/sales" className="dropdown-item">
                <ContentPasteSearchIcon/>{" "}Job search
                </Link>
                <Link to="/job/accounting" className="dropdown-item">
                <BookmarksIcon/>{" "}Saved Jobs
                </Link>
                <Link to="/job/it" className="dropdown-item">
                <AssignmentTurnedInIcon/>{" "}Applied Jobs
                </Link>
                <Link to="/job/graphic" className="dropdown-item">
                <ThumbUpAltIcon/>{" "}Recommended Jobs
                </Link>
                <Link to="/company" className="dropdown-item">
                <BusinessIcon/>{" "}List companies
                </Link>
                <Link to="/company" className="dropdown-item">
                <LeaderboardIcon/>{" "}Top companies
                </Link>
              </Box>
            </Box>

            <NavLink to="/resume" className="nav-item">
              <Typography className="nav-item">
                Make CV <ExpandMoreIcon />
              </Typography>
            </NavLink>
            <NavLink to="/guide" className="nav-item">
              <Typography className="nav-item">
                Career Guide <ExpandMoreIcon />
              </Typography>
            </NavLink>
          </Box>
        </Box>
        <Box className="header-right">
          {user?.email ? (
            <>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={user?.name}
                  src={user?.image}
                  sx={{ width: 40, height: 40 }}
                />
              </IconButton>
              <Menu
                sx={{ mt: "44px", pt: 0, pb: 0 }}
                MenuListProps={{
                  sx: {
                    pb: 0,
                  },
                }}
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem
                  sx={{
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "#9d42ff",
                      "& .MuiSvgIcon-root": {
                        color: "#9d42ff",
                      },
                    },
                  }}
                  onClick={() => {
                    handleNavigatePage("Myaccount");
                    handleCloseUserMenu();
                  }}
                >
                  <AccountCircleIcon sx={{ mr: 1 }} />
                  {user.name}
                </MenuItem>
                <MenuItem
                  sx={{
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "#9d42ff",
                      "& .MuiSvgIcon-root": {
                        color: "#9d42ff",
                      },
                    },
                  }}
                  onClick={() => {
                    handleNavigatePage("Myresume");
                    handleCloseUserMenu();
                  }}
                >
                  <FolderSharedIcon sx={{ mr: 1 }} />
                  My Resume
                </MenuItem>
                <MenuItem
                  sx={{
                    transition: "all 0.3s ease",
                    "&:hover": {
                      color: "#9d42ff",
                      "& .MuiSvgIcon-root": {
                        color: "#9d42ff",
                      },
                    },
                  }}
                  onClick={handleLogout}
                >
                  <LogoutIcon sx={{ mr: 1 }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/register"
                variant="outlined"
                className="btn-outline"
              >
                Register
              </Button>
              <Button
                component={Link}
                to="/login"
                variant="contained"
                className="btn-green"
              >
                Login
              </Button>
              <Button disabled className="btn-disabled">
                Post Jobs & Search Resumes
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};
