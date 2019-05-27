import React, { FC, useEffect, useState } from 'react';
import "./style.scss";
import { Chart, OptionData, Weather, Card, Battery } from '../../components';
import LabelItem from '../../components/LableItem';
import styled from 'styled-components/macro';

const earlyWarmImg = require("../../assets/images/earlyWarning.png");
const waterLevel = require("../../assets/images/waterLevel.png");

const UnitContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const Weathers = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const HighPositon: FC = () => {
  const [option, setOption] = useState<OptionData>()
  // const getData = useCallback<any>(async () => {
  //   const res = MockData
  //   return res
  // }, []);

  useEffect(() => {
    document.title = "高位水池预警信息";
  }, []);

  useEffect(() => {
    setOption({
      xAxisData: ['2019.05.20 00:00', '2019.05.20 00:00', '2019.05.20 00:00', '2019.05.21 00:00', '2019.05.21 00:00', '2019.05.21 00:00', '2019.05.22 00:00', '2019.05.22 00:00', '2019.05.22 00:00', '2019.05.23 00:00', '2019.05.23 00:00', '2019.05.23 00:00', '2019.05.24 00:00', '2019.05.24 00:00', '2019.05.24 00:00', '2019.05.25 00:00', '2019.05.25 00:00', '2019.05.25 00:00', '2019.05.26 00:00', '2019.05.26 00:00', '2019.05.26 00:00'],
      seriesData: [1.2, 1.2, 1.25, 1.3, 1.35, 1.36, 1.3, 1.2, 1.1, 1.2, 1.25, 1.3, 1.25, 1.2, 1.3, 1.5, 1.4, 1.35, 1.3, 1.35, 1.2]
    })
  }, []);

  return (
    <div className='main-body'>
      <Card className="card-container"
        title={
          <>
            <div className="e-num">设备编号：{'QC0001000100000004'}</div>
            <Battery value={75} />
          </>
        }>
        <LabelItem className="label-item"
          prefix={
            <div className="pre-icon">
              <img src={earlyWarmImg} alt="" />
            </div>
          }
          content={<div className="label-content">预警地址：</div>}
          surfix={<div className="sur-content">{"珠海市凤凰山琴台观瀑（左侧）"}</div>}
        />
        <UnitContainer>
          <LabelItem className="label-item"
            prefix={
              <div className="pre-icon">
                <img src={waterLevel} alt="" />
              </div>
            }
            content={<div className="label-content">计量单位：</div>}
            surfix={<div className="sur-content">{"米"}</div>}
          />
          <LabelItem className="label-item"
            prefix={
              <div className="pre-icon">
                <img src={waterLevel} alt="" />
              </div>
            }
            content={<div className="label-content">负责人：</div>}
            surfix={<div className="sur-content">{"路飞"}</div>}
          />
        </UnitContainer>
        <UnitContainer>
          <LabelItem className="label-item"
            prefix={
              <div className="pre-icon">
                <img src={waterLevel} alt="" />
              </div>
            }
            content={<div className="label-content">当前水位：</div>}
            surfix={<div className="sur-content" style={{ color: "#FD1763" }}>{"1.2m"}</div>}
          />
          <LabelItem className="label-item"
            prefix={
              <div className="pre-icon">
                <img src={waterLevel} alt="" />
              </div>
            }
            content={<div className="label-content">联系电话：</div>}
            surfix={<div className="sur-content">{"18666111122"}</div>}
          />
        </UnitContainer>
        <Weathers className="weathers">
          {[0, 1, 2, 3, 4, 5, 6].map((item, index) => {
            return <Weather type={item} maxTem='20' minTem='12' key={`weather${index}`} />
          })}
        </Weathers>
        <Chart option={option!} />
      </Card>
      <Card className="card-container"
        title={
          <>
            <div className="e-num">设备编号：{'QC0001000100000007'}</div>
            <Battery value={98} />
          </>
        }>
        <LabelItem className="label-item"
          prefix={
            <div className="pre-icon">
              <img src={earlyWarmImg} alt="" />
            </div>
          }
          content={<div className="label-content">预警地址：</div>}
          surfix={<div className="sur-content">{"珠海市凤凰山琴台观瀑（右侧）"}</div>}
        />
        <UnitContainer>
          <LabelItem className="label-item"
            prefix={
              <div className="pre-icon">
                <img src={waterLevel} alt="" />
              </div>
            }
            content={<div className="label-content">计量单位：</div>}
            surfix={<div className="sur-content">{"米"}</div>}
          />
          <LabelItem className="label-item"
            prefix={
              <div className="pre-icon">
                <img src={waterLevel} alt="" />
              </div>
            }
            content={<div className="label-content">当前水位：</div>}
            surfix={<div className="sur-content" style={{ color: "#FD1763" }}>{"1.2m"}</div>}
          />
        </UnitContainer>
        <UnitContainer>
          <LabelItem className="label-item"
            prefix={
              <div className="pre-icon">
                <img src={waterLevel} alt="" />
              </div>
            }
            content={<div className="label-content">负责人：</div>}
            surfix={<div className="sur-content">{"路飞"}</div>}
          />
          <LabelItem className="label-item"
            prefix={
              <div className="pre-icon">
                <img src={waterLevel} alt="" />
              </div>
            }
            content={<div className="label-content">联系电话：</div>}
            surfix={<div className="sur-content">{"18666111122"}</div>}
          />
        </UnitContainer>
        <Weathers className="weathers">
          {[0, 1, 2, 3, 4, 5, 6].map((item, index) => {
            return <Weather type={item} maxTem='20' minTem='12' key={`weather${index}`} />
          })}
        </Weathers>
        <Chart option={option!} />
      </Card>
      {/* <Chart option={option!} />
      <Chart option={option!} />
      <Chart option={option!} />
      <Chart option={option!} /> */}
    </div>

  )
}

export default HighPositon;