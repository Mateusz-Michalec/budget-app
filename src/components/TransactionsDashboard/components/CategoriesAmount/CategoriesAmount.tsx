import React, { useEffect, useState } from "react";
import { TransactionsUtils } from "../../../../utils";
import "./CategoriesAmount.scss";
import { SortType } from "../../../../utils/TransactionsUtils";
import CategoryIcon from "../../../ui/CategoryIcon";

type CategoriesAmountProps = {
  categoriesTotalAmount: Record<string, number>;
};

const CategoriesAmount = ({ categoriesTotalAmount }: CategoriesAmountProps) => {
  const [sortType, setSortType] = useState<SortType>("desc");

  const [sortedCategoriesTotalAmount, setSortedCategoriesTotalAmount] =
    useState(
      TransactionsUtils.sortCategoriesTotalAmount(
        categoriesTotalAmount,
        sortType
      )
    );

  useEffect(() => {
    setSortedCategoriesTotalAmount(
      TransactionsUtils.sortCategoriesTotalAmount(
        categoriesTotalAmount,
        sortType
      )
    );
  }, [sortType]);

  return (
    <section className="categories-amount">
      <div className="categories-amount__sort-btns">
        <button
          className={`${sortType === "asc" ? "" : "u-muted"}`}
          onClick={() => setSortType("asc")}
          aria-label="sortowanie od najmniejszego do największego"
        >
          <i className="bi bi-sort-up"></i>
        </button>
        <button
          className={`${sortType === "desc" ? "" : "u-muted"}`}
          onClick={() => setSortType("desc")}
          aria-label="sortowanie od największego do najmniejszego"
        >
          <i className="bi bi-sort-down"></i>
        </button>
      </div>
      {Object.entries(sortedCategoriesTotalAmount).map(
        ([category, totalAmount]) => (
          <div className="categories-amount__category" key={category}>
            <CategoryIcon category={category} />
            <div>
              <p>{totalAmount}</p>
              <p>PLN</p>
            </div>
          </div>
        )
      )}
    </section>
  );
};

export default CategoriesAmount;
