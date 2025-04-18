import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import InputField from "@/components/atoms/form/input";

import LoginSchema, { LoginSchemaType } from "@/schema/login.schema";
import { useNavigate } from "react-router";

const LoginForm = () => {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

  const navigate = useNavigate();

  const onSubmit = (data: LoginSchemaType) => {
    navigate("/dashboard");
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 mt-4">
        <InputField
          control={form.control}
          name="email"
          type="email"
          label="Email"
          placeholder="john.doe@example.com"
        />
        <InputField
          control={form.control}
          name="password"
          type="password"
          label="Password"
          placeholder="******************"
        />
        <Button
          type="submit"
          className="bg-primary text-white w-full mt-10 py-6 rounded-[0.625rem] text-base"
        >
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
