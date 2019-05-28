import echarts from "echarts";
import React, { FC, useEffect, useState } from 'react';
import { config as _config } from "./configure";
import "./style.scss";

export interface pieOptionData {
  seriesData: Array<any>;
  colorData: Array<string>;
}

export interface PieProps {
  option: pieOptionData;
  id: string
}

export const Pie: FC<PieProps> = props => {
  const { option, id } = props;
  const [config, setConfig] = useState(_config);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (option) {
      let c = {
        ..._config,
        color: option.colorData,
        series: {
          ..._config.series,
          data: option.seriesData
        }
      }
      setConfig(c);
      setActive(true);
    }
  }, [option])

  useEffect(() => {
    if (active && document.getElementById(`pie${id}`)) {
      const myPie = echarts.init(document.getElementById(`pie${id}`) as HTMLDivElement);
      myPie.clear();

      myPie.setOption(config, true);
    }
  }, [active, config, id, option]);

  return (
    <div className="pie">
      <div id={`pie${id}`} className="pie-container" ></div>
    </div>
  )
}

export default Pie;