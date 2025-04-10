import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import InputField from "@/components/atoms/form/input";

import LoginSchema, { LoginSchemaType } from "@/schema/login.schema";
import { useNavigate } from "react-router";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginSchemaType) => {
    navigate("/congratulations");
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <InputField
          control={form.control}
          name="password"
          type="password"
          label="Password"
          placeholder="******************"
        />
        <InputField
          control={form.control}
          name="passwordConfirm"
          type="password"
          label="Enter Password Again"
          placeholder="******************"
        />
        <Button
          type="submit"
          className="bg-primary text-white w-full mt-10 py-6 rounded-[0.625rem] text-base"
        >
          Proceed
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
