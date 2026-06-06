import AddProductForm from "@/components/organisms/form/addProduct.form";
import { Badge } from "@/components/ui/badge";
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
  useFetchProduct,
  useUnarchiveProduct,
} from "@/queries/products";
import { Archive } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

const AddProduct = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const singleProduct: string = pathname.split("/")[2];
  const isEdit = singleProduct !== "new";
  const [archiveOpen, setArchiveOpen] = useState(false);

  const { data: productData } = useFetchProduct(isEdit ? singleProduct : "");
  const payload = productData?.fetchOneProduct?.payload;
  const isArchived = payload?.isArchived === true;

  const { archiveProduct, loading: archiveLoading } = useArchiveProduct(() => {
    setArchiveOpen(false);
    navigate("/products");
  });

  const { unarchiveProduct, loading: unarchiveLoading } = useUnarchiveProduct(
    () => navigate("/products"),
  );

  const handleArchive = () => {
    if (!singleProduct) return;
    archiveProduct({ variables: { productID: singleProduct } });
  };

  const handleUnarchive = () => {
    if (!singleProduct) return;
    unarchiveProduct({ variables: { productID: singleProduct } });
  };

  return (
    <div className=" space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link to={".."} className="inline-flex items-center gap-2.5">
          <ArrowLeft size={20} color="#696572" />
          <h4 className="font-family-satoshi text-text-secondary text-base font-medium">
            {isEdit ? "Edit Product" : "Add New Product"}
          </h4>
          {isEdit && isArchived && (
            <Badge className="bg-amber-100 text-amber-800 uppercase">
              Archived
            </Badge>
          )}
        </Link>

        {isEdit && !isArchived && (
          <Button
            type="button"
            variant="outline"
            onClick={() => setArchiveOpen(true)}
            className="gap-2"
          >
            <Archive className="size-4" />
            Archive product
          </Button>
        )}
      </div>

      <AddProductForm
        isArchived={isArchived}
        onUnarchive={isArchived ? handleUnarchive : undefined}
        unarchiveLoading={unarchiveLoading}
      />

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
                  {typeof payload?.productName === "string" &&
                    payload.productName && (
                      <>
                        {" "}
                        You are about to archive{" "}
                        <span className="font-medium text-[#1A191C]">
                          {payload.productName}
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
    </div>
  );
};
export default AddProduct;
