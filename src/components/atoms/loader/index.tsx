import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

const Loader = ({ className, size }: { className?: string; size?: string }) => {
  return (
    <div className={cn("text-primary", className)}>
      <Spinner className={cn(size)} />
    </div>
  );
};

export default Loader;
