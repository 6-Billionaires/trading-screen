<template>
  <div class="page-container page-guide">

    <div class="echarts">
      <IEcharts
        :option="option"
        :loading="loading"
        @ready="onReady"
        @click="onClick"
      />
      <button @click="doRandom">Random</button>
    </div>

    <div>
      {stockData}
    </div>
  </div>
</template>

<script type="text/babel">
import Papa from 'papaparse'
import axios from 'axios'
import IEcharts from 'vue-echarts-v3/src/full.js'

const aaa = (params, api) => {
  console.log(params)
  var xValue = api.value(0)
  var openPoint = api.coord([xValue, api.value(1)])
  var closePoint = api.coord([xValue, api.value(2)])
  var lowPoint = api.coord([xValue, api.value(3)])
  var highPoint = api.coord([xValue, api.value(4)])
  var halfWidth = api.size([1, 0])[0] * 0.35
  var style = api.style({
    stroke: api.visual('color')
  })

  return {
    type: 'group',
    children: [{
      type: 'line',
      shape: {
        x1: lowPoint[0],
        y1: lowPoint[1],
        x2: highPoint[0],
        y2: highPoint[1]
      },
      style: style
    }, {
      type: 'line',
      shape: {
        x1: openPoint[0],
        y1: openPoint[1],
        x2: openPoint[0] - halfWidth,
        y2: openPoint[1]
      },
      style: style
    }, {
      type: 'line',
      shape: {
        x1: closePoint[0],
        y1: closePoint[1],
        x2: closePoint[0] + halfWidth,
        y2: closePoint[1]
      },
      style: style
    }]
  }
}

export default {
  name: 'view',
  components: {
    IEcharts
  },
  props: {
  },
  data: () => ({
    stockData: {},
    loading: false,
    categoryData: [],
    values: [],
    option: {
      backgroundColor: '#eee',
      animation: false,
      legend: {
        bottom: 10,
        left: 'center',
        data: ['Dow-Jones index']
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        backgroundColor: 'rgba(245, 245, 245, 0.8)',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        textStyle: {
          color: '#000'
        },
        position: function (pos, params, el, elRect, size) {
          var obj = {top: 10}
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30
          return obj
        },
        extraCssText: 'width: 170px'
      },
      axisPointer: {
        link: {xAxisIndex: 'all'},
        label: {
          backgroundColor: '#777'
        }
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: false
          },
          brush: {
            type: ['lineX', 'clear']
          }
        }
      },
      grid: [
        {
          left: '10%',
          right: '8%',
          bottom: 150
        }
      ],
      xAxis: [
        {
          type: 'category',
          data: this.categoryData,
          scale: true,
          boundaryGap: false,
          axisLine: {onZero: false},
          splitLine: {show: false},
          splitNumber: 20,
          min: 'dataMin',
          max: 'dataMax',
          axisPointer: {
            z: 100
          }
        }
      ],
      yAxis: [
        {
          scale: true,
          splitArea: {
            show: true
          }
        }
      ],
      dataZoom: [
        {
          type: 'inside',
          start: 98,
          end: 100,
          minValueSpan: 10
        },
        {
          show: true,
          type: 'slider',
          bottom: 60,
          start: 98,
          end: 100,
          minValueSpan: 10
        }
      ],
      series: [
        {
          name: 'Dow-Jones index',
          type: 'custom',
          renderItem: aaa,
          dimensions: [null, 'open', 'close', 'lowest', 'highest'],
          encode: {
            x: 0,
            y: [1, 2, 3, 4],
            tooltip: [1, 2, 3, 4]
          },
          data: this.values
        }
      ]
    }
  }),
  methods: {
    doRandom () {
      const that = this
      let data = []
      for (let i = 0, min = 5, max = 99; i < 6; i++) {
        data.push(Math.floor(Math.random() * (max + 1 - min) + min))
      }
      that.loading = !that.loading
      that.bar.series[0].data = data
    },
    onReady (instance, ECharts) {
      console.log(instance, ECharts)
    },
    onClick (event, instance, ECharts) {
      console.log(arguments)
    },
    splitData (rawData) {
      this.categoryData = []
      this.values = []
      for (var i = 0; i < rawData.length; i++) {
        this.categoryData.push(rawData[i][0])
        rawData[i][0] = i
        this.values.push(rawData[i])
      }
      console.log(this.categoryData)
      this.option.xAxis[0].data = this.categoryData
      this.option.series[0].data = this.values
    },
    renderItem (params, api) {
      console.log(params)
      var xValue = api.value(0)
      var openPoint = api.coord([xValue, api.value(1)])
      var closePoint = api.coord([xValue, api.value(2)])
      var lowPoint = api.coord([xValue, api.value(3)])
      var highPoint = api.coord([xValue, api.value(4)])
      var halfWidth = api.size([1, 0])[0] * 0.35
      var style = api.style({
        stroke: api.visual('color')
      })

      return {
        type: 'group',
        children: [{
          type: 'line',
          shape: {
            x1: lowPoint[0],
            y1: lowPoint[1],
            x2: highPoint[0],
            y2: highPoint[1]
          },
          style: style
        }, {
          type: 'line',
          shape: {
            x1: openPoint[0],
            y1: openPoint[1],
            x2: openPoint[0] - halfWidth,
            y2: openPoint[1]
          },
          style: style
        }, {
          type: 'line',
          shape: {
            x1: closePoint[0],
            y1: closePoint[1],
            x2: closePoint[0] + halfWidth,
            y2: closePoint[1]
          },
          style: style
        }]
      }
    }
  },
  mounted () {
    let that = this
    axios('/static/quote.csv').then(function (response) {
    //   var results = Papa.parse(response.data)
      console.log(response)
      that.splitData(response.data)
    })
  }
}
</script>

<style scoped>
  .echarts {
    width: 100%;
    height: 800px;
  }
</style>
