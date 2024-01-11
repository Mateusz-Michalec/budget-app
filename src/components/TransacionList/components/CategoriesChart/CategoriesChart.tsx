import React from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Transaction } from "../../../../features/accounts/accountsSlice";
import { PieChartUtils, TransactionsUtils } from "../../../../utils";

type CategoriesChartProps = {
  transactions: Transaction[];
};

const CategoriesChart = ({ transactions }: CategoriesChartProps) => {
  const categoriesTotalAmount =
    TransactionsUtils.getCategoriesTotalAmount(transactions);
  const chartData = PieChartUtils.getChartData(categoriesTotalAmount);
  const chartColors = PieChartUtils.getChartColors(categoriesTotalAmount);

  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart margin={{ top: -10 }}>
        <Legend iconType="circle" />
        <Pie
          isAnimationActive={false}
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={PieChartUtils.renderCustomizedLabel}
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
    </ResponsiveContainer>
  );
};

export default CategoriesChart;
