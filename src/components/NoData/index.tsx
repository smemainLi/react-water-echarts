import React, { FC } from 'react';
import placeholderImg from "../../assets/images/placeholder.png";
import "./style.scss";

export const NoData: FC = () => {
  return (
    <div className="no-data-container">
      <div className="img-container">
        <img src={placeholderImg} alt="" />
      </div>
      <div className="tips">抱歉！您目前暂无数据...</div>
    </div>
  )
}

export default NoData;