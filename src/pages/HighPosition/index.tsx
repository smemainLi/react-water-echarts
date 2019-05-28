import React, { FC, useEffect, useState, useCallback } from 'react';
import "./style.scss";
import { Chart, OptionData, Weather, Card, Battery } from '../../components';
import LabelItem from '../../components/LableItem';
import styled from 'styled-components/macro';
import { levelWarm } from '../../utils/request';

export const earlyWarmImg = require("../../assets/images/earlyWarning.png");
export const waterLevelImg = require("../../assets/images/waterLevel.png");
export const contactImg = require("../../assets/images/contactImg.png");
export const phoneImg = require("../../assets/images/phoneImg.png");
export const unitImg = require("../../assets/images/unitImg.png");

interface baseData {
  deviceCode: string,
  electric: string,
  address: string,
  result: number,
  contacts: string,
  mobile: string,
}

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

const HighPositon: FC = () => {
  const [option, setOption] = useState<OptionData>();
  const [data, setData] = useState<any>({});
  const [options, setOptions] = useState<any>([]);
  const [weatherTypes, setWeatherTypes] = useState<Array<any>>([]);
  const [baseData, setBaseData] = useState<Array<baseData>>([]);
  const [chartData, setChartData] = useState<Array<any>>([]);
  const [cardData, setCardData] = useState<Array<any>>([]);

  const getData = useCallback<any>(async () => {
    try {
      const result = await levelWarm({ pageNo: 1, pageSize: 20 })
      setData(result.data);
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
      let _optionData: OptionData = { xAxisData: [], seriesData: [], markData: 0 };
      let _xAxisData: any = [];
      let _seriesData: any = [];
      let _markData: number = 0;
      const _cardData: Array<any> = [];
      list && list.length && list.forEach((listItem: any) => {
        _baseData = {
          deviceCode: listItem.deviceCode,
          electric: listItem.electric,
          address: listItem.address,
          result: listItem.result,
          contacts: listItem.contacts,
          mobile: listItem.mobile
        }
        setBaseData(_baseData);
        const warnList = listItem.warnList;
        _markData = listItem.firstWarn;
        warnList && warnList.length && warnList.forEach((warnItem: any) => {
          // _optionData.xAxisData.push(warnItem.name);
          // _optionData.seriesData.push(warnItem.value);
          _xAxisData.push(warnItem.name);
          _seriesData.push(warnItem.value);
        });
        let _optionData_ = {
          xAxisData: _xAxisData,
          seriesData: _seriesData,
          markData: _markData
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
    }
  }, [data]);

  return (
    <div className='high-position-main-body'>
      {cardData && !!cardData.length && cardData.map((item, index) => {
        return <Card key={`card${index}`} className="card-container"
          titleClassName="card-title"
          title={
            <>
              <div className="e-num">设备编号：{item.baseData.deviceCode}</div>
              <Battery value={item.baseData.electric ? 100 : 0} />
            </>
          }>
          <LabelItem className="label-item"
            prefix={
              <div className="pre-icon">
                <img src={earlyWarmImg} alt="" />
              </div>
            }
            content={<div className="label-content">预警地址：</div>}
            surfix={<div className="sur-content">{item.baseData.address}</div>}
          />
          <UnitBlock>
            <UnitContainer>
              <LabelItem className="label-item"
                prefix={
                  <div className="pre-icon">
                    <img src={unitImg} alt="" />
                  </div>
                }
                content={<div className="label-content">计量单位：</div>}
                surfix={<div className="sur-content">米</div>}
              />
              <LabelItem className="label-item"
                prefix={
                  <div className="pre-icon">
                    <img src={waterLevelImg} alt="" />
                  </div>
                }
                content={<div className="label-content">当前水位：</div>}
                surfix={<div className="sur-content" style={{ color: "#FD1763" }}>{`${item.baseData.result}m`}</div>}
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
                content={<div className="label-content">联系电话：</div>}
                surfix={<div className="sur-content">{item.baseData.mobile}</div>}
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
    </div>
  )
}

export default HighPositon;