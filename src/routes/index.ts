import { createBrowserRouter } from "react-router";
import AuthLayout from "@/components/_layout/auth.layout";

// import Homepage from "../pages/Homepage";
import {
  Congratulations,
  CreateAccount,
  ForgetPassword,
  Login,
  ResetOtp,
  ResetPassword,
  VerifyOtp,
  Dashboard,
  Customers,
  Orders,
  PreviewCustomer,
  Settings,
  Profile,
  Payment,
  Documents,
  Payouts,
  Products,
} from "@/pages";
import MainLayout from "@/components/_layout/main.layout";

const router = createBrowserRouter([
  {
    Component: AuthLayout,
    children: [
      { path: "/", Component: Login },
      {
        path: "create-account",
        Component: CreateAccount,
      },
      {
        path: "verify-otp",
        Component: VerifyOtp,
      },
      {
        path: "congratulations",
        Component: Congratulations,
      },
      {
        path: "forgot-password",
        Component: ForgetPassword,
      },
      {
        path: "reset-otp",
        Component: ResetOtp,
      },
      {
        path: "reset-password",
        Component: ResetPassword,
      },
    ],
  },
  {
    path: "",
    Component: MainLayout,
    children: [
      {
        path: "dashboard",
        Component: Dashboard,
      },
      {
        path: "customers",
        children: [
          {
            path: "",
            Component: Customers,
          },
          {
            path: ":id",
            Component: PreviewCustomer,
          },
        ],
      },
      {
        path: "orders",
        Component: Orders,
      },
      {
        path: "payouts",
        Component: Payouts,
      },
      {
        path: "products",
        Component: Products,
      },
      {
        path: "settings",
        Component: Settings,
        children: [
          {
            path: "",
            Component: Profile,
          },
          {
            path: "payment",
            Component: Payment,
          },
          {
            path: "document",
            Component: Documents,
          },
        ],
      },
    ],
  },
]);

export default router;
