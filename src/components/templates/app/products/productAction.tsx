import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteProducts } from "@/queries/products";
import { Warning } from "@phosphor-icons/react";
import { PenLine, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

type ProductActionProps = {
  productID: string;
  productName?: string;
};

export const ProductAction = ({
  productID,
  productName,
}: ProductActionProps) => {
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { deleteProduct, loading: deleteLoading } = useDeleteProducts(() =>
    setConfirmOpen(false),
  );

  const handleDelete = () => {
    if (!productID) return;
    deleteProduct({ variables: { productID } });
  };

  return (
    <>
      <div className="font-normal flex">
        <Button
          type="button"
          onClick={() => navigate(`/products/${productID}`)}
          variant="ghost"
          className="p-4 border-r rounded-none"
          aria-label="Edit product"
        >
          <PenLine className="text-3xl size-5 text-[#4F4C55]" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="p-4 rounded-none"
          aria-label="Delete product"
          disabled
          title="Delete product is currently unavailable"
          onClick={() => setConfirmOpen(true)}
        >
          <Trash2Icon className="text-3xl size-5 text-[#4F4C55]" />
        </Button>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-50">
                <Warning className="size-5 text-red-600" weight="fill" />
              </div>
              <div className="space-y-2 text-left">
                <DialogTitle>Delete this product?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. The product will be permanently
                  removed from your catalog.
                  {productName && (
                    <>
                      {" "}
                      You are about to delete{" "}
                      <span className="font-medium text-[#1A191C]">
                        {productName}
                      </span>
                      .
                    </>
                  )}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmOpen(false)}
              disabled={deleteLoading}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteLoading}
            >
              {deleteLoading ? "Deleting..." : "Delete product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
