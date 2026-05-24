import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import DashboardLayout from "../Layout/DashboardLayout";
import DashboardHome from "../Dashboard/Dashboard";
import Home from "../Pages/Home/Home";
import PublicLesson from "../Pages/PublicLesson/PublicLesson";
import PricingPage from "../Pages/PricingPage/PricingPage";
import PaymentSuccess from "../Pages/PricingPage/PaymentSuccess";
import PaymentCancel from "../Pages/PricingPage/PaymentCancel";
import NotFound from "../Pages/NotFound/NotFound";
import PrivateRoutes from "./PrivateRoute";
import AddLesson from "../Pages/AddLesson/AddLesson";
import MyLesson from "../Pages/MyLesson/MyLesson";
import MyFavorites from "../Dashboard/MyFavorite/MyFavorites";
import Profile from "../Dashboard/Profile/Profile";
import Terms from "../Component/Footer/Terms/Terms";
import PrivacyPolicy from "../Component/Footer/PrivacyPolicy/PrivacyPolicy";
import Support from "../Component/Footer/Support/Support";
import LessonDetails from "../Pages/LessonDetails/LessonDetails";
import AdminLayout from "../Layout/AdminLayout";
import ManageUser from "../Dashboard/Admin/ManageUser/ManageUser";
import ManageLesson from "../Dashboard/Admin/ManageLesson/ManageLesson";
import ReportedLesson from "../Dashboard/Admin/ReportedLesson/ReportedLesson";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "public-lessons", Component: PublicLesson },
      { path: "pricing", Component: PricingPage },
      { path: "payment-success", Component: PaymentSuccess },
      { path: "payment/success", Component: PaymentSuccess },
      { path: "payment-cancel", Component: PaymentCancel },
      { path: "payment/cancel", Component: PaymentCancel },
      { path: "terms", Component: Terms },
      { path: "privacy", Component: PrivacyPolicy },
      { path: "support", Component: Support },
      { path: "life-lesson/:id", element: <LessonDetails /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", Component: Login },
      { path: "register", Component: Register },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoutes><DashboardLayout /></PrivateRoutes>,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "add-lesson", element: <AddLesson /> },
      { path: "my-lessons", element: <MyLesson /> },
      { path: "my-favorites", Component: MyFavorites },
      { path: "profile", Component: Profile },
    ],
  },
  {
    path: "/dashboard/admin",
    element: <PrivateRoutes><AdminLayout /></PrivateRoutes>,
    children: [
      { path: "manage-users", element: <ManageUser /> },
      { path: "manage-lessons", element: <ManageLesson /> },
      { path: "reported-lessons", element: <ReportedLesson /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;