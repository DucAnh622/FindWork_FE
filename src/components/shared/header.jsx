// import * as React from "react";
// import {
//   AppBar,
//   Box,
//   Toolbar,
//   IconButton,
//   Typography,
//   Container,
//   Avatar,
//   Button,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import AdbIcon from "@mui/icons-material/Adb";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import LogoutIcon from "@mui/icons-material/Logout";
// import FolderSharedIcon from "@mui/icons-material/FolderShared";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../../services/userService";
// import { logoutRedux } from "../../redux/slices/userSlice";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// const pages = ["Job", "Company", "Resume"];

// export const Header = () => {
//   const user = useSelector((state) => state.user?.login?.user);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);

//   const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
//   const handleCloseNavMenu = () => setAnchorElNav(null);
//   const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
//   const handleCloseUserMenu = () => setAnchorElUser(null);

//   const handleLogout = async () => {
//     handleCloseUserMenu();
//     const res = await logout();
//     if (res && res.statusCode === 201) {
//       toast.success(res.message);
//       dispatch(logoutRedux());
//       navigate("/login");
//     } else {
//       toast.error(res.message);
//     }
//   };

//   const handleNavigatePage = (page) => {
//     handleCloseNavMenu();
//     switch (page) {
//       case "Job":
//         navigate("/job");
//         break;
//       case "Company":
//         navigate("/company");
//         break;
//       case "Resume":
//         navigate("/resume");
//         break;
//       case "Myaccount":
//         navigate(`/my-account/${user?._id}`);
//         break;
//       case "Myresume":
//         navigate(`/my-resume/${user?._id}`);
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <AppBar position="static" sx={{ backgroundColor: "#6f42c1" }}>
//       <Container maxWidth={false} disableGutters>
//         <Toolbar sx={{ px: 1 }}>
//           <AdbIcon
//             sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: "#fff" }}
//           />
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="/"
//             sx={{
//               mr: 2,
//               display: { xs: "none", md: "flex" },
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".3rem",
//               color: "#fff",
//               textDecoration: "none",
//             }}
//           >
//             FindWork
//           </Typography>

//           <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//             <IconButton
//               size="large"
//               onClick={handleOpenNavMenu}
//               sx={{ color: "#fff" }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               anchorEl={anchorElNav}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//               transformOrigin={{ vertical: "top", horizontal: "left" }}
//               sx={{ display: { xs: "block", md: "none" } }}
//             >
//               {pages.map((page) => (
//                 <MenuItem key={page} onClick={() => handleNavigatePage(page)}>
//                   <Typography textAlign="center">{page}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>

//           <AdbIcon
//             sx={{ display: { xs: "flex", md: "none" }, mr: 1, color: "#fff" }}
//           />
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href="/"
//             sx={{
//               mr: 2,
//               display: { xs: "flex", md: "none" },
//               flexGrow: 1,
//               fontFamily: "monospace",
//               fontWeight: 700,
//               letterSpacing: ".3rem",
//               color: "#fff",
//               textDecoration: "none",
//             }}
//           >
//             FindWork
//           </Typography>

//           <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
//             {pages.map((page) => (
//               <Button
//                 key={page}
//                 sx={{
//                   my: 2,
//                   color: "#fff",
//                   display: "block",
//                   "&:hover": { color: "#d6bbfb" },
//                 }}
//                 onClick={() => handleNavigatePage(page)}
//               >
//                 {page}
//               </Button>
//             ))}
//           </Box>

