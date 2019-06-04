import bgImg from '../../assets/images/bgImg.png';
import contactImg from '../../assets/images/contactImg.png';
import deviceStatus from '../../assets/images/deviceStatus.png';
import earlyWarmImg from '../../assets/images/earlyWarning.png';
import LabelItem from '../../components/LableItem';
import phoneImg from '../../assets/images/phoneImg.png';
import React, {
  FC,
  useCallback,
  useEffect,
  useState
  } from 'react';
import styled from 'styled-components/macro';
import unitImg from '../../assets/images/unitImg.png';
import warnWaterLevelImg from '../../assets/images/warnWaterLevelImg.png';
import waterLevelImg from '../../assets/images/waterLevel.png';
import wx from 'weixin-js-sdk';
import {
  Battery,
  Card,
  Chart,
  Copyright,
  NoData,
  OptionData,
  Weather
  } from '../../components';
import {
  immersionFault,
  immersionNormal,
  immersionWarn,
  jssdkConfig,
  levelFault,
  levelNormal,
  levelWarn
  } from '../../utils/request';
import {
  onMenuShareAppMessage,
  onMenuShareTimeline,
  updateAppMessageShareData,
  updateTimelineShareData
  } from '../../utils/wx';
import { px2vw } from '../../utils/px2vw';
import { RouteComponentProps } from 'react-router';
import { Toast } from 'antd-mobile';
import './style.scss';


// export const bgImg = import("../../assets/images/bgImg.png");

export const deviceStatusMap = new Map([
  ["1", "预警"],
  ["2", "故障"],
  ["3", "正常"],
]);

export const requestUrlMap = new Map([
  ["high1", levelWarn],
  ["high2", levelFault],
  ["high3", levelNormal],
  ["Logging1", immersionWarn],
  ["Logging2", immersionFault],
  ["Logging3", immersionNormal],
]);

export const labelContentMap = new Map([
  ["high", { documentTitle: "森林防火高位水池信息", labelOne: "最大水位：", labelTwo: "预警水位：", labelType: 0 }],
  ["Logging", { documentTitle: "城市水浸监测信息", labelOne: "橙色预警：", labelTwo: "红色预警：", labelType: 1 }]
]);


export interface HighPositonProps extends RouteComponentProps<{ type: string, id: string }> { }

export interface baseData {
  deviceCode: string,
  electric: string,
  address: string,
  result: number,
  contacts: string,
  mobile: string,
}

const MainBody = styled.div<{ value: number }>`
  display: flex;
  flex-direction: column;
  width: ${px2vw(750)};
  height: ${props => props.value > 1 ? "auto" : "100%"};
  padding: ${px2vw(24)} ${px2vw(32)} ${px2vw(80)};
  box-sizing: border-box;
  /* background: url(${bgImg}) 0 0 repeat; */
  background-size: 100% 100%;
  position: relative;
`

const UnitBlock = styled.div`
  display: flex;
  justify-content: space-between;
`

const UnitContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`

const SurContent = styled.div<{ value: number }>`
  font-size: ${px2vw(24)};
  color: ${ props => props.value ? "#FC8800" : "rgba(255, 255, 255, 0.5)"};
