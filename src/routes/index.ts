import { createBrowserRouter } from "react-router";
import AuthLayout from "@/components/_layout/auth.layout";

import Homepage from "../pages/Homepage";
import {
  Congratulations,
  CreateAccount,
  ForgetPassword,
  Login,
  ResetOtp,
  ResetPassword,
  VerifyOtp,
} from "@/pages";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Homepage,
  },
  {
    path: "",
    Component: AuthLayout,
    children: [
      {
        path: "create-account",
        Component: CreateAccount,
      },
      {
        path: "login",
        Component: Login,
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
]);

export default router;
