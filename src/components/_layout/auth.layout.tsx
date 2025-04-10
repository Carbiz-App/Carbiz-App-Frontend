import { Outlet, useLocation } from "react-router";

import { Link } from "react-router";

import logo from "@/assets/images/logo.svg";
import onboardingImage from "@/assets/images/onboarding.jpeg";
import stackIcon from "@/assets/images/icons/stack.svg";

const pageTitles = {
  login: {
    title: "Welcome back",
    description: "Login to continue from where you stopped",
    goto: "create-account",
  },
  "create-account": {
    title: "Create Account",
    description: "Let’s get you started by creating your account",
    goto: "login",
  },
  "verify-otp": {
    title: "Verification",
    description: "Check your email for the verification code",
    goto: "login",
  },

  "forgot-password": {
    title: "Don’t panic, let’s reset your password together",
    description: "Enter your email to receive reset password code",
    goto: "",
  },
  "reset-otp": {
    title: "Reset code",
    description: "Enter the code sent to your email",
    goto: "",
  },
  "reset-password": {
    title: "Reset password",
    description: "Create a new password and continue to login",
    goto: "",
  },
};

const AuthLayout = () => {
  const { pathname } = useLocation();

  let page = pathname.split("/").pop() as keyof typeof pageTitles;
  const pageKey = Object.keys(pageTitles).includes(page) ? page : "login";
  const pageTitle = pageTitles[pageKey];

  return (
    <div className="bg-white w-full">
      <div className="grid sm:grid-cols-2">
        <div className="pt-10 px-20">
          <Link to="/" className="">
            <img src={logo} alt="" loading="lazy" />
          </Link>

          <div className="pt-8 pb-6">
            {page.toString() !== "congratulations" && (
              <header className="flex flex-col items-start mb-10">
                <div className="rounded-full p-1 inline-flex justify-center items-center bg-background-light size-12">
                  <img src={stackIcon} className="size-7" />
                </div>
                <h2 className="text-2xl mt-3 font-bold text-text-primary">
                  {pageTitle?.title}
                </h2>
                <p className="text-text-secondary">{pageTitle?.description}</p>
              </header>
            )}

            <Outlet />

            {["login", "create-account"].includes(page) && (
              <div className="inline-flex w-full items-center justify-center gap-2 py-2 font-medium text-sm">
                <p className="text-text-secondary">
                  {page.toString() == "create-account"
                    ? "Already have an account?"
                    : "You don’t have an account?"}
                </p>
                <Link to={pageTitle?.goto} className="text-primary ">
                  {page.toString() == "login" ? "Create one" : "Log in"}
                </Link>
              </div>
            )}
          </div>
        </div>

        <div
          className={`relative hidden sm:flex flex-col overflow-hidden ${
            page !== "create-account" ? "h-screen" : "h-[100%]"
          }`}
          style={{
            background: `url(${onboardingImage}) no-repeat center center/cover`,
          }}
        >
          {/* <img src={onboardingImage} className="h-full object-cover " /> */}
          <div className="absolute bottom-30 py-10 px-20 text-white z-10">
            <h1 className="text-[2.5rem] font-bold font-family-bricolage">
              Your one-stop app
            </h1>
            <p className="text-lg font-family-satoshi font-medium">
              Your one-stop app for all things vehicle-related.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
