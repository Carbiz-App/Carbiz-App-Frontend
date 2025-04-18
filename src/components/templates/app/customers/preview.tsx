
import { Link } from "react-router";
import { ArrowLeft } from "iconsax-reactjs";
import OrderColumn, { OrderType } from "@/columns/orders.column";
import { DataTable } from "@/components/atoms/table";

import { products } from "@/assets/data/index.json";
import { CardDetail } from "@/components/atoms/card/previewCard";

type details = {
  title: string;
  value: string;
};

const PreviewCustomer = () => {
  const productList: OrderType[] = [...products];
  const itemDetails: details[] = [
    { title: "Name", value: "Elizabeth Ali" },
    { title: "Email", value: "elizabeth@gmail.com" },
    { title: "Phone", value: "+2347098675432" },
    { title: "Added on", value: "13-5-2025" },
  ];

  return (
    <div className="space-y-10">
      <Link to={".."} className="inline-flex items-center gap-2.5">
        <ArrowLeft size={20} color="#696572" />
        <h4 className="font-family-satoshi text-text-secondary text-base font-medium">
          Customer Details
        </h4>
      </Link>

      <div className="bg-white rounded-xl p-10 border border-[#F5F5F6] flex font-family-satoshi gap-6">
        {itemDetails.map(
          ({ title, value }: { title: string; value: string }) => (
            <CardDetail
              key={title}
              title={title}
              value={value}
              isLast={title === itemDetails[itemDetails.length - 1].title}
            />
          )
        )}
      </div>

      <DataTable tableName="Orders" columns={OrderColumn} data={productList} />
    </div>
  );
};

export default PreviewCustomer;
