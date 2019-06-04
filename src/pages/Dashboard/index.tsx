import React, {
  FC,
  useCallback,
  useEffect,
  useState
  } from 'react';
import styled from 'styled-components/macro';
import wx from 'weixin-js-sdk';
import { Card, Copyright, Pie } from '../../components';
import { deviceDashboard, jssdkConfig } from '../../utils/request';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import {
  onMenuShareAppMessage,
  onMenuShareTimeline,
  updateAppMessageShareData,
  updateTimelineShareData
  } from '../../utils/wx';
import { px2vw } from '../../utils/px2vw';
import { Toast } from 'antd-mobile';
import './style.scss';

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

export interface DashboardProps extends RouteComponentProps{}

export const Dashboard: FC<DashboardProps> = (props) => {
  const [data, setData] = useState<any>({});
  const [config, setConfig] = useState<any>({});
  const [levelData, setLevelData] = useState<totalData>();
  const [immersionData, setImmersionData] = useState<totalData>();
  const [totalData, setTotalData] = useState<Array<totalData>>([]);
  const [finished, setFinished] = useState<boolean>(false);

  const getConfig = useCallback(async () => {
    const result = await jssdkConfig({ url: props.location.pathname });
    setConfig(result.data);    
  }, []);

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    if (Object.keys(config).length) { 
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: config.appid, // 必填，公众号的唯一标识
        timestamp: config.timestamp, // 必填，生成签名的时间戳
        nonceStr: config.noncestr, // 必填，生成签名的随机串
        signature: config.sign, // 必填，签名
        jsApiList: ['updateTimelineShareData', 'onMenuShareTimeline', 'updateAppMessageShareData', 'onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
      });
      wx.ready(function () {
        let data = {
          title: "智慧应急管理-数据驾舱",
          desc: "智慧应急管理-数据驾舱-随时掌控一切！",
          link: `${window.location.origin}${props.location.pathname}`,
          imgUrl: `${window.location.origin}/static/media/placeholder.c75937d0.png`,
          type: "",
          dataUrl: ""
        }
        updateAppMessageShareData(data);
        updateTimelineShareData(data);
        onMenuShareTimeline(data);
        onMenuShareAppMessage(data);
      })
    }
  }, [config]);

  const getData = useCallback(async () => {
    Toast.loading("loading...", 0);
    const result = await deviceDashboard();
    Toast.hide();
    setData(result.data);
    setFinished(true);
  }, []);

  useEffect(() => {
    document.title = "智慧应急管理-数据驾舱";
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