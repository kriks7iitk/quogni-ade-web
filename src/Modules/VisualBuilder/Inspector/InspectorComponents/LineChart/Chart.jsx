import React from 'react';
import ReactApexChart from 'react-apexcharts';

export default function Chart({ chartData, height }) {
  console.log('height is ', height);

  const data = chartData.map((item) => {
    return {
      x: new Date(item.Date),
      y: [item.open, item.high, item.low, item.close],
    };
  });
  const chartSeries = [{ data }];
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
