import echarts from "echarts";
import React, { FC, useRef, useEffect, useState } from 'react';
import { config as _config } from './configure'
import "./style.css";
import { labelContentMap } from "../../pages/WaterChart";


export interface ChartProps {
  option: OptionData;
  type: string;
}

export interface OptionData {
  xAxisData: Array<string>,
  seriesData: Array<number>,
  markDataOne: number,
  markDataTwo: number,
  yAxisMax: number
}


export const Chart: FC<ChartProps> = props => {
  const { option, type } = props;
  const [config, setConfig] = useState(_config);
  const [active, setActive] = useState(false);

  const ChartCanvas = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (option) {
      let markLineData: Array<any> = [];
      markLineData = labelContentMap.get(type)!.labelType ?
        [{
          yAxis: option.markDataOne,
          symbol: "none",
          label: {
            show: false
          },
          lineStyle: {
            color: "#FC8800",
            width: 2,
          }
        },
        {
          yAxis: option.markDataTwo,
          symbol: "none",
          label: {
            show: false
          },
          lineStyle: {
            color: "#FD1763",
            width: 2,
          }
        }] :
        [{
          yAxis: option.markDataOne,
          symbol: "none",
          label: {
            show: false
          },
          lineStyle: {
            color: "#FD1763",
            width: 2,
          }
        }]

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
            data: markLineData
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