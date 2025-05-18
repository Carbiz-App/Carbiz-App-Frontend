import { Button } from "@/components/ui/button";
import { ArrowLeft } from "iconsax-reactjs";
import { NavLink, Outlet, useNavigate } from "react-router";

const Settings = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-10">
      <Button
        variant={"ghost"}
        onClick={() => navigate("/dashboard")}
        className="inline-flex items-center gap-2.5"
      >
        <ArrowLeft size={20} color="#696572" />
        <h4 className="font-family-satoshi text-text-secondary text-base font-medium">
          Settings
        </h4>
      </Button>

      <div className="bg-white p-5 md:p-10 border border-background-light rounded-md">
        <h3 className="text-xl font-bold font-family-satoshi">Settings</h3>

        <div className="inline-flex gap-2.5 mt-3 md:mt-5">
          {["profile", "payment", "document"].map((nav) => (
            <NavLink
              key={nav}
              to={`${nav !== "profile" ? `/settings/${nav}` : ""}`}
              end={nav === "profile"}
              className={({ isActive }) =>
                isActive
                  ? "text-primary border-b border-b-primary capitalize text-base font-bold font-family-satoshi p-2 px-2.5"
                  : "capitalize text-base text-[#837E8E] font-medium font-family-satoshi p-2"
              }
            >
              {nav}
            </NavLink>
          ))}
        </div>

        <div className=" py-5 md:py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Settings;
