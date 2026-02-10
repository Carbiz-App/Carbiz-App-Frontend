import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import InputField from "@/components/atoms/form/input";
import PaymentSchema, { PaymentSchemaType } from "@/schema/payment.schema";
import {
  listSupportedBanks,
  useAddBankDetail,
  useFetchBankDetail,
  useResolveAccountNumber,
  useUpdateBankDetails,
} from "@/queries/payment";
import { useModal } from "@/store/useModal";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import CustomButton from "@/components/atoms/button/CustomButton";
import SelectField from "@/components/atoms/form/select";

const PaymentForm = () => {
  const form = useForm<PaymentSchemaType>({
    resolver: zodResolver(PaymentSchema),
  });
  const { createBankDetail, loading } = useAddBankDetail();
  const { updateBankDetail, loading: updateLoading } = useUpdateBankDetails();
  const { data } = listSupportedBanks();
  const { triggerResolve, resolveData, resolveLoading } =
    useResolveAccountNumber();

  const items = data?.flatMap((item: any) => ({
    label: item?.name,
    value: item?.name,
    code: item?.code,
  }));

  const { modal } = useModal();
  const {
    fetchOneBankDetail,
    data: bankData,
    loading: bankLoading,
  } = useFetchBankDetail();

  const selectedBankName = form.watch("bankName");
  const accountNumber = form.watch("accountNumber");
  const accountName = form.watch("accountName");
  const bankCode = form.watch("bankCode");

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

  // Resolve bank when completed
  // useEffect(() => {
  //   const resolve = async () => {
  //     const selectedBank = items?.find(
  //       (item: any) => item.value === selectedBankName,
  //     );
  //     const bankCode = selectedBank?.code;
  //     form.setValue("bankCode", bankCode);

  //     // Trigger only if we have a bank code and exactly 10 digits
  //     if (bankCode && accountNumber?.length === 10) {
  //       triggerResolve({
  //         variables: {
  //           accountNumber: accountNumber,
  //           bankCode: bankCode,
  //         },
  //       });
  //     }
  //   };
  //   resolve();
  // }, [accountNumber, selectedBankName]);

  // useEffect(() => {
  //   const resolvedName =
  //     resolveData?.ResolveAccountNumber?.payload?.account_name;
  //   if (resolvedName) {
  //     form.setValue("accountName", resolvedName);
  //   }
  // }, [resolveData, form]);

  // useEffect(() => {
  //   if (accountName) {
  //     form.setValue("accountName", "");
  //   }
  // }, [accountNumber, selectedBankName]);

  const onSubmit = async (data: PaymentSchemaType) => {
    // console.log({ ...data });
    const selectedBank = items?.find(
      (item: any) => item.value === selectedBankName,
    );
    const bankCode = selectedBank?.code;
    if (modal.data) {
      await updateBankDetail({
        variables: {
          bankDetails: { ...data, bankCode },
          bankID: modal.data,
        },
      });

      return;
    } else {
      await createBankDetail({
        variables: {
          bankDetails: { ...data, bankCode },
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
          <div className=" flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <div className="grid gap-2 md:gap-4">
            <SelectField
              control={form.control}
              label="Bank Name"
              name="bankName"
              placeholder="First Bank"
              items={items}
            />
            <InputField
              // disabled={accountNumber.length === 10}
              control={form.control}
              name="accountNumber"
              label="Account Number"
              placeholder="023333398"
            />
            <InputField
              loading={resolveLoading}
              control={form.control}
              name="accountName"
              label="Account Name"
              placeholder={
                resolveLoading ? "Resolving account..." : "Account Name"
              }
              // disabled={resolveLoading || !!resolveData}
            />
          </div>
        )}

        <CustomButton
          loading={loading || updateLoading}
          type="submit"
          className="bg-primary text-white px-7 md:py-6 rounded-[0.625rem] text-base "
        >
          {modal.data ? "Edit" : "Add"}
        </CustomButton>
      </form>
    </Form>
  );
};

export default PaymentForm;
