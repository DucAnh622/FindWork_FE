import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../services/userService";
import { logoutRedux } from "../redux/slices/userSlice";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import DashboardIcon from "@mui/icons-material/Dashboard";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import GppGoodIcon from "@mui/icons-material/GppGood";
import { toast } from "react-toastify";
import { useEffect } from "react";

export const demoTheme = createTheme({
  cssVariables: { colorSchemeSelector: "data-toolpad-color-scheme" },
  breakpoints: { values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 } },
});

const NAVIGATION = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "dashboard/security",
    title: "Security",
    icon: <GppGoodIcon />,
  },
  {
    segment: "dashboard/company",
    title: "Company",
    icon: <BusinessIcon />,
  },
  {
    segment: "dashboard/job",
    title: "Job",
    icon: <WorkIcon />,
  },
  {
    segment: "dashboard/resume",
    title: "Resume",
    icon: <AssignmentIndIcon />,
  },
  {
    segment: "dashboard/user",
    title: "User",
    icon: <PersonIcon />,
  },
  {
    segment: "dashboard/speciality",
    title: "Speciality",
    icon: <IntegrationInstructionsIcon />,
  },
  {
    segment: "dashboard/skill",
    title: "Skill",
    icon: <DesignServicesIcon />,
  },
];

export function AdminLayout(props) {
  const user = useSelector((state) => state.user?.login?.user);
  const { window } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    let res = await logout();
    if (res && res.statusCode === 201) {
      toast.success(res.message);
      dispatch(logoutRedux());
      navigate("/login");
    } else {
      toast.error(res.message);
    }
  };

  useEffect(() => {
    if (user) {
      setSession({
        user: {
          name: user?.username,
          email: user?.email,
          image: user?.image,
        },
      });
    }
  }, [user]);

  const [session, setSession] = React.useState({});

  const authentication = React.useMemo(
    () => ({
      signIn: () => {
        setSession({
          user: {
            name: user?.username,
            email: user?.email,
            image: user?.image,
          },
        });
      },
      signOut: () => {
        setSession(null);
        handleLogout();
      },
    }),
    [navigate, user]
  );

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      router={{
        pathname: location.pathname,
        navigate: (path) => navigate(path),
        basename: "/dashboard",
      }}
      theme={demoTheme}
      window={window ? window() : undefined}
      branding={{
        title: "FindWork",
        logo: (
          <Box
            component="img"
            src="https://static.vecteezy.com/system/resources/previews/015/280/523/non_2x/job-logo-icon-with-tie-image-free-vector.jpg"
            alt="Logo"
            sx={{ width: 50, height: 50, border: "none" }}
          />
        ),
      }}
    >
      <DashboardLayout>
      <Outlet />
      </DashboardLayout>
    </AppProvider>
  );
}

AdminLayout.propTypes = {
  window: PropTypes.func,
};

export default AdminLayout;
