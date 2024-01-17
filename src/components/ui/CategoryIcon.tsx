import React from "react";
import TransactionsUtils from "../../utils/TransactionsUtils";

type CategoryIconProps = {
  category: string;
};

const CategoryIcon = ({ category }: CategoryIconProps) => {
  const icon = TransactionsUtils.getTransactionIcon(category);
  return (
    <span
      title={category}
      aria-label="kategoria"
      style={{ backgroundColor: icon.bgColor }}
      className="u-icon-circle"
    >
      <i className={`bi bi-${icon.icon}`}></i>
    </span>
  );
};

export default CategoryIcon;
