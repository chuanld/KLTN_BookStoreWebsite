import React from 'react'
import { formatCurrency } from 'utils/Format'

import AnaChart from '../../../common/AnaChart/AnaChart'

function IncomeCate(props) {
  const { cate, totalPm } = props
  const labelsArr = JSON.parse(JSON.stringify(cate)) ?? []
  const labelsReduces = labelsArr.filter((x) => x.income > 0)

  const labelsMap = labelsReduces?.map(
    // (y) => console.log(`Name:${y.cateName} + value:${y.income}`)
    (y) =>
      y.cateName + '\n' + '( ' + Math.round((y.income / totalPm) * 100) + '% )'
  )

  const cateIncomePie = {
    labels: labelsMap,
    datasets: [
      {
        label: 'Doanh thu',
        data: labelsReduces?.map((x) => x.income),
        backgroundColor: CSS_COLOR_NAMES,
        borderColor: CSS_COLOR_NAMES,

        // borderColor: [
        //   "rgba(255, 99, 132, 1)",
        //   "rgba(54, 162, 235, 1)",
        //   "rgba(255, 206, 86, 1)",
        //   "rgba(75, 192, 192, 1)",
        //   "rgba(153, 102, 255, 1)",
        //   "rgba(255, 159, 64, 1)",
        // ],
        borderWidth: 1,
      },
    ],
    text: '23%',
  }

  const options = {
    plugins: {
      datalabels: {
        // color: "white",
        formatter: function (value, context) {
          // return context.dataset?.labels[context.dataIndex];
          // return context.chart.data.labels[context.dataIndex]
          if (Math.round((value / totalPm) * 100) < 10) {
            return null
          } else {
            return context.chart.data.labels[context.dataIndex]
          }
        },
        font: {
          weight: 'bold',
        },
        offset: 0,
        padding: 0,
        margin: 'auto',
        textAlign: 'center',
      },
      legend: {
        display: true,
        position: 'right',
        labels: {
          color: 'rgb(255, 99, 132)',
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
  }
  return (
    <>
      <div className="chart-item-title">
        <span>Total Revenue: {formatCurrency(totalPm)}</span>
      </div>
      <div className="chart-canvas chart-canvas-cate">
        {/* <Doughnut className="mt-3" data={cateIncomePie} options={options} /> */}
        <AnaChart data={cateIncomePie} options={options} type="doughnut" />
      </div>
    </>
  )
}
const CSS_COLOR_NAMES = [
  // "AliceBlue",
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(255, 119, 104, 0.2)',
  'rgba(240, 90, 124, 0.2)',
  // "rgba(220, 89, 144, 0.2)",
  'rgba(220, 60, 160, 0.2)',
  'rgba(240, 40, 180, 0.2)',
  'rgba(250, 30, 170, 0.2)',
  'rgba(252, 200, 160, 0.2)',
  'rgba(242, 10, 150, 0.2)',
]
export default IncomeCate
