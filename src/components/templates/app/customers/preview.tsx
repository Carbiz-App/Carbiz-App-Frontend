import { Link } from "react-router";
import { ArrowLeft } from "iconsax-reactjs";
import OrderColumn, { OrderType } from "@/columns/orders.column";
import { DataTable } from "@/components/atoms/table";

import {products} from "@/assets/data/index.json"

const PreviewCustomer = () => {

    const productList: OrderType[] = [...products];

  return (
    <div className="space-y-10">
      <Link to={".."} className="inline-flex items-center gap-2.5">
        <ArrowLeft size={20} color="#696572" />
        <h4 className="font-family-satoshi text-text-secondary text-base font-medium">
          Customer Details
        </h4>
      </Link>

      <div className="bg-white rounded-xl p-10 border border-[#F5F5F6] grid grid-cols-5 font-family-satoshi gap-6">
        <div className="border-r border-border-gray py-5 space-y-2.5 px-2">
          <h6 className="font-normal font-family-satoshi text-sm text-text-secondary">
            Name
          </h6>
          <h3 className="font-semibold text-lg">Elizabeth Ali</h3>
        </div>

        <div className="border-r border-border-gray py-5 space-y-2.5 pl-6">
          <h6 className="font-normal font-family-satoshi text-sm text-text-secondary">
            Email
          </h6>
          <h3 className="font-semibold text-lg">elizabeth@gmail.com</h3>
        </div>

        <div className="border-r border-border-gray py-5 space-y-2.5 pl-6">
          <h6 className="font-normal font-family-satoshi text-sm text-text-secondary">
            Phone
          </h6>
          <h3 className="font-semibold text-lg">+2347098675432</h3>
        </div>
        <div className="border-r border-border-gray py-5 space-y-2.5 pl-6">
          <h6 className="font-normal font-family-satoshi text-sm text-text-secondary">
            Added on
          </h6>
          <h3 className="font-semibold text-lg">13-5-2025</h3>
        </div>
      </div>

      <DataTable tableName="Orders" columns={OrderColumn} data={productList}/>
    </div>
  );
};

export default PreviewCustomer;
