type CardDetailProps = { title: string; value: string; isLast?: boolean };

export const CardDetail = ({ title, value, isLast }: CardDetailProps) => {
  return (
    <div
      className={` w-max md:min-w-42 flex flex-col gap-1 pr-14  ${
        isLast ? "" : "border-r "
      } border-[#E6E5E8]`}
    >
      <p className=" text-[#837E8E] text-sm">{title}</p>
      <p className=" text-base font-black">{value}</p>
    </div>
  );
};
