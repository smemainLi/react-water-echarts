import React, { FC } from 'react';
import "./style.scss";

export interface WeatherProps {
  type: number;
  maxTem: string;
  minTem: string;
  typeStr?: string;
}

export const WeatherMap = new Map([
  [0, require("../../assets/images/clear.png")],
  [1, require("../../assets/images/cloudy.png")],
  [2, require("../../assets/images/showers.png")],
  [3, require("../../assets/images/lightRain.png")],
  [4, require("../../assets/images/moderateRain.png")],
  [5, require("../../assets/images/heavyRain.png")],
  [6, require("../../assets/images/rainStorm.png")],
  [7, require("../../assets/images/downpour.png")],
  [8, require("../../assets/images/heavyDownpour.png")],
  [9, require("../../assets/images/tStorms.png")],
  [10, require("../../assets/images/fog.png")],
  [11, require("../../assets/images/shade.png")],
])

export const Weather: FC<WeatherProps> = props => {
  const { type } = props
  return (
    <div className="weather">
      {/* <div className="temRange">{minTem}-{maxTem}°C</div> */}
      <div className="temIcon">
        <img src={WeatherMap.get(type)} alt="" />
      </div>
    </div>
  )
}

export default Weather;