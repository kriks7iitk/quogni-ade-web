import React from "react";
import { ChartCanvas, Chart } from "react-stockcharts";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import { CandlestickSeries } from "react-stockcharts/lib/series";
import { MouseCoordinateX, MouseCoordinateY } from "react-stockcharts/lib/coordinates";
import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { fitWidth } from "react-stockcharts/lib/helper";
import { timeFormat } from "d3-time-format";
import { format } from "d3-format";
import { Annotate } from "react-stockcharts/lib/annotation";
import  StrategyTriggerMarker from "./StrategyTriggerMarker";

const CandlestickChart = ({ data, width, ratio=window.devicePixelRatio || 1, height }) => {
 

  if (!data || data.length === 0) {
    return <div>No data to display</div>;
  }


  const formattedData = data
    .filter((d) => d.Date && d.Open && d.High && d.Low && d.Close && d.Volume) 
    .map((d) => ({
      date: new Date(d.Date), 
      open: d.Open,
      high: d.High,
      low: d.Low,
      close: d.Close,
      volume: d.Volume,
    }));


  if (formattedData.length === 0) {
    return <div>No valid data points to display</div>;
  }


  const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor((d) => d.date);
  const { data: chartData, xScale, xAccessor, displayXAccessor } = xScaleProvider(formattedData);

  if (chartData.length === 0) {
    return <div>No data available for the chart</div>;
  }

  const start = xAccessor(chartData[0]);
  const end = xAccessor(chartData[chartData.length - 1]);
  const xExtents = [start, end];

 
  const strategyTriggerIndex = 10;
  const strategyTriggerDate = chartData[strategyTriggerIndex]?.date; 

  return (
    <ChartCanvas
      height={height}
      width={width}
      ratio={ratio}
      margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
      seriesName="Candlestick"
      data={chartData}
      xScale={xScale}
      xAccessor={xAccessor}
      displayXAccessor={displayXAccessor}
      xExtents={xExtents}
    >
      <Chart id={1} yExtents={(d) => [d.high, d.low]}>
        {/* X and Y Axis */}
        <XAxis axisAt="bottom" orient="bottom" />
        <YAxis axisAt="left" orient="left" />

        {/* Mouse Coordinates */}
        <MouseCoordinateX at="bottom" orient="bottom" displayFormat={timeFormat("%Y-%m-%d")} />
        <MouseCoordinateY at="left" orient="left" displayFormat={format(".2f")} />

        {/* Candlestick Series */}
        <CandlestickSeries />

        {/* Strategy Trigger Annotation */}
        {strategyTriggerDate && (
           <Annotate
           with={StrategyTriggerMarker}
           when={(d) => {
             console.log(
               "Checking date:",
               d.date,
               "Trigger Date:",
               strategyTriggerDate
             );
             return d.date.getTime() === strategyTriggerDate.getTime();
           }}
           usingProps={{
             xAccessor: xAccessor,
             yAccessor: (d) => d.high,
           }}
         />
        )}
      </Chart>
    </ChartCanvas>
  );
};



export default CandlestickChart;