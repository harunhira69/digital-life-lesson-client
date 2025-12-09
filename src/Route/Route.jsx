import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import DashboardLayout from "../Layout/DashboardLayout";
import DashboardHome from "../Dashboard/Dashboard";
import PublicLesson from "../Pages/PublicLesson/PublicLesson";
import PricingPage from "../Pages/PricingPage/PricingPage";
import NotFound from "../Pages/NotFound/NotFound";
import PrivateRoutes from "./PrivateRoute";
import AddLesson from "../Pages/AddLesson/AddLesson";
import MyLesson from "../Pages/MyLesson/MyLesson";
import MyFavorites from "../Dashboard/MyFavorite/MyFavorites";
import Profile from "../Dashboard/Profile/Profile";
import Terms from "../Component/Footer/Terms/Terms";
import PrivacyPolicy from "../Component/Footer/PrivacyPolicy/PrivacyPolicy";
import Support from "../Component/Footer/Support/Support";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement:<NotFound></NotFound>,
    children:[
      {
        index: true,
        element: <PublicLesson></PublicLesson>
      },
      {
        path:'public-lessons',
        Component:PublicLesson
      },
      {
        path:'pricing',
        Component:PricingPage
      },
      {
        path:'terms',
        Component:Terms
      },
      {
        path:'privacy',
        Component:PrivacyPolicy
      },
      {
        path:'support',
        Component:Support
      }

    ]
  },

  {
    path:'/auth',
    element:<AuthLayout></AuthLayout>,
    children:[
        {
            path:'login',
            Component:Login
        },
        {
            path:'register',
            Component:Register
        }
    ]
  },

  {
  path: "/dashboard",
  element: <DashboardLayout />,
  children: [
    { index: true, element: <DashboardHome /> },
    {
      path:'add-lesson',
      element:<PrivateRoutes>
        <AddLesson></AddLesson>
      </PrivateRoutes>
    },
    {
      path:'my-lessons',
      element:<PrivateRoutes>
        <MyLesson></MyLesson>
      </PrivateRoutes>
    },
    {
      path:'my-favorites',
      Component:MyFavorites
    },
    {
      path:'profile',
      Component:Profile
    },
  
  ]
},
{
  path: "*",
  element: <NotFound />
}

]);

export default router;