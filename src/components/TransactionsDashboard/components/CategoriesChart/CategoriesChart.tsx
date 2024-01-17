import React from "react";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import { PieChartUtils } from "../../../../utils";

type CategoriesChartProps = {
  categoriesTotalAmount: Record<string, number>;
};

const CategoriesChart = ({ categoriesTotalAmount }: CategoriesChartProps) => {
  const chartData = PieChartUtils.getChartData(categoriesTotalAmount);
  const chartColors = PieChartUtils.getChartColors(categoriesTotalAmount);

  return (
    <ResponsiveContainer width="100%" height={180}>
      <PieChart>
        <Legend
          iconType="circle"
          align="right"
          layout="vertical"
          verticalAlign="middle"
        />
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
