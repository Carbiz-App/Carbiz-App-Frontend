import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import InputField from "@/components/atoms/form/input";
import PaymentSchema, { PaymentSchemaType } from "@/schema/payment.schema";
import {
  useAddBankDetail,
  useFetchBankDetail,
  useUpdateBankDetails,
} from "@/queries/payment";
import { useModal } from "@/store/useModal";
import { useEffect } from "react";
import { Loader } from "lucide-react";

const PaymentForm = () => {
  const form = useForm<PaymentSchemaType>({
    resolver: zodResolver(PaymentSchema),
  });
  const { createBankDetail, loading } = useAddBankDetail();
  const { updateBankDetail, loading: updateLoading } = useUpdateBankDetails();
  const { modal } = useModal();
  const {
    fetchOneBankDetail,
    data: bankData,
    loading: bankLoading,
  } = useFetchBankDetail();

  console.log(bankData);

  useEffect(() => {
    if (modal.data) {
      fetchOneBankDetail({
        variables: { bankID: modal.data },
      });
    }
  }, [modal.data]);

  useEffect(() => {
    const payload = bankData?.MerchantFetchOneBankDetails?.payload;
    if (payload) {
      form.reset(payload);
    }
  }, [bankData, form]);

  const onSubmit = async (data: PaymentSchemaType) => {
    if (modal.data) {
      await updateBankDetail({
        variables: {
          bankDetails: data,
          bankID: modal.data,
        },
      });
      return;
    } else {
      await createBankDetail({
        variables: {
          bankDetails: data,
        },
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 md:space-y-5"
      >
        {bankLoading ? (
          <Loader />
        ) : (
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
        )}

        <Button
          disabled={loading || updateLoading}
          type="submit"
          className="bg-primary text-white px-7 md:py-6 rounded-[0.625rem] text-base "
        >
          {loading || updateLoading
            ? "loading..."
            : modal.data
            ? "Edit"
            : "Add"}
        </Button>
      </form>
    </Form>
  );
};

export default PaymentForm;
