import AddProductForm from "@/components/organisms/form/addProduct.form";
import { ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router";

const AddProduct = () => {
  const { pathname } = useLocation();
  const singleProduct: string = pathname.split("/")[2];
  const path = singleProduct !== "new";
  return (
    <div className=" space-y-10">
      <Link to={".."} className="inline-flex items-center gap-2.5">
        <ArrowLeft size={20} color="#696572" />
        <h4 className="font-family-satoshi text-text-secondary text-base font-medium">
          {path ? "Edit Product" : "Add New Product"}
        </h4>
      </Link>
      <AddProductForm />
    </div>
  );
};
export default AddProduct;
