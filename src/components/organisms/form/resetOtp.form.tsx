import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import VerifyOtpSchema, {
  VerifyOtpSchemaType,
} from "@/schema/verifyotp.schema";
import { useLocation, useNavigate } from "react-router";
import FormOtpInput from "@/components/atoms/form/otpinput";

const ResetOtpForm = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const form = useForm<VerifyOtpSchemaType>({
    resolver: zodResolver(VerifyOtpSchema),
    defaultValues: {
      email: state?.email,
      code: undefined,
    },
  });

  const onSubmit = (data: VerifyOtpSchemaType) => {
    console.log(data);
    navigate("/congratulations");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 mt-2">
        <div className="flex flex-col gap-2.5">
          <FormOtpInput
            control={form.control}
            name="code"
            label="Reset Password Code"
            maxLength={4}
          />
          <p className="font-family-satoshi text-sm">
            Didn’t get code?{" "}
            <button type="button" className="text-primary cursor-pointer">
              Click to get code again
            </button>
          </p>
        </div>
        <Button
          onClick={() => navigate("/congratulations")}
          // type="submit"
          className="bg-primary text-white w-full mt-10 py-6 rounded-[0.625rem] text-base"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default ResetOtpForm;
