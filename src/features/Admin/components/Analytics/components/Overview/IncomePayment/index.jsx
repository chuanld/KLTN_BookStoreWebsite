import React from "react";
import AnaChart from "../../../common/AnaChart/AnaChart";

function IncomePayment(props) {
  const { paymentType } = props;
  const test = 100;
  const total = paymentType.COD + paymentType.Paypal;
  const catePaymentPie = {
    labels: [
      "COD " + "(" + Math.round((paymentType.COD / total) * 100) + "%)",
      "PayPal " + "(" + Math.round((paymentType.Paypal / total) * 100) + "%)",
    ],
    datasets: [
      {
        label: "Doanh thu",
        data: [paymentType?.COD, paymentType?.Paypal],
        // backgroundColor: ["rgba(230, 99, 132, 1)", "rgba(180, 99, 132, 1)"],
        // borderColor: ["rgba(230, 99, 132, 1)", "rgba(180, 99, 132, 1)"],
        backgroundColor: CSS_COLOR_NAMES,
        borderColor: CSS_COLOR_NAMES,

        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      datalabels: {
        color: "black",
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
        <span>Type Payment</span>
      </div>
      <div className="chart-canvas chart-canvas-payment">
        {/* <Doughnut className="mt-3" data={catePaymentPie} options={options} /> */}
        {/* <AnaChart data={catePaymentPie} options={options} type="doughnut" /> */}
        <AnaChart data={catePaymentPie} options={options} type="doughnut" />
      </div>
    </>
  );
}

const CSS_COLOR_NAMES = [
  // "AliceBlue",

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
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
];

export default IncomePayment;
