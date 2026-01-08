import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDeleteProducts } from "@/queries/products";
import { useModal } from "@/store/useModal";
import { Info } from "@phosphor-icons/react";
import { PopoverClose } from "@radix-ui/react-popover";
import { Eye, PenLine, Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router";

export const ProductAction = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  const { modal, closeModal } = useModal();
  const { deleteProduct, loading: deleteLoading } = useDeleteProducts();

  const handleDelete = async () => {
    try {
      if (id)
        await deleteProduct({
          variables: { productID: id },
        });
    } catch (err) {
      console.log(err);
    } finally {
      closeModal();
    }
  };
  return (
    <Popover
      open={modal.open}
      onOpenChange={(open) => {
        if (!open) closeModal();
      }}
    >
      <div className=" font-normal">
        <Button variant={"ghost"} className=" p-4 border-r rounded-none">
          <Eye className=" text-3xl size-5 text-[#4F4C55]" />
        </Button>

        <Button
          onClick={() => navigate(`/products/${id}`)}
          variant={"ghost"}
          className=" p-4 border-r rounded-none"
        >
          <PenLine className=" text-3xl size-5 text-[#4F4C55]" />
        </Button>
        <PopoverTrigger asChild>
          <Button variant={"ghost"} className=" p-4 rounded-none">
            <Trash2Icon className=" text-3xl size-5 text-[#4F4C55]" />
          </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className=" min-w-max flex flex-col gap-3">
        <div className="flex items-center gap-1">
          <Info className=" size-6 text-primary" />
          <h3 className=" text-primary font-bold md:text-lg">
            Are you sure you want to Delete?
          </h3>
        </div>
        <div className="flex justify-end gap-2">
          <PopoverClose aria-label="close">
            <Button variant={"outline"}>No</Button>
          </PopoverClose>
          <Button
            disabled={deleteLoading}
            variant={"destructive"}
            onClick={handleDelete}
          >
            {deleteLoading ? "Loading..." : "Yes"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
