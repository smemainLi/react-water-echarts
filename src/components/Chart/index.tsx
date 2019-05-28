import echarts from "echarts";
import React, { FC, useRef, useEffect, useState } from 'react';

import { config as _config } from './configure'
import "./style.css";

export interface ChartProps {
  option: OptionData;
}

export interface OptionData {
  xAxisData: Array<string>,
  seriesData: Array<number>,
  markData: number,
  yAxisMax: number
}


export const Chart: FC<ChartProps> = props => {
  const { option } = props;
  const [config, setConfig] = useState(_config);
  const [active, setActive] = useState(false);

  const ChartCanvas = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (option) {
      let c = {
        ..._config,
        xAxis: {
          ..._config.xAxis,
          data: option.xAxisData,
        },
        yAxis: {
          ..._config.yAxis,
          max: option.yAxisMax
        },
        series: {
          ..._config.series,
          data: option.seriesData,
          markLine: {
            ..._config.series.markLine,
            data: [{
              name: 'Y 轴值为 100 的水平线',
              yAxis: option.markData,
              symbol: "none",
              label: {
                show: false
              },
              lineStyle: {
                color: "#FD1763"
              }
            }]
          }
        }
      }
      setActive(true);
      setConfig(c)
    }
  }, [option])

  useEffect(() => {
    if (active && ChartCanvas) {
      const myChart = echarts.init(ChartCanvas.current!);
      myChart.setOption(config, true);
    }
  }, [active, config, ChartCanvas]);

  return (
    <div className="chart">
      <div className="chart-container" ref={ChartCanvas}></div>
    </div>
  )
}

export default Chart;