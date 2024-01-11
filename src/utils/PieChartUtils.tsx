import { FunctionComponent } from "react";
import TransactionsUtils, { CategoriesTotalAmount } from "./TransactionsUtils";
import { PieLabelRenderProps } from "recharts";

const getChartData = (categoriesTotalAmount: CategoriesTotalAmount) =>
  Object.entries(categoriesTotalAmount).map(([category, totalAmount]) => ({
    name: category,
    value: totalAmount,
  }));

const getChartColors = (categoriesTotalAmount: CategoriesTotalAmount) =>
  Object.keys(categoriesTotalAmount).map((category) =>
    TransactionsUtils.getCategoryColor(category)
  );

// label
const RADIAN = Math.PI / 180;
const renderCustomizedLabel: FunctionComponent<PieLabelRenderProps> = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius =
    Number(innerRadius) + (Number(outerRadius) - Number(innerRadius)) * 0.5;
  const x = Number(cx) + radius * Math.cos(-midAngle * RADIAN);
  const y = Number(cy) + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > Number(cx) ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent! * 100).toFixed(0)}%`}
    </text>
  );
};

export default { getChartData, getChartColors, renderCustomizedLabel };
