import React, { FC, useEffect, useState, useCallback } from 'react';
import { NavLink } from "react-router-dom";
import { Pie, Card } from '../../components';
import { px2vw } from "../../utils/px2vw";
import styled from 'styled-components/macro';
import "./style.scss";
import { deviceDashboard } from '../../utils/request';

export const LeftIcon = require("../../assets/images/leftIcon.png");
export const RightIcon = require("../../assets/images/rightIcon.png");

export const typeTipsMap = new Map([
  [1, { color: "#FD1763", value: "预警", colors: ["#FD1763", "#070b34"] }],
  [2, { color: "#EDEF15", value: "故障", colors: ["#EDEF15", "#070b34"] }],
  [3, { color: "#20E280", value: "正常", colors: ["#20E280", "#070b34"] }]
])


const PieContainer = styled.div`
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
  font-size: ${px2vw(18)};
  position: absolute;
  top: ${px2vw(64)};
`

const Perc = styled.div<{ value: number }>`
  font-size: ${px2vw(26)};
  color: ${props => typeTipsMap.get(props.value)!.color};
`

const TypeTips = styled.div<{ value: number }>`
    font-size: ${px2vw(28)};
    color: ${props => typeTipsMap.get(props.value)!.color};
`

export const Dashboard: FC = (props) => {
  // const [option, setOption] = useState<pieOptionData>();
  const [data, setData] = useState<any>({});
  const [levelData, setLevelData] = useState<Array<any>>([]);
  const [immersionData, setImmersionData] = useState<Array<any>>([]);

  const getData = useCallback(async () => {
    const result = await deviceDashboard();
    setData(result.data);
  }, [])

  useEffect(() => {
    document.title = "应急数据驾驶舱";
    getData();
  }, []);

  useEffect(() => {
    if (!!data && Object.keys(data).length) {
      const temp1: any = []
      const temp2: any = []
      data.immersion && data.immersion.length && data.immersion.map((item: any) => {
        temp1.push({
          num: item.num,
          path: item.type === 1 ? "/waterLogging" : "",
          type: item.type,
          rate: item.ratio,
          optionData: {
            seriesData: [
              { value: item.num },
              { value: Number(data.immersionAll - item.num) }
            ],
            colorData: typeTipsMap.get(item.type)!.colors
          }
        })
      })
      setImmersionData(temp1);

      data.level && data.level.length && data.level.map((item: any) => {
        temp2.push({
          num: item.num,
          path: item.type === 1 ? "/highPosition" : "",
          type: item.type,
          rate: item.ratio,
          optionData: {
            seriesData: [
              { value: item.num },
              { value: Number(data.levelAll - item.num) }
            ],
            colorData: typeTipsMap.get(item.type)!.colors
          }
        })
      })
      setLevelData(temp2)

    }
  }, [data]);

  // useEffect(() => {
  //   setOption({
  //     seriesData: [
  //       { value: 3 },
  //       { value: 1 }
  //     ],
  //     colorData: ["#FD1763", "#070b34"]
  //   })
  // }, []);

  return (
    <div className="dashboard-main-body">
      <Card
        className="card-container"
        titleClassName="card-title"
        title={
          <>
            <div className="icon-container"><img src={LeftIcon} alt="" /></div>
            <div className="title-content">高位水池信息</div>
            <div className="icon-container"><img src={RightIcon} alt="" /></div>
          </>
        }>
        <PieContainer>
          {levelData && levelData.length && levelData.map((item, index) => {
            return (
              <NavLink key={`level${index}`} to={item.path}>
                <PieItem>
                  {item.optionData && <Pie option={item.optionData} id={`level${index}`}></Pie>}
                  <Situation>
                    <div>{`${item.num}台`}</div>
                    <Perc value={item.type}>{item.rate}</Perc>
                  </Situation>
                  <TypeTips value={item.type}>
                    {typeTipsMap.get(item.type)!.value}
                  </TypeTips>
                </PieItem>
              </NavLink>
            )
          })}
        </PieContainer>
      </Card>
      <Card className="card-container"
        titleClassName="card-title"
        title={
          <>
            <div className="icon-container"><img src={LeftIcon} alt="" /></div>
            <div className="title-content">水浸信息</div>
            <div className="icon-container"><img src={RightIcon} alt="" /></div>
          </>
        }>
        <PieContainer>
          {immersionData && immersionData.length && immersionData.map((item, index) => {
            return (
              <NavLink key={`immersion${index}`} to={item.path}>
                <PieItem>
                  {item.optionData && <Pie option={item.optionData} id={`immersion${index}`}></Pie>}
                  <Situation>
                    <div>{`${item.num}台`}</div>
                    <Perc value={item.type}>{item.rate}</Perc>
                  </Situation>
                  <TypeTips value={item.type}>
                    {typeTipsMap.get(item.type)!.value}
                  </TypeTips>
                </PieItem>
              </NavLink>
            )
          })}
        </PieContainer>
      </Card>
      <div className="equipment-info">您目前只有2种设备信息！</div>
    </div>
  )
}

export default Dashboard;