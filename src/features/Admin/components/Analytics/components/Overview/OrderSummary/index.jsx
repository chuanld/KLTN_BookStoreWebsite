import React from "react";
import AnaChart from "../../../common/AnaChart";

function OrderSummary({ orderSummary, totalOrd }) {
  const labelsArr = JSON.parse(JSON.stringify(orderSummary)) ?? [];
  const labelsReduces = labelsArr.filter((x) => x.count > 0);

  const labelsMap = labelsReduces?.map(
    (y) =>
      y.status + "\n" + "( " + Math.round((y.count / totalOrd) * 100) + "%)"
  );

  const orderStatusPie = {
    labels: labelsMap,
    datasets: [
      {
        label: "Doanh thu",
        data: labelsReduces?.map((x) => x.count),
        backgroundColor: CSS_COLOR_NAMES,
        borderColor: CSS_COLOR_NAMES,

        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        // color: "white",
        formatter: function (value, context) {
          // return context.dataset?.labels[context.dataIndex];
          return context.chart.data.labels[context.dataIndex];
        },
        font: {
          weight: "bold",
        },
        offset: 0,
        padding: 0,
        margin: "auto",
        textAlign: "center",
      },
      legend: {
        display: true,
        position: "right",
        labels: {
          color: "rgb(255, 99, 132)",
        },
      },
      aspectRatio: 3 / 2,
      cutoutPercentage: 8,
      layout: {
        padding: 16,
      },
      elements: {
        line: {
          fill: false,
          tension: 0.4,
        },
        point: {
          hoverRadius: 7,
          radius: 5,
        },
      },
    },
  };

  return (
    <>
      <div className="chart-item-title">
        <span>Order Summary</span>
      </div>
      <div className="chart-canvas chart-canvas-orderstt">
        {/* <Doughnut className="mt-3" data={cateIncomePie} options={options} /> */}
        <AnaChart data={orderStatusPie} options={options} type="doughnut" />
      </div>
    </>
  );
}
const CSS_COLOR_NAMES = [
  // "AliceBlue",
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
  "rgba(255, 119, 104, 0.2)",
  "rgba(240, 90, 124, 0.2)",
  // "rgba(220, 89, 144, 0.2)",
  "rgba(220, 60, 160, 0.2)",
  "rgba(240, 40, 180, 0.2)",
  "rgba(250, 30, 170, 0.2)",
  "rgba(252, 200, 160, 0.2)",
  "rgba(242, 10, 150, 0.2)",
];
export default OrderSummary;
