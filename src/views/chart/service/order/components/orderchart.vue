<template>
  <div ref="mychart" id="mychart">维修数据概述</div>
</template>

<script>
  import moment from 'moment'
  import * as echarts from 'echarts/core';
  import {
    TooltipComponent,
    GridComponent,
    LegendComponent,
    MarkLineComponent
  } from 'echarts/components';
  import { BarChart } from 'echarts/charts';
  import { CanvasRenderer } from 'echarts/renderers';


  export default {
    name: 'OrderChart',
    created() {
      this.fetchData()
      echarts.use([
        TooltipComponent,
        GridComponent,
        LegendComponent,
        BarChart,
        CanvasRenderer
      ])
    },
    mounted() {
      let charDom = this.$refs.mychart
      // var myChart = echarts.init(document.getElementById('main'));
      var myChart = echarts.init(charDom)
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        series: [
          {
            name: 'Direct',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [320, 302, 301, 334, 390, 330, 320]
          },
          {
            name: 'Mail Ad',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Affiliate Ad',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'Video Ad',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: [150, 212, 201, 154, 190, 330, 410]
          },
          {
            name: 'Search Engine',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: this.chart_data.map(item => item.created_count)
          }
        ]
      }

      myChart.setOption(option);
    },

  }



</script>


<style>
#mychart {
  width: 100%;
  height: 900px;
  margin: 30px auto;
}
</style>











