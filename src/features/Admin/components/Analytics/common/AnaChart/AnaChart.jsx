import React from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { ArcElement, Tooltip, Title, Legend } from "chart.js";
import { Doughnut, Bar, Line } from "react-chartjs-2";

Chart.register(ArcElement, Tooltip, Title, Legend, ChartDataLabels);

function AnaChart(props) {
  const { data, options, type } = props;
  return (
    <>
      {type === "doughnut" && (
        <Doughnut className="mt-3" data={data} options={options} />
      )}
      {type === "line" && (
        <Line className="mt-3" data={data} options={options} />
      )}
    </>
  );
}

export default AnaChart;
