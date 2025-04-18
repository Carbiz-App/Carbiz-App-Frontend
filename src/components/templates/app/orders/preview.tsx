import { Button } from "@/components/ui/button";
import { ArrowLeft } from "@phosphor-icons/react";
import { useNavigate } from "react-router";

const PreviewOrder = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <Button
          onClick={() => navigate(-1)}
          variant={"ghost"}
          className=" text-[#696572] hover:text-primary text-base font-[500]flex items-center gap-2"
        >
          {" "}
          <ArrowLeft className=" size-6 font-bold" />
          Order Details
        </Button>
      </div>
    </div>
  );
};

export default PreviewOrder;
