import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  useArchiveProduct,
  useDeleteProducts,
  useUnarchiveProduct,
} from "@/queries/products";
import { Warning } from "@phosphor-icons/react";
import { Archive, ArchiveRestore, PenLine, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

type ProductActionProps = {
  productID: string;
  productName?: string;
  variant?: "active" | "archived";
};

export const ProductAction = ({
  productID,
  productName,
  variant = "active",
}: ProductActionProps) => {
  const navigate = useNavigate();
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [unarchiveOpen, setUnarchiveOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { archiveProduct, loading: archiveLoading } = useArchiveProduct(() =>
    setArchiveOpen(false),
  );
  const { unarchiveProduct, loading: unarchiveLoading } = useUnarchiveProduct(
    () => setUnarchiveOpen(false),
  );
  const { deleteProduct, loading: deleteLoading } = useDeleteProducts(() =>
    setDeleteOpen(false),
  );

  const handleArchive = () => {
    if (!productID) return;
    archiveProduct({ variables: { productID } });
  };

  const handleUnarchive = () => {
    if (!productID) return;
    unarchiveProduct({ variables: { productID } });
  };

  const handleDelete = () => {
    if (!productID) return;
    deleteProduct({ variables: { productID } });
  };

  if (variant === "archived") {
    return (
      <>
        <div className="font-normal flex">
          <Button
            type="button"
            variant="ghost"
            className="p-4 border-r rounded-none"
            aria-label="Unarchive product"
            onClick={() => setUnarchiveOpen(true)}
          >
            <ArchiveRestore className="text-3xl size-5 text-[#4F4C55]" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="p-4 rounded-none"
            aria-label="Delete product"
            disabled
            title="Delete product is currently unavailable"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2Icon className="text-3xl size-5 text-[#4F4C55]" />
          </Button>
        </div>

        <Dialog open={unarchiveOpen} onOpenChange={setUnarchiveOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-green-50">
                  <ArchiveRestore className="size-5 text-green-600" />
                </div>
                <div className="space-y-2 text-left">
                  <DialogTitle>Restore this product?</DialogTitle>
                  <DialogDescription>
                    This product will be visible again in the customer app and
                    moved back to your active products list.
                    {productName && (
                      <>
                        {" "}
                        You are about to restore{" "}
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
                onClick={() => setUnarchiveOpen(false)}
                disabled={unarchiveLoading}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleUnarchive}
                disabled={unarchiveLoading}
              >
                {unarchiveLoading ? "Restoring..." : "Unarchive product"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-red-50">
                  <Warning className="size-5 text-red-600" weight="fill" />
                </div>
                <div className="space-y-2 text-left">
                  <DialogTitle>Delete this product?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. The product will be
                    permanently removed from your catalog.
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
                onClick={() => setDeleteOpen(false)}
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
  }

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
          aria-label="Archive product"
          onClick={() => setArchiveOpen(true)}
        >
          <Archive className="text-3xl size-5 text-[#4F4C55]" />
        </Button>
      </div>

      <Dialog open={archiveOpen} onOpenChange={setArchiveOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-50">
                <Archive className="size-5 text-amber-600" />
              </div>
              <div className="space-y-2 text-left">
                <DialogTitle>Archive this product?</DialogTitle>
                <DialogDescription>
                  This product will be hidden from the customer app. Existing
                  orders are not affected. You can restore it anytime from
                  Archived products.
                  {productName && (
                    <>
                      {" "}
                      You are about to archive{" "}
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
              onClick={() => setArchiveOpen(false)}
              disabled={archiveLoading}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleArchive}
              disabled={archiveLoading}
            >
              {archiveLoading ? "Archiving..." : "Archive product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
