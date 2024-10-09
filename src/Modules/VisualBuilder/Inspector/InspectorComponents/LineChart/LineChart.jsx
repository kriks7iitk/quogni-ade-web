import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import React from 'react';
import {
  elderRay,
  ema,
  discontinuousTimeScaleProviderBuilder,
  Chart,
  ChartCanvas,
  CurrentCoordinate,
  BarSeries,
  CandlestickSeries,
  ElderRaySeries,
  LineSeries,
  MovingAverageTooltip,
  OHLCTooltip,
  SingleValueTooltip,
  lastVisibleItemBasedZoomAnchor,
  XAxis,
  YAxis,
  CrossHairCursor,
  EdgeIndicator,
  MouseCoordinateX,
  MouseCoordinateY,
  ZoomButtons,
  withDeviceRatio,
  withSize,
} from 'react-financial-charts';

class StockChart extends React.Component {
  constructor(props) {
    super(props);
    this.margin = { left: 0, right: 48, top: 0, bottom: 24 };
    this.pricesDisplayFormat = format('.2f');
    this.xScaleProvider =
      discontinuousTimeScaleProviderBuilder().inputDateAccessor((d) => d.date);
  }

  render() {
    const {
      data: initialData,
      dateTimeFormat = '%d %b',
      height,
      ratio,
      width,
    } = this.props;

    const formattedData = initialData.map((d) => ({
      date: new Date(d.Date),
      close: d.close,
      signal: d.signal,
      high: d.high,
    }));

    const ema12 = ema()
      .id(1)
      .options({ windowSize: 12 })
      .merge((d, c) => {
        d.ema12 = c;
      })
      .accessor((d) => d.ema12);

    const ema26 = ema()
      .id(2)
      .options({ windowSize: 26 })
      .merge((d, c) => {
        d.ema26 = c;
      })
      .accessor((d) => d.ema26);

    const elder = elderRay();

    const calculatedData = elder(ema26(ema12(formattedData)));

    const { margin, xScaleProvider } = this;

    const { data, xScale, xAccessor, displayXAccessor } =
      xScaleProvider(calculatedData);

    const max = xAccessor(data[data.length - 1]);
    const min = xAccessor(data[Math.max(0, data.length - 100)]);
    const xExtents = [min, max + 5];

    const gridHeight = height - margin.top - margin.bottom;

    const elderRayHeight = 100;
    const elderRayOrigin = (_, h) => [0, h - elderRayHeight];
    const barChartHeight = gridHeight / 4;
    const barChartOrigin = (_, h) => [0, h - barChartHeight - elderRayHeight];
    const chartHeight = gridHeight - elderRayHeight;

    const timeDisplayFormat = timeFormat(dateTimeFormat);

    return (
      <ChartCanvas
        height={height}
        ratio={ratio}
        width={width - 50}
        margin={margin}
        data={data}
        displayXAccessor={displayXAccessor}
        seriesName="Data"
        xScale={xScale}
        xAccessor={xAccessor}
        xExtents={xExtents}
        zoomAnchor={lastVisibleItemBasedZoomAnchor}
      >
        <Chart
          id={2}
          height={barChartHeight}
          origin={barChartOrigin}
          yExtents={this.barChartExtents}
        >
          <BarSeries
            fillStyle={this.volumeColor}
            yAccessor={this.volumeSeries}
          />
        </Chart>
        <Chart id={3} height={chartHeight} yExtents={this.candleChartExtents}>
          <XAxis showGridLines showTicks={false} showTickLabel={false} />
          <YAxis showGridLines tickFormat={this.pricesDisplayFormat} />
          <CandlestickSeries />
          <LineSeries
            yAccessor={ema26.accessor()}
            strokeStyle={ema26.stroke()}
          />
          <CurrentCoordinate
            yAccessor={ema26.accessor()}
            fillStyle={ema26.stroke()}
          />
          <LineSeries
            yAccessor={ema12.accessor()}
            strokeStyle={ema12.stroke()}
          />
          <CurrentCoordinate
            yAccessor={ema12.accessor()}
            fillStyle={ema12.stroke()}
          />
          <MouseCoordinateY
            rectWidth={margin.right}
            displayFormat={this.pricesDisplayFormat}
          />
          <EdgeIndicator
            itemType="last"
            rectWidth={margin.right}
            fill={this.openCloseColor}
            lineStroke={this.openCloseColor}
            displayFormat={this.pricesDisplayFormat}
            yAccessor={this.yEdgeIndicator}
          />
          <MovingAverageTooltip
            origin={[8, 24]}
            options={[
              {
                yAccessor: ema26.accessor(),
                type: 'EMA',
                stroke: ema26.stroke(),
                windowSize: ema26.options().windowSize,
              },
              {
                yAccessor: ema12.accessor(),
                type: 'EMA',
                stroke: ema12.stroke(),
                windowSize: ema12.options().windowSize,
              },
            ]}
          />

          <ZoomButtons />
          <OHLCTooltip origin={[8, 16]} />
        </Chart>
        <Chart
          id={4}
          height={elderRayHeight}
          yExtents={[0, elder.accessor()]}
          origin={elderRayOrigin}
          padding={{ top: 8, bottom: 8 }}
        >
          <XAxis showGridLines gridLinesStrokeStyle="#e0e3eb" />
          <YAxis ticks={4} tickFormat={this.pricesDisplayFormat} />

          <MouseCoordinateX displayFormat={timeDisplayFormat} />
          <MouseCoordinateY
            rectWidth={margin.right}
            displayFormat={this.pricesDisplayFormat}
          />

          <ElderRaySeries yAccessor={elder.accessor()} />

          <SingleValueTooltip
            yAccessor={elder.accessor()}
            yLabel="Elder Ray"
            yDisplayFormat={(d) =>
              `${this.pricesDisplayFormat(d.bullPower)}, ${this.pricesDisplayFormat(d.bearPower)}`
            }
            origin={[8, 16]}
          />
        </Chart>
        <CrossHairCursor />
      </ChartCanvas>
    );
  }

  barChartExtents = (data) => {
    return data.volume;
  };

  candleChartExtents = (data) => {
    return [data.high, data.low];
  };

  yEdgeIndicator = (data) => {
    return data.close;
  };

  volumeColor = (data) => {
    return data.close > data.open
      ? 'rgba(38, 166, 154, 0.3)'
      : 'rgba(239, 83, 80, 0.3)';
  };

  volumeSeries = (data) => {
    return data.volume;
  };

  openCloseColor = (data) => {
    return data.close > data.open ? '#26a69a' : '#ef5350';
  };
}

export default withDeviceRatio()(StockChart);
