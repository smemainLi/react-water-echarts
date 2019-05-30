import React, { FC, useEffect, useState, useCallback } from 'react';
import styled from 'styled-components/macro';
import { NavLink } from "react-router-dom";
import { Pie, Card, Copyright } from '../../components';
import { px2vw } from "../../utils/px2vw";
import { deviceDashboard } from '../../utils/request';
import { Toast } from "antd-mobile";
import "./style.scss";

export const LeftIcon = require("../../assets/images/leftIcon.png");
export const RightIcon = require("../../assets/images/rightIcon.png");

export const typeTipsMap = new Map([
  [1, { color: "#FD1763", value: "预警", colors: ["#FD1763", "#070b34"] }],
  [2, { color: "#EDEF15", value: "故障", colors: ["#EDEF15", "#070b34"] }],
  [3, { color: "#20E280", value: "正常", colors: ["#20E280", "#070b34"] }]
]);

const PieContainer = styled.div`
  color: #0A2043;
  display: flex;
  justify-content: space-around;
`

const PieItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`
const Situation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #2AA7D3;
  font-size: ${px2vw(28)};
  position: absolute;
  top: ${px2vw(86)};
`

const Perc = styled.div<{ value: number }>`
  font-size: ${px2vw(26)};
  color: ${props => typeTipsMap.get(props.value)!.color};
`

const TypeTips = styled.div<{ value: number }>`
    font-size: ${px2vw(28)};
    color: ${props => typeTipsMap.get(props.value)!.color};
`


export interface totalData {
  name: string;
  path: string;
  pieData: Array<chartData>;
}

export interface chartData {
  num: number;
  type: number;
  rate: string;
  optionData: optionData;
}

export interface optionData {
  seriesData: Array<seriesData>;
  colorData: Array<string>;
}

export interface seriesData {
  value: number;
}


export const Dashboard: FC = () => {
  const [data, setData] = useState<any>({});
  const [levelData, setLevelData] = useState<totalData>();
  const [immersionData, setImmersionData] = useState<totalData>();
  const [totalData, setTotalData] = useState<Array<totalData>>([]);
  const [finished, setFinished] = useState<boolean>(false);

  const getData = useCallback(async () => {
    Toast.loading("loading...", 0);
    const result = await deviceDashboard();
    Toast.hide();
    setData(result.data);
    setFinished(true);
  }, [])

  useEffect(() => {
    document.title = "物联网云平台数据驾驶舱";
    getData();
  }, []);

  useEffect(() => {
    if (!!data && Object.keys(data).length) {
      const levelName = "森林防火高位水池信息";
      const immersionName = "城市水浸监测信息";
      const levelPath = "/highPosition/high/";
      const immersionPath = "/waterLogging/Logging/";
      setLevelData({
        name: levelName,
        path: levelPath,
        pieData: data.level && data.level.length && data.level.map((item: any) => {
          return {
            num: item.num,
            type: item.type,
            rate: item.ratio,
            optionData: {
              seriesData: [
                { value: item.num },
                { value: Number(data.levelAll - item.num) }
              ],
              colorData: typeTipsMap.get(item.type)!.colors
            }
          }
        })
      });
      setImmersionData({
        name: immersionName,
        path: immersionPath,
        pieData: data.immersion && data.immersion.length && data.immersion.map((item: any) => {
          return {
            num: item.num,
            type: item.type,
            rate: item.ratio,
            optionData: {
              seriesData: [
                { value: item.num },
                { value: Number(data.immersionAll - item.num) }
              ],
              colorData: typeTipsMap.get(item.type)!.colors
            }
          }
        })
      });
    }
  }, [data]);

  useEffect(() => {
    if (levelData && immersionData) {
      setTotalData([levelData, immersionData]);
    }
  }, [levelData, immersionData])

  return (
    <div className="dashboard-main-body">
      {finished && totalData.length && totalData.map((totalItem, index) => {
        return <Card
          key={`total${index}`}
          className="card-container"
          titleClassName="card-title"
          title={
            <>
              <div className="icon-container"><img src={LeftIcon} alt="" /></div>
              <div className="title-content">{totalItem.name}</div>
              <div className="icon-container"><img src={RightIcon} alt="" /></div>
            </>
          }>
          <PieContainer>
            {totalItem.pieData && totalItem.pieData.length && totalItem.pieData.map((pieItem, index) => {
              return (
                <NavLink key={`pieItem${index}`} to={`${totalItem.path}${pieItem.type}`}>
                  <PieItem>
                    {pieItem.optionData && <Pie option={pieItem.optionData} id={`${totalItem.path.split("/")[1]}${index}`}></Pie>}
                    <Situation>
                      <div>{`${pieItem.num}台`}</div>
                    </Situation>
                    <TypeTips value={pieItem.type}>
                      {typeTipsMap.get(pieItem.type)!.value}
                    </TypeTips>
                  </PieItem>
                </NavLink>
              )
            })}
          </PieContainer>
        </Card>
      })}
      {finished && <div className="equipment-info">您目前只有2种设备信息！</div>}
      {finished && <Copyright />}
    </div>
  )
}

export default Dashboard;