//           <Box sx={{ flexGrow: 0 }}>
//             {user?.email ? (
//               <>
//                 <Button
//                   onClick={handleOpenUserMenu}
//                   sx={{
//                     textTransform: "none",
//                     color: "#fff",
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 1,
//                     "&:hover": { color: "#d6bbfb" },
//                   }}
//                 >
//                   <Avatar
//                     alt={user.name}
//                     src={
//                       user.image
//                     }
//                     sx={{ width: 50, height: 50 }}
//                   />
//                 </Button>
//                 <Menu
//                   anchorEl={anchorElUser}
//                   open={Boolean(anchorElUser)}
//                   onClose={handleCloseUserMenu}
//                   anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//                   transformOrigin={{ vertical: "top", horizontal: "right" }}
//                 >
//                   <MenuItem
//                     onClick={() => handleNavigatePage("Myaccount")}
//                     sx={{ "&:hover": { color: "#6f42c1" } }}
//                   >
//                     <AccountCircleIcon sx={{ mr: 1 }} />
//                     {user.name}
//                   </MenuItem>
//                   <MenuItem
//                     onClick={() => handleNavigatePage("Myresume")}
//                     sx={{ "&:hover": { color: "#6f42c1" } }}
//                   >
//                     <FolderSharedIcon sx={{ mr: 1 }} />
//                     My resume
//                   </MenuItem>
//                   <MenuItem
//                     onClick={handleLogout}
//                     sx={{ "&:hover": { color: "#6f42c1" } }}
//                   >
//                     <LogoutIcon sx={{ mr: 1 }} />
//                     Logout
//                   </MenuItem>
//                 </Menu>
//               </>
//             ) : (
//               <Button sx={{ color: "#fff" }} onClick={() => navigate("/login")}>
//                 Login
//               </Button>
//             )}
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };

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
import { useLocation, useNavigate } from "react-router-dom";

const pages = ["Job", "Company", "Resume"];

export const Header = () => {
  const user = useSelector((state) => state.user?.login?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleNavigatePage = (page) => {
    const path = `/${page.toLowerCase()}`;
    navigate(path);
    handleCloseNavMenu();
  };

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
    <AppBar position="static" sx={{ backgroundColor: "#6f42c1" }}>
      <Container maxWidth={false} sx={{ pl: 1, pr: 1 }} disableGutters>
        <Toolbar disableGutters>
          {/* Logo desktop */}
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            FindWork
          </Typography>

          {/* Mobile Menu Icon */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
              onClick={handleOpenNavMenu}
              color="inherit"
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
              {pages.map((page) => {
                const path = `/${page.toLowerCase()}`;
                const isActive = location.pathname.startsWith(path);
                return (
                  <MenuItem
                    key={page}
                    onClick={() => handleNavigatePage(page)}
                    selected={isActive}
                  >
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>

          {/* Logo mobile */}
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            component="a"
            href="/"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            FindWork
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => {
              const path = `/${page.toLowerCase()}`;
              const isActive = location.pathname.startsWith(path);
              return (
                <Button
                  key={page}
                  onClick={() => handleNavigatePage(page)}
                  sx={{
                    my: 2,
                    color: isActive ? "#d6bbfb" : "#fff",
                    fontWeight: isActive ? 700 : 400,
                    borderBottom: isActive ? "2px solid #d6bbfb" : "none",
                    borderRadius: 0,
                    display: "block",
                    "&:hover": { color: "#d6bbfb" },
                  }}
                >
                  {page}
                </Button>
              );
            })}
          </Box>

          {/* User menu */}
          <Box sx={{ flexGrow: 0 }}>
            {user?.email ? (
              <>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={user.name}
                    src={user.image}
                    sx={{ width: 40, height: 40 }}
                  />
                </IconButton>
                <Menu
                  sx={{ mt: "45px" }}
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
                    onClick={() => {
                      handleNavigatePage("Myaccount");
                      handleCloseUserMenu();
                    }}
                  >
                    <AccountCircleIcon sx={{ mr: 1 }} />
                    {user.name}
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleNavigatePage("Myresume");
                      handleCloseUserMenu();
                    }}
                  >
                    <FolderSharedIcon sx={{ mr: 1 }} />
                    My Resume
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon sx={{ mr: 1 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                onClick={() => navigate("/login")}
                sx={{
                  color: "#fff",
                  fontWeight: 600,
                  "&:hover": { color: "#d6bbfb" },
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
