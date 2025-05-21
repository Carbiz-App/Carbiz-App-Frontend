import { FETCH_ALL_BANK_DETAILS } from "@/api/payments";
import { paymentColumn } from "@/columns/payments.column";
import { DataTable } from "@/components/atoms/table";
import PaymentForm from "@/components/organisms/form/payment.form";
import { usePagination } from "@/hooks/usePagination";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Payment = () => {
  const { data, total, loading, pagination, setPage, refetch, message } =
    usePagination({
      query: FETCH_ALL_BANK_DETAILS,
      paginationDefaults: {
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

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DataTable
          columns={paymentColumn({ refetch })}
          data={data}
          tableName="Payment Method"
          message={message}
          loading={loading}
          total={total}
          pageIndex={pagination.page - 1}
          pageSize={pagination.limit}
          onPageChange={(index) => setPage(index + 1)}
          payment
          onButtonClick={() => setOpenDialog(true)}
        />

        <DialogContent className=" md:!max-w-md">
          <DialogHeader>
            <DialogTitle>Add Bank</DialogTitle>
          </DialogHeader>
          <PaymentForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Payment;
