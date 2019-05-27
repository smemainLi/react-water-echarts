import echarts from "echarts";
import React, { FC, useRef, useEffect, useState } from 'react';

import { config as _config } from './configure'
import "./style.css";

export interface ChartProps {
  option: OptionData;
}

export interface OptionData {
  xAxisData: Array<string>,
  seriesData: Array<number>
}


export const Chart: FC<ChartProps> = props => {
  const { option } = props;
  const [config, setConfig] = useState(_config)
  const [active, setActive] = useState(false)

  const ChartCanvas = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (option) {
      setConfig((c: any) => {
        c.xAxis.data = option.xAxisData
        c.series[0].data = option.seriesData
        setActive(true)
        return c
      })
    }
  }, [option])

  useEffect(() => {
    if (active && ChartCanvas) {
      const myChart = echarts.init(ChartCanvas.current!);
      myChart.setOption(config);
    }
  }, [active, config, ChartCanvas]);

  return (
    <div className="chart">
      <div className="chart-container" ref={ChartCanvas}></div>
    </div>
  )
}

export default Chart;