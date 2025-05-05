import { ImagePlus } from "lucide-react";

const Uploader = () => {
  return (
    <div className=" rounded border border-dashed m-5 flex items-center justify-center flex-col p-6">
      <ImagePlus className=" text-primary mb-3.5" />
      <h3 className="text-primary font-[700]">
        Click to Upload{" "}
        <span className="text-black font-normal">or drag and drop</span>
      </h3>
      <p className="text-[#A990DD] text-xs">PNG, JPG or GIF (max. 800x400px)</p>
    </div>
  );
};
export default Uploader;