`

const Weathers = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const HighPositon: FC<HighPositonProps> = (props) => {
  const { type, id } = props.match.params;

  const [option, setOption] = useState<OptionData>();
  const [data, setData] = useState<any>({});
  const [config, setConfig] = useState<any>({});
  const [options, setOptions] = useState<any>([]);
  const [weatherTypes, setWeatherTypes] = useState<Array<any>>([]);
  const [baseData, setBaseData] = useState<Array<baseData>>([]);
  const [chartData, setChartData] = useState<Array<any>>([]);
  const [cardData, setCardData] = useState<Array<any>>([]);
  const [finished, setFinished] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

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

  const getData = useCallback<any>(async () => {
    try {
      Toast.loading("loading...", 0);
      const result = await requestUrlMap.get(`${type}${id}`)!({ pageNo: 1, pageSize: 20 });
      Toast.hide();
      setData(result.data);
      setFinished(true);
    } catch (error) { }
  }, [])

  useEffect(() => {
    document.title = labelContentMap.get(type)!.documentTitle;
    getData();
  }, []);

  useEffect(() => {
    if (data && Object.keys(data).length) {
      setWeatherTypes(data.weather);
      const list = data.list;
      // const _baseData: Array<baseData> = [];
      let _baseData: any = {};
      const _chartData: any = [];
      let _optionData: OptionData = { xAxisData: [], seriesData: [], markDataOne: 0, markDataTwo: 0, yAxisMax: 0 };
      let _xAxisData: any = [];
      let _seriesData: any = [];
      let _markDataOne: number = 0;
      let _markDataTwo: number = 0;
      let _yAxisMax: number = 0;
      const _cardData: Array<any> = [];
      list && list.length && list.forEach((listItem: any) => {
        _baseData = {
          deviceCode: listItem.deviceCode,
          electric: listItem.electric,
          address: listItem.address,
          result: listItem.result,
          contacts: listItem.contacts,
          mobile: listItem.mobile,
          firstWarn: listItem.firstWarn,
          maxLevel: listItem.maxLevel === undefined ? listItem.secondWarn : listItem.maxLevel
        }
        setBaseData(_baseData);
        const warnList = listItem.warnList;
        _markDataOne = listItem.firstWarn;
        _markDataTwo = listItem.secondWarn === undefined ? 0 : listItem.secondWarn;
        _yAxisMax = listItem.maxLevel === undefined ? listItem.secondWarn * 2 : listItem.maxLevel;
        warnList && warnList.length && warnList.forEach((warnItem: any) => {
          // _optionData.xAxisData.push(warnItem.name);
          // _optionData.seriesData.push(warnItem.value);
          _xAxisData.push(warnItem.name);
          _seriesData.push(warnItem.value);
        });
        let _optionData_ = {
          xAxisData: _xAxisData,
          seriesData: _seriesData,
          markDataOne: _markDataOne,
          markDataTwo: _markDataTwo,
          yAxisMax: _yAxisMax
        };
        // _optionData.xAxisData = _xAxisData;
        // _optionData.seriesData = _seriesData;
        // _optionData.markDataOne = _markDataOne;
        // _optionData = {
        //   xAxisData: _xAxisData,
        //   seriesData: _seriesData,
        //   markDataOne: _markDataOne
        // }
        _xAxisData = [];
        _seriesData = [];
        _chartData.push(_optionData_);
        setChartData(_chartData);
        // _optionData.xAxisData = [];
        // _optionData.seriesData = [];
        _cardData.push({
          baseData: _baseData,
          chartData: _optionData_
        });
      });
      setCardData(_cardData);
      setIsEmpty(!_cardData.length);
    }
  }, [data]);

  return (
    <>
      {finished && cardData &&
        <MainBody className="main-body" value={cardData.length}>
          {cardData && !!cardData.length && cardData.map((item, index) => {
            return <Card key={`card${index}`} className="card-container"
              titleClassName="card-title"
              title={
                <>
                  <div className="e-num">设备编号：{item.baseData.deviceCode}</div>
                  <Battery value={item.baseData.electric ? 100 : 0} />
                </>
              }>
              <LabelItem className="label-item label-extra"
                prefix={
                  <div className="pre-icon">
                    <img src={earlyWarmImg} alt="" />
                  </div>
                }
                content={<div className="label-content label-content-extra">预警地址：</div>}
                surfix={<div className="sur-content sur-content-extra">{item.baseData.address}</div>}
              />
              <UnitBlock>
                <UnitContainer>
                  <LabelItem className="label-item"
                    prefix={
                      <div className="pre-icon">
                        <img src={labelContentMap.get(type)!.labelType ? warnWaterLevelImg : unitImg} alt="" />
                      </div>
                    }
                    content={<div className="label-content">{labelContentMap.get(type)!.labelOne}</div>}
                    surfix={
                      <SurContent value={labelContentMap.get(type)!.labelType}>
                        {labelContentMap.get(type)!.labelType ? `${item.baseData.firstWarn}m` : `${item.baseData.maxLevel}m`}
                      </SurContent>
                    }
                  />
                  <LabelItem className="label-item"
                    prefix={
                      <div className="pre-icon">
                        <img src={warnWaterLevelImg} alt="" />
                      </div>
                    }
                    content={<div className="label-content">{labelContentMap.get(type)!.labelTwo}</div>}
                    surfix={<div className="sur-content" style={{ color: "#FD1763" }}>{labelContentMap.get(type)!.labelType ? `${item.baseData.maxLevel}m` : `${item.baseData.firstWarn}m`}</div>}
                  />
                  <LabelItem className="label-item"
                    prefix={
                      <div className="pre-icon">
                        <img src={waterLevelImg} alt="" />
                      </div>
                    }
                    content={<div className="label-content">当前水位：</div>}
                    surfix={<div className="sur-content">{`${item.baseData.result}m`}</div>}
                  />
                </UnitContainer>
                <UnitContainer>
                  <LabelItem className="label-item"
                    prefix={
                      <div className="pre-icon contact-icon">
                        <img src={contactImg} alt="" />
                      </div>
                    }
                    content={<div className="label-content">负责人：</div>}
                    surfix={<div className="sur-content">{item.baseData.contacts}</div>}
                  />
                  <LabelItem className="label-item"
                    prefix={
                      <div className="pre-icon">
                        <img src={phoneImg} alt="" />
                      </div>
                    }
                    content={<div className="label-content">电话：</div>}
                    surfix={<a href={`tel:${item.baseData.mobile}`} className="sur-content">{item.baseData.mobile}</a>}
                  />
                  <LabelItem className="label-item"
                    prefix={
                      <div className="pre-icon contact-icon">
                        <img src={deviceStatus} alt="" />
                      </div>
                    }
                    content={<div className="label-content">设备状态：</div>}
                    surfix={<div className="sur-content">{deviceStatusMap.get(id)}</div>}
                  />
                </UnitContainer>
              </UnitBlock>
              <Weathers className="weathers">
                {weatherTypes && weatherTypes.length && weatherTypes.map((item, index) => {
                  return <Weather type={item.type} maxTem='20' minTem='12' key={`weather${index}`} />
                })}
              </Weathers>
              <Chart option={item.chartData!} type={type} />
            </Card>
          })}
          {/* {finished && <div className="equipment-info">目前只有2种设备信息！</div>} */}
          {finished && <Copyright />}
          {finished && isEmpty && <NoData />}
        </MainBody>
      }
    </>
  )
}

export default HighPositon;