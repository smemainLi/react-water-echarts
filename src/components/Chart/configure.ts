import echarts from "echarts";
export const config: any = {
  color: ['#9bdaf7'],
  tooltip: {
    trigger: 'axis',
    backgroundColor: "rgba(10, 32, 67, 0.5)",
    formatter: '{b0}<br />检测水位：{c}m',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'line', //type类型有'line' | 'cross' | 'shadow' | 'none'(无)这四个选项可以选，选择none就可以取消柱形图表当鼠标上移显示的中轴线。
      lineStyle: {
        color: "rgba(255,255,255,0.5)",
        width: 2,
        type: 'solid'
      }
    },
    textStyle: {
      fontSize: 12,
      color: "rgba(255,255,255,0.5)"
    }
  },
  grid: [
    { x: '8%', y: '4%', width: '90%', height: '72%' },
  ],
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisTick: { show: false },
    splitArea: {
      show: true,
      areaStyle: {
        color: ["rgba(255, 255, 255, 0)", "rgba(6, 179, 214, 0)"]
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: "dashed",
        color: "#00B4FF",
        opacity: 0.1
      }
    },
    nameLocation: 'start',
    axisLabel: {
      interval: (x: number) => {
        if (x % 3 === 1) { return true }
        return ''
      },
      color: "#2AA7D3",
      formatter: (value: string) => {
        return `${value.split(" ")[0].split(".")[1]}.${value.split(" ")[0].split(".")[2]}`;
      }
    },
    data: []
  },
  yAxis: {
    type: 'value',
    // name: '单位/m',
    nameLocation: 'end',
    nameRotate: 0,
    nameTextStyle: {
      color: "#2AA7D3"
    },
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: "#2AA7D3",
    },
    splitLine: {
      show: true,
      lineStyle: {
        type: "solid",
        color: "#00B4FF",
        opacity: 0.1
      }
    },
  },
  series: [{
    data: [],
    type: 'line',
    smooth: true,
    // symbolSize: 1,
    showSymbol: false,
    markLine: {
      symbol: "none",
      data: [{
        name: 'Y 轴值为 100 的水平线',
        yAxis: 1.2,
        symbol: "none",
        label: {
          show: false
        },
        lineStyle: {
          color: "#FD1763"
        }
      }]
    },
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