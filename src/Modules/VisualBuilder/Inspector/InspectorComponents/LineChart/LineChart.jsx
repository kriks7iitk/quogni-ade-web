import React, { useState, useEffect } from 'react';
import { ChartCanvas, Chart } from 'react-stockcharts';
import { XAxis, YAxis } from 'react-stockcharts/lib/axes';
import {
  LineSeries,
  ScatterSeries,
  CircleMarker,
} from 'react-stockcharts/lib/series';
import {
  MouseCoordinateX,
  MouseCoordinateY,
} from 'react-stockcharts/lib/coordinates';
import { discontinuousTimeScaleProvider } from 'react-stockcharts/lib/scale';
import { fitWidth } from 'react-stockcharts/lib/helper';
import { timeFormat } from 'd3-time-format';
import { format } from 'd3-format';
import StrategyTriggerMarker from '../Candlestick/StrategyTriggerMarker';
import { Annotate } from 'react-stockcharts/lib/annotation';

const LineChart = ({
  data,
  width,
  height,
  ratio = window.devicePixelRatio || 1,
}) => {
  if (!data || data.length === 0) {
    return <div>No data to display</div>;
  }

  useEffect(() => {
    console.log('Chart rerendered');
  }, [data]);

  const formattedData = data.map((d) => ({
    date: new Date(d.Date),
    close: d.close,
    signal: d.signal,
    high: d.high,
  }));

  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
    (d) => d.date,
  );
  const {
    data: chartData,
    xScale,
    xAccessor,
    displayXAccessor,
  } = xScaleProvider(formattedData);

  if (chartData.length === 0) {
    return <div>No data available for the chart</div>;
  }

  const INITIAL_VISIBLE_POINTS = 30;

  const initialStartIndex = Math.max(
    chartData.length - INITIAL_VISIBLE_POINTS,
    0,
  );
  const initialEndIndex = chartData.length - 1;


  const initialXExtents = [
    xAccessor(chartData[initialStartIndex]),
    xAccessor(chartData[initialEndIndex]),
  ];


  return (
    <ChartCanvas
      height={(height * 2) / 3}
      width={width}
      ratio={ratio}
      margin={{ left: 50, right: 20, top: 30, bottom: 40 }}
      seriesName="LineChart"
      data={chartData}
      xScale={xScale}
      xAccessor={xAccessor}
      displayXAccessor={displayXAccessor}
      xExtents={initialXExtents}
      maintainZoomLevelOnResize={true} 
      mouseMoveEvent={true} 
      panEvent={true} 
      zoomEvent={true}
      clamp={true}
    >
      <Chart id={1} yExtents={(d) => [d.close]}>
        {/* X and Y Axes */}
        <XAxis axisAt="bottom" orient="bottom" />
        <YAxis axisAt="left" orient="left" />

        {/* Mouse Coordinates */}
        <MouseCoordinateX
          at="bottom"
          orient="bottom"
          displayFormat={timeFormat('%Y-%m-%d')}
        />
        <MouseCoordinateY
          at="left"
          orient="left"
          displayFormat={format('.2f')}
        />

        {/* Line Series to display the line */}
        <LineSeries yAccessor={(d) => d.close} stroke="#4A90E2" />

        {/* Scatter Series to show points */}
        <ScatterSeries
          yAccessor={(d) => d.close}
          marker={CircleMarker}
          markerProps={{ r: 3, fill: '#ff7f0e' }} 
        />
      </Chart>
    </ChartCanvas>
  );
};

export default LineChart;
