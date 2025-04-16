import { HomePage } from "../pages/homePage";
import { DashBoard } from "../pages/dashBoard";
import { ListUser } from "../pages/dashBoard/user/listUser";
import { LoginPage } from "../pages/loginPage";
import { RegisterPage } from "../pages/registerPage";
import { AdminLayout } from "../layouts/adminLayout";
import { MainLayout } from "../layouts/mainLayout";
import { UserLayout } from "../layouts/userLayout";
import { ProtectedRoute } from "../routes/protectedRoute";
import { ListCompany } from "../pages/dashBoard/company/listCompany";
import { CuCompany } from "../pages/dashBoard/company/cuCompany";
import { ListSpeciality } from "../pages/dashBoard/speciality/listSpeciality";
import { ListSkill } from "../pages/dashBoard/skill/listSkill";
import { ListJob } from "../pages/dashBoard/job/listJob";
import { CuJob } from "../pages/dashBoard/job/cuJob";
import { Security } from "../pages/dashBoard/security/security";
import { ResumePage } from "../pages/home/resume/resumePage";
import { ResumeForm } from "../pages/home/resume/resumeForm";
import { ListResume } from "../pages/dashBoard/resume/listResume";
import { ResumePersonal } from "../pages/home/resume/resumePersonal";
import { JobList } from "../pages/home/job/JobList";
export const guestRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage />, index: true, title: "Home" },
      { path: "/resume", element: <ResumePage />, title: "Resume" },
      { path: "/job", element: <JobList />, title: "Job" },
      { path: "/company", element: "", title: "Company" },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    title: "Login",
  },
  {
    path: "/register",
    element: <RegisterPage />,
    title: "Register",
  },
];

export const userRoutes = [
  {
    path: "/",
    element: <ProtectedRoute element={<UserLayout />} roles={["User"]} />,
    children: [
      { path: "/", element: <HomePage />, index: true, title: "Home" },
      { path: "/my-resume/:id", element: <ResumePersonal />, title: "My Resume" },
      {
        path: "/resume/create/template/:id",
        element: <ResumeForm />,
        title: "Resume",
      },
    ],
  },
];

export const hrRoutes = [
  {
    path: "/dashboard",
    element: <ProtectedRoute element={<AdminLayout />} roles={["Hr"]} />,
    children: [
      { path: "/dashboard", element: <DashBoard />, title: "Hr Dashboard" },
    ],
  },
];

export const adminRoutes = [
  {
    path: "/dashboard",
    element: <ProtectedRoute element={<AdminLayout />} roles={["Admin"]} />,
    children: [
      { path: "/dashboard", element: <DashBoard />, title: "Admin Dashboard" },
      {
        path: "/dashboard/security",
        element: <Security />,
        title: "Security Management",
      },
      {
        path: "/dashboard/user",
        element: <ListUser />,
        title: "User Management",
      },
      {
        path: "/dashboard/company",
        element: <ListCompany />,
        title: "Company Management",
      },
      {
        path: "/dashboard/resume",
        element: <ListResume />,
        title: "Resume Management",
      },
      {
        path: "/dashboard/company/create",
        element: <CuCompany />,
        title: "Create Company",
      },
      {
        path: "/dashboard/company/update/:id",
        element: <CuCompany />,
        title: "Update Company",
      },
      {
        path: "/dashboard/speciality",
        element: <ListSpeciality />,
        title: "Speciality Management",
      },
      {
        path: "/dashboard/skill",
        element: <ListSkill />,
        title: "Skill Management",
      },
      { path: "/dashboard/job", element: <ListJob />, title: "Job Management" },
      {
        path: "/dashboard/job/update/:id",
        element: <CuJob />,
        title: "Update Job",
      },
      {
        path: "/dashboard/job/create",
        element: <CuJob />,
        title: "Create Job",
      },
    ],
  },
];
