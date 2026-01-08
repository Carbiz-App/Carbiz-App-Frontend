"use client";

import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDrawerStore } from "@/store/drawer.store";
// import PayoutDetails from "./PayoutDetails";
import { PayoutOutput } from "@/types/payoutOutput";

const PayoutActions = ({ payout }: { payout: PayoutOutput }) => {
  const { openModal } = useDrawerStore();

  const handleViewDetails = () => {
    openModal({
      type: "drawer",
      title: "Payout Details",
      // content: PayoutDetails,
      props: { payout },
      placement: "right",
    });
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4 text-gray-600" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={handleViewDetails}>
          View Details
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PayoutActions;
