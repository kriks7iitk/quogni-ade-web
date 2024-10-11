import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default function Chart({ chartData, height }) {
  const dataChart = chartData.map((item) => {
    return {
      x: new Date(item.Date),
      y: [item.open, item.high, item.low, item.close],
    };
  });
  const lineData = chartData.map((item) => {
    return {
      x: new Date(item.Date),
      y: item.open,
    };
  });

  const chartSeries = [
    { data: dataChart, type: 'candlestick', name: 'candle' },
    // { data: lineData, type: 'line', name: 'line' },
  ];

  const options = {
    chart: {
      type: 'candlestick',
      height: 350,
    },
    // title: {
    //   text: 'CandleStick Chart',
    //   align: 'bottom',
    // },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        formatter: (value) => {
          return value.toFixed(2); // Format y-axis values with 2 decimal places
        },
      },
    },
  };
  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={chartSeries}
        type="candlestick"
        height={height}
      />
    </div>
  );
}
