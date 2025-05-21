import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import InputField from "@/components/atoms/form/input";
import PaymentSchema, { PaymentSchemaType } from "@/schema/payment.schema";
import { useAddBankDetail } from "@/queries/payment";

const PaymentForm = () => {
  const form = useForm<PaymentSchemaType>({
    resolver: zodResolver(PaymentSchema),
  });
  const { createBankDetail, loading } = useAddBankDetail();

  const onSubmit = async (data: PaymentSchemaType) => {
    // if (path) {
    //   await updateProduct({
    //     variables: {
    //       input: data,
    //       productID: singleProduct,
    //     },
    //   });
    //   return;
    // } else {
    await createBankDetail({
      variables: {
        bankDetails: data,
      },
    });
    // }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 md:space-y-5"
      >
        <div className="grid gap-2 md:gap-4">
          <InputField
            control={form.control}
            name="accountName"
            label="Account Name"
            placeholder="John Doe"
          />
          <InputField
            control={form.control}
            name="accountNumber"
            label="Account Number"
            placeholder="023333398"
          />
          <InputField
            control={form.control}
            label="Bank Name"
            name="bankName"
            placeholder="First Bank"
          />
        </div>

        <Button
          disabled={loading}
          type="submit"
          className="bg-primary text-white px-7 md:py-6 rounded-[0.625rem] text-base "
        >
          {loading ? "loading..." : "Add"}
        </Button>
      </form>
    </Form>
  );
};

export default PaymentForm;
