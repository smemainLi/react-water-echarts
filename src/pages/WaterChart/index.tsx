import React, { FC, useEffect, useState, useCallback } from 'react';
import "./style.scss";
import { Chart, OptionData, Weather, Card, Battery, NoData } from '../../components';
import LabelItem from '../../components/LableItem';
import styled from 'styled-components/macro';
import { levelWarn, levelFault, levelNormal, immersionWarn, immersionFault, immersionNormal } from '../../utils/request';
import { Toast } from "antd-mobile";
import { px2vw } from "../../utils/px2vw";
import { RouteComponentProps } from 'react-router';

import bgImg from "../../assets/images/bgImg.png";
import earlyWarmImg from "../../assets/images/earlyWarning.png";
import waterLevelImg from "../../assets/images/waterLevel.png";
import contactImg from "../../assets/images/contactImg.png";
import phoneImg from "../../assets/images/phoneImg.png";
import unitImg from "../../assets/images/unitImg.png";
import warnWaterLevelImg from "../../assets/images/warnWaterLevelImg.png";
import deviceStatus from "../../assets/images/deviceStatus.png";

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
  ["high", "最大水位："],
  ["Logging", "安全水位："]
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
  padding: ${px2vw(24)} ${px2vw(32)};
  box-sizing: border-box;
  /* background: url(${bgImg}) 0 0 repeat; */
  background-size: 100% 100%;
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

const Weathers = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const HighPositon: FC<HighPositonProps> = (props) => {
  const { type, id } = props.match.params;

  const [option, setOption] = useState<OptionData>();
  const [data, setData] = useState<any>({});
  const [options, setOptions] = useState<any>([]);
  const [weatherTypes, setWeatherTypes] = useState<Array<any>>([]);
  const [baseData, setBaseData] = useState<Array<baseData>>([]);
  const [chartData, setChartData] = useState<Array<any>>([]);
  const [cardData, setCardData] = useState<Array<any>>([]);
  const [finished, setFinished] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

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
    document.title = "高位水池预警信息";
    getData();
  }, []);

  useEffect(() => {
    if (data && Object.keys(data).length) {
      setWeatherTypes(data.weather);
      const list = data.list;
      // const _baseData: Array<baseData> = [];
      let _baseData: any = {};
      const _chartData: any = [];
      let _optionData: OptionData = { xAxisData: [], seriesData: [], markData: 0, yAxisMax: 0 };
      let _xAxisData: any = [];
      let _seriesData: any = [];
      let _markData: number = 0;
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
          maxLevel: listItem.maxLevel
        }
        setBaseData(_baseData);
        const warnList = listItem.warnList;
        _markData = listItem.firstWarn;
        _yAxisMax = listItem.maxLevel;
        warnList && warnList.length && warnList.forEach((warnItem: any) => {
          // _optionData.xAxisData.push(warnItem.name);
          // _optionData.seriesData.push(warnItem.value);
          _xAxisData.push(warnItem.name);
          _seriesData.push(warnItem.value);
        });
        let _optionData_ = {
          xAxisData: _xAxisData,
          seriesData: _seriesData,
          markData: _markData,
          yAxisMax: _yAxisMax
        }
        // _optionData.xAxisData = _xAxisData;
        // _optionData.seriesData = _seriesData;
        // _optionData.markData = _markData;
        // _optionData = {
        //   xAxisData: _xAxisData,
        //   seriesData: _seriesData,
        //   markData: _markData
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
                        <img src={unitImg} alt="" />
                      </div>
                    }
                    content={<div className="label-content">{labelContentMap.get(type)}</div>}
                    surfix={<div className="sur-content">{type === "high" ? `${item.baseData.maxLevel}m` : `>${item.baseData.firstWarn}m`}</div>}
                  />
                  <LabelItem className="label-item"
                    prefix={
                      <div className="pre-icon">
                        <img src={warnWaterLevelImg} alt="" />
                      </div>
                    }
                    content={<div className="label-content">预警水位：</div>}
                    surfix={<div className="sur-content" style={{ color: "#FD1763" }}>{`${item.baseData.firstWarn}m`}</div>}
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
              <Chart option={item.chartData!} />
            </Card>
          })}
          {finished && isEmpty && <NoData />}
        </MainBody>
      }
    </>
  )
}

export default HighPositon;