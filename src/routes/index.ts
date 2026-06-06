import { createBrowserRouter } from "react-router";
import AuthLayout from "@/components/_layout/auth.layout";
import MainLayout from "@/components/_layout/main.layout";

const router = createBrowserRouter([
  {
    Component: AuthLayout,
    children: [
      {
        path: "/",
        lazy: async () => {
          const { default: Component } = await import(
            "@/components/templates/authentication/login"
          );
          return { Component };
        },
      },
      {
        path: "create-account",
        lazy: async () => {
          const { default: Component } = await import(
            "@/components/templates/authentication/registration"
          );
          return { Component };
        },
      },
      {
        path: "verify-otp",
        lazy: async () => {
          const { default: Component } = await import(
            "@/components/templates/authentication/verify"
          );
          return { Component };
        },
      },
      {
        path: "congratulations",
        lazy: async () => {
          const { default: Component } = await import(
            "@/components/templates/authentication/congratuations"
          );
          return { Component };
        },
      },
      {
        path: "forgot-password",
        lazy: async () => {
          const { default: Component } = await import(
            "@/components/templates/authentication/forgetPassword"
          );
          return { Component };
        },
      },
      {
        path: "reset-password",
        lazy: async () => {
          const { default: Component } = await import(
            "@/components/templates/authentication/resetPassword"
          );
          return { Component };
        },
      },
      {
        path: "reset-otp",
        lazy: async () => {
          const { default: Component } = await import(
            "@/components/templates/authentication/verify"
          );
          return { Component };
        },
      },
    ],
  },
  {
    path: "",
    Component: MainLayout,
    children: [
      {
        path: "dashboard",
        lazy: async () => {
          const { default: Component } = await import(
            "@/components/templates/app/dashboard"
          );
          return { Component };
        },
      },
      {
        path: "orders",
        children: [
          {
            path: "",
            lazy: async () => {
              const { default: Component } = await import(
                "@/components/templates/app/orders"
              );
              return { Component };
            },
          },
          {
            path: ":id",
            lazy: async () => {
              const { default: Component } = await import(
                "@/components/templates/app/orders/preview"
              );
              return { Component };
            },
          },
        ],
      },
      {
        path: "payouts",
        children: [
          {
            path: "",
            lazy: async () => {
              const { default: Component } = await import(
                "@/components/templates/app/payout"
              );
              return { Component };
            },
          },
        ],
      },
      {
        path: "products",
        children: [
          {
            path: "",
            lazy: async () => {
              const { default: Component } = await import(
                "@/components/templates/app/products"
              );
              return { Component };
            },
          },
          {
            path: ":id",
            lazy: async () => {
              const { default: Component } = await import(
                "@/components/templates/app/products/add"
              );
              return { Component };
            },
          },
          {
            path: "new",
            lazy: async () => {
              const { default: Component } = await import(
                "@/components/templates/app/products/add"
              );
              return { Component };
            },
          },
        ],
      },
      {
        path: "settings",
        lazy: async () => {
          const { default: Component } = await import(
            "@/components/templates/app/settings"
          );
          return { Component };
        },
        children: [
          {
            path: "",
            lazy: async () => {
              const { default: Component } = await import(
                "@/components/templates/app/settings/profile"
              );
              return { Component };
            },
          },
          {
            path: "payment",
            lazy: async () => {
              const { default: Component } = await import(
                "@/components/templates/app/settings/payment"
              );
              return { Component };
            },
          },
          {
            path: "document",
            lazy: async () => {
              const { default: Component } = await import(
                "@/components/templates/app/settings/documents"
              );
              return { Component };
            },
          },
        ],
      },
    ],
  },
]);

export default router;
