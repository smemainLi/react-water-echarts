import React, { FC, useEffect, useRef } from 'react';
import echarts from "echarts";
import "./style.css";


const option: any = {
  color: ['#9bdaf7'],
  // backgroundColor: ['-webkit-linear-gradient(#73ccf5, #2eaae3)'],//背景色
  tooltip: {
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'line', //type类型有'line' | 'cross' | 'shadow' | 'none'(无)这四个选项可以选，选择none就可以取消柱形图表当鼠标上移显示的中轴线。
      lineStyle: {
        color: 'rgba(255,255,255,0.5)',
        width: 2,
        type: 'solid'
      }
    }
  },
  // grid: {//设置画板里面的图表距离画板左、上、右、下的距离
  //   // x: '4%',//左
  //   y: '18%',//上
  //   // x2: '4%',//右
  //   y2: '10%',//下
  //   /*borderWith:1,*/
  //   /*containLabel: true*/
  // },
  grid: [
    { y: '7%', width: '80%', height: '80%' },
  ],
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisTick: { show: false },
    splitArea: { show: true },
    nameLocation: 'start',
    axisLabel: {
      // interval: (x: number) => {
      //   if (x % 2) { return true }
      //   return ''
      // }
      color: "#2AA7D3"
    },
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value',
    axisLine: { show: false },
    axisTick: { show: false },
    splitArea: {
      show: true,
      // opacity: 0
      areaStyle: {
        color: ['rgba(255,255,255,0)']
      }
    },
    splitLine: { show: false },
  },
  series: [{
    data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320],
    type: 'line',
    smooth: true,
    areaStyle: {//折线包含区域样式填充
      show: true,
      normal: {
        /*颜色渐变函数，前四个参数分别表示四个位置，一次为左，下，右，上*/
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,//表示在0%处的颜色
          color: '#009CFF',
        }, {
          offset: 1,//表示在100%处的颜色
          color: 'rgba(255,255,255,0)',
        }])
      },
    },
  }]
};

const HighPositon: FC = () => {
  const ChartCanvas = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ChartCanvas) {
      const myChart = echarts.init(ChartCanvas.current!);
      myChart.setOption(option);
    }
  }, [ChartCanvas]);

  return (
    <div className="container">
      <div className="chart-container" ref={ChartCanvas}></div>
    </div>
  )
}

export default HighPositon;