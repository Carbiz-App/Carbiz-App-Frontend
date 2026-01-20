import { Check } from "@phosphor-icons/react";
import CustomButton from "../button/CustomButton";
import { Spinner } from "@/components/ui/spinner";
import { Control, useController } from "react-hook-form";
import { useEffect, useMemo, useRef, useState } from "react";
import { FETCH_PRODUCT_CATEGORIES } from "@/api/product";
import { usePaginatedQuery } from "@/hooks/usePagination";
import { useTableState } from "@/hooks/useTableState";

type Option = {
  label: string;
  value: string;
};

interface SearchableSelectProps {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  options: Option[];
  loading?: boolean;
  searchable?: boolean;
  onSearch?: (value: string) => void;
  onFetchMore?: () => void;
  hasMore?: boolean;
}

const CustomSelect: React.FC<SearchableSelectProps> = ({
  name,
  control,
  label,
  placeholder = "Select a category",
  options,
  onFetchMore,
  hasMore = false,
  loading = false,
}) => {
  const {
    field: { value, onChange },
  } = useController({ name, control });

  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync selected value → input text
  useEffect(() => {
    const selected = options.find((o) => o.value === value);
    if (selected) {
      setInputValue(selected.label);
    }
  }, [value, options]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (option: Option) => {
    onChange(option.value);
    setInputValue(option.label);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full flex flex-col gap-2.5">
      {label && (
        <label className="text-sm lg:text-base text-primary-dark font-medium">
          {label}
        </label>
      )}

      <input
        value={inputValue}
        placeholder={placeholder}
        onFocus={() => setOpen(true)}
        // disabled={true}
        className="w-full rounded-lg border px-3 py-3 text-sm outline-none focus:border-primary transition-colors duration-300 cursor-pointer"
      />

      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-primary bg-white shadow-md max-h-64 overflow-auto p-2 transition-colors duration-300">
          {loading && (
            <div className=" w-full flex items-center justify-center">
              <Spinner className="text-primary size-10" />
            </div>
          )}

          {!loading && options.length === 0 && (
            <div className="p-3 text-sm text-muted-foreground">
              No results found
            </div>
          )}

          {options?.map((option) => {
            const selected = option.value === value;
            return (
              <div
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`capitalize flex items-center justify-between px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                  selected ? "bg-gray-50 font-medium rounded-lg" : ""
                }`}
              >
                <span>{option.label?.replaceAll("-", " ")}</span>
                {selected && <Check size={16} weight="bold" />}
              </div>
            );
          })}

          {hasMore && (
            <CustomButton
              type="button"
              onClick={onFetchMore}
              className="w-full border-t px-3 py-2 text-sm text-primary hover:bg-gray-50"
            >
              Load more
            </CustomButton>
          )}
        </div>
      )}
    </div>
  );
};

export const ProductCategorySelect = ({
  control,
}: {
  control: Control<any>;
}) => {
  const { currentPage, pageSize } = useTableState("category");
  const { data, fetchMore, loading, total } = usePaginatedQuery({
    query: FETCH_PRODUCT_CATEGORIES,
    pagination: {
      page: currentPage,
      limit: pageSize,
      sortOrder: "DESC",
    },
    extractData: (res) => ({
      data: res?.fetchallProductCategoriesMerchant?.payload?.data || [],
      total: res?.fetchallProductCategoriesMerchant?.payload?.total || 0,
    }),
  });

  const options = useMemo(() => {
    return (
      data?.map((i) => ({
        label: i?.productCategoryName,
        value: i?.productCategoryID,
      })) ?? []
    );
  }, [data]);

  return (
    <CustomSelect
      name="productCategory"
      control={control}
      label="Product Category"
      options={options}
      onFetchMore={() =>
        fetchMore({
          variables: {
            paginationQuery: {
              page: currentPage + 1,
              limit: pageSize,
            },
          },
        })
      }
      hasMore={data.length < total}
      loading={loading}
    />
  );
};
