import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";

interface PaginationProps {
  total: number;
  pageSize: number;
  currentPage: number; // 1-based
  onPageChange: (page: number) => void;
}

export function Pagination({
  total,
  pageSize,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const pageCount = Math.ceil(total / pageSize);

  const currentStart = (currentPage - 1) * pageSize + 1;
  const currentEnd = Math.min(currentPage * pageSize, total);

  const visiblePages = useMemo(() => {
    const siblingCount = 1;
    const totalNumbers = siblingCount * 2 + 5;

    if (pageCount <= totalNumbers) {
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    }

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, pageCount);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < pageCount - 1;

    if (!showLeftDots && showRightDots) {
      return [
        ...Array.from({ length: 3 + 2 * siblingCount }, (_, i) => i + 1),
        "...",
        pageCount,
      ];
    }

    if (showLeftDots && !showRightDots) {
      return [
        1,
        "...",
        ...Array.from(
          { length: 3 + 2 * siblingCount },
          (_, i) => pageCount - (4 - i)
        ),
      ];
    }

    return [
      1,
      "...",
      ...Array.from(
        { length: 2 * siblingCount + 1 },
        (_, i) => leftSibling + i
      ),
      "...",
      pageCount,
    ];
  }, [currentPage, pageCount]);

  if (pageCount <= 1) return null;

  return (
    <div className="flex items-center justify-between border-t p-5 md:p-8 w-full flex-wrap gap-2 my-2">
      <div className="text-muted-foreground md:text-base font-medium">
        Showing {currentStart}–{currentEnd} of {total}
      </div>

      <div className="flex items-center gap-2 justify-center">
        <Button
          variant="outline"
          size="lg"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Prev
        </Button>

        {visiblePages.map((page, i) =>
          page === "..." ? (
            <span key={i} className="px-2 text-muted-foreground">
              ...
            </span>
          ) : (
            <Button
              key={i}
              size="lg"
              variant={page === currentPage ? "outline" : "ghost"}
              onClick={() => onPageChange(page as number)}
              className={
                page === currentPage
                  ? "bg-[#F7F7F8] text-black"
                  : "text-[#74737D]"
              }
            >
              {page}
            </Button>
          )
        )}

        <Button
          variant="outline"
          size="lg"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === pageCount}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
