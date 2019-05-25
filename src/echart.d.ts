/// <reference types="echarts" />

declare namespace echarts {
  namespace EChartOption {
    interface Tooltip {
      axisPointer?: {
        lineStyle: {
          color: string,
          width: number,
          type: string
        },
        crossStyle: {
          color: string,
          width: number,
          type: string
        },
        shadowStyle: {
          color: string,
          width: number,
          type: string
        },
      }
    }
  }
}