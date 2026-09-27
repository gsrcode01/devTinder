import React from "react";
import DevTinderLogo from "./DevTinderLogo";

const BrandLogo = ({
  size = "md",
  showSubtitle = false,
  animated = true,
  className = "",
}) => {
  const sizeMap = {
    sm: { width: 175, height: 48 },
    md: { width: 230, height: 60 },
    lg: { width: 330, height: 85 },
    xl: { width: 420, height: 100 },
  };

  const { width, height } = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      <DevTinderLogo
        width={width}
        height={height}
        showTagline={showSubtitle}
        animated={animated}
      />
    </div>
  );
};

export default BrandLogo;
