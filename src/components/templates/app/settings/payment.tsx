import { FETCH_ALL_BANK_DETAILS } from "@/api/payments";
import { paymentColumn } from "@/columns/payments.column";
import { DataTable } from "@/components/atoms/table";
import PaymentForm from "@/components/organisms/form/payment.form";
import { usePaginatedQuery } from "@/hooks/usePagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/store/useModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Payment = () => {
  const { data, loading, message } = usePaginatedQuery({
    query: FETCH_ALL_BANK_DETAILS,
    pagination: {
      limit: 15,
      page: 1,
      sortBy: "createdAT",
      sortOrder: "DESC",
    },
    extractData: (res) => ({
      data: res?.MerchantFetchAllBankDetails?.payload?.data || [],
      total: res?.MerchantFetchAllBankDetails?.payload?.total || 0,
      message: res?.MerchantFetchAllBankDetails?.message,
    }),
  });
  const { modal, closeModal, openModal } = useModal();

  // React.useEffect(()=>{
  //   if (total){

  //   }
  // },[
  //  total
  // ])

  return (
    <>
      <Dialog open={modal.open} onOpenChange={closeModal}>
        <DataTable
          showSearch={false}
          columns={paymentColumn()}
          tableKey="payments"
          data={data}
          tableName="Payment Method"
          message={message}
          loading={loading}
          actions
        >
          <Button
            onClick={() => openModal({})}
            variant="default"
            className="md:py-6  border-0 shadow text-sm sm:text-sm md:text-[14px] font-bold "
          >
            <Plus className="size-4 md:size-7" />
            Add Bank
          </Button>
        </DataTable>

        <DialogContent className=" md:!max-w-md">
          <DialogHeader>
            <DialogTitle>{modal.data ? "Edit Bank" : "Add Bank"}</DialogTitle>
          </DialogHeader>
          <PaymentForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Payment;
