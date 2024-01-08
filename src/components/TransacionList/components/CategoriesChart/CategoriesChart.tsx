import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Transaction } from "../../../../features/accounts/accountsSlice";
import { TransactionsUtils } from "../../../../utils";

type CategoriesChartProps = {
  transactions: Transaction[];
};

const CategoriesChart = ({ transactions }: CategoriesChartProps) => {
  const categoriesTotalAmount =
    TransactionsUtils.getCategoriesTotalAmount(transactions);

  console.log(categoriesTotalAmount);

  const chartData = Object.entries(categoriesTotalAmount).map(
    ([category, totalAmount]) => {
      return {
        name: category,
        value: totalAmount,
      };
    }
  );

  const chartColors = Object.entries(categoriesTotalAmount).map(([category]) =>
    TransactionsUtils.getCategoryColor(category)
  );

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={chartData}
        cx={200}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
      >
        {chartData.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={chartColors[index % chartColors.length]}
          />
        ))}
      </Pie>
    </PieChart>
  );
};

export default CategoriesChart;
