import ReactEChartsCore from 'echarts-for-react/lib/core'
import * as echarts from 'echarts/core'
import { BarChart } from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer
])
const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '10%',
    bottom: '3%',
    top: '5%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    name: 'ops/sec',
    boundaryGap: [0, 0.01]
  },
  yAxis: {
    type: 'category',
    data: ['Node.js', 'Browser']
  },
  series: [
    {
      name: 'Official Compiler',
      type: 'bar',
      data: [225, 124]
    },
    {
      name: 'Mdxor Compiler',
      type: 'bar',
      data: [15963, 8508]
    }
  ]
}
function MdxorChart() {
  return (
    <>
      <ReactEChartsCore echarts={echarts} option={option} />
    </>
  )
}
export default MdxorChart
