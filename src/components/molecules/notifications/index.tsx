import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { useModal } from "@/store/useModal";
import { Content } from "./content";

export const AppNotifcations = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { modal, closeModal } = useModal();

  return (
    <Popover
      open={modal.type === "popover" && modal.open}
      onOpenChange={(open) => !open && closeModal()}
    >
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      {/* <Content /> */}
      <Content />
    </Popover>
  );
};
