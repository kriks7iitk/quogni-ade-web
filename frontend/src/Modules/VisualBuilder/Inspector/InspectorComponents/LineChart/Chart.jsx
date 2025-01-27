import React, { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Nifty50 } from '../../../../../assets/nifty_data';

import { fetchIndex } from '../../../../../_stores/right-drawer.reducer';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '@mui/material';

export default function Chart({ chartData, height }) {
  const data = useSelector((state) => state.rightDrawerData.data);
  const indexData = useSelector(
    (state) => state.rightDrawerData.data?.indexData,
  );
  const selectedStock = useSelector(
    (state) => state.rightDrawerData?.selectedStock,
  );
  const stockData = useSelector(
    (state) => state.rightDrawerData.data?.stockData,
  );

  const loading = useSelector((state) => state.rightDrawerData.loading);
  const dataChart = stockData
    ? stockData.map((item) => {
        return {
          x: new Date(item.Date),
          y: [item.Open, item.High, item.Low, item.Close],
        };
      })
    : [];
  const lineData = indexData
    ? indexData.map((item) => {
        return {
          x: new Date(item.Date),
          y: (item.Open / indexData[0].Open - 1) * 100,
        };
      })
    : [];
  const stockLineData = stockData
    ? stockData.map((item) => {
        return {
          x: new Date(item.Date),
          y: (item.Open / stockData[0].Open - 1) * 100,
        };
      })
    : [];


  const chartSeries = [
    {
      data: lineData,
      type: 'line',
      name: 'Nifty50',
      color: '#B45309',
    },
  ];

  // Check if stockLineData exists and is not empty
  if (stockLineData && stockLineData.length > 0) {
    chartSeries.push({
      data: stockLineData,
      type: 'line',
      name: selectedStock,
      color: '#000b50',
    });
  }

  const options = {
    chart: {
      type: 'candlestick',
      height: 350,
    },
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
    <>
      <div className="legends">
        <div className="heading">
          Chart between % changes in Nifty50 and % change in {selectedStock}
        </div>
        <div className="legend-mark">
          <div className="nifty">Nifty50</div>
          <div className="stock">{selectedStock}</div>
        </div>
      </div>
      <div id="chart">
        {!loading && (
          <ReactApexChart
            options={options}
            series={chartSeries}
            type="candlestick"
            height={height - 80}
          />
        )}
      </div>
    </>
  );
}
