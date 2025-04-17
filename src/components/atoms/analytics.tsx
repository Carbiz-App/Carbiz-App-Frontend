import { Icon } from "iconsax-reactjs";
import React from "react";

interface AnalyticsProp {
  icon?: Icon;
  title: string;
  value?: number | string;
  isCurrency?: boolean;
  iconColor?: string;
}

const Analytics: React.FC<AnalyticsProp> = ({
  title,
  icon: Icon,
  value,
  isCurrency = false,
  iconColor
}) => {
  return (
    <div className="bg-white border-border-gray px-6 py-10 flex flex-col gap-4 rounded-lg">
      <div className="inline-flex gap-2.5">
        <span className={`bg-[]/10`}>{Icon && <Icon size={16} color={iconColor}/>}</span>
        <h4 className="text-base font-family-satoshi">{title}</h4>
      </div>
      <h3 className="text-3xl text-text-primary font-medium font-family-satoshi">
        {isCurrency
          ? `N${value?.toLocaleString()}`
          : value?.toLocaleString("en-US")}
      </h3>
    </div>
  );
};

export default Analytics;
