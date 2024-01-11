import React from "react";
import { TransactionsUtils } from "../../../../../utils";
import "./CategoriesStats.scss";

type CategoriesStatsProps = {
  categoriesTotalAmount: Record<string, number>;
};

const CategoriesStats = ({ categoriesTotalAmount }: CategoriesStatsProps) => {
  return (
    <section className="categories-stats">
      {Object.entries(categoriesTotalAmount).map(([category, totalAmount]) => {
        const icon = TransactionsUtils.getTransactionIcon(category);

        return (
          <div className="categories__category-summary" key={category}>
            <span
              style={{ backgroundColor: icon.bgColor }}
              className="u-icon-circle"
            >
              <i className={`bi bi-${icon.icon}`}></i>
            </span>
            <div>
              <p>{totalAmount}</p>
              <p>PLN</p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default CategoriesStats;
