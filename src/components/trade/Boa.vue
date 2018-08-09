<template>
  <div class="page-container page-guide">
    <div>
      <md-field>
        <label>하이퍼파라미터1</label>
        <md-input v-model="hp1" type="number"></md-input>
      </md-field>
      <md-field>
        <label>하이퍼파라미터2</label>
        <md-input v-model="hp2" type="number"></md-input>
      </md-field>
      <md-field>
        <label>하이퍼파라미터3</label>
        <md-input v-model="hp3" type="number"></md-input>
      </md-field>
      <md-field>
        <label>하이퍼파라미터4</label>
        <md-input v-model="hp4" type="number"></md-input>
      </md-field>
      <md-button class="md-dense md-raised md-primary">RUN!!</md-button>
    </div>
    <div class="echarts">
      <IEcharts
        :option="option"
        :loading="loading"
        @ready="onReady"
        @click="onClick"
      />
      <button @click="doRandom">Random</button>
    </div>

  </div>
</template>

<script type="text/babel">
// import Papa from 'papaparse'
import axios from 'axios'
import IEcharts from 'vue-echarts-v3/src/full.js'

var upColor = '#00da3c'
var downColor = '#ec0000'

function calculateMA (dayCount, data) {
  var result = []
  for (var i = 0, len = data.values.length; i < len; i++) {
    if (i < dayCount) {
      result.push('-')
      continue
    }
    var sum = 0
    for (var j = 0; j < dayCount; j++) {
      sum += data.values[i - j][1]
    }
    result.push(+(sum / dayCount).toFixed(3))
  }
  return result
}

let option = {
  backgroundColor: '#fff',
  animation: false,
  legend: {
    bottom: 10,
    left: 'center',
    data: ['Dow-Jones index', 'MA5', 'MA10', 'MA20', 'MA30']
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
    }
    // extraCssText: 'width: 170px'
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
  brush: {
    xAxisIndex: 'all',
    brushLink: 'all',
    outOfBrush: {
      colorAlpha: 0.1
    }
  },
  visualMap: {
    show: false,
    seriesIndex: 5,
    dimension: 2,
    pieces: [{
      value: 1,
      color: downColor
    }, {
      value: -1,
      color: upColor
    }]
  },
  grid: [
    {
      left: '10%',
      right: '8%',
      height: '50%'
    },
    {
      left: '10%',
      right: '8%',
      top: '63%',
      height: '16%'
    }
  ],
  xAxis: [
    {
      type: 'category',
      data: [],
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
    },
    {
      type: 'category',
      gridIndex: 1,
      data: [],
      scale: true,
      boundaryGap: false,
      axisLine: {onZero: false},
      axisTick: {show: false},
      splitLine: {show: false},
      axisLabel: {show: false},
      splitNumber: 20,
      min: 'dataMin',
      max: 'dataMax'
      // axisPointer: {
      //     label: {
      //         formatter: function (params) {
      //             var seriesValue = (params.seriesData[0] || {}).value;
      //             return params.value
      //             + (seriesValue != null
      //                 ? '\n' + echarts.format.addCommas(seriesValue)
      //                 : ''
      //             );
      //         }
      //     }
      // }
    }
  ],
  yAxis: [
    {
      scale: true,
      splitArea: {
        show: true
      }
    },
    {
      scale: true,
      gridIndex: 1,
      splitNumber: 2,
      axisLabel: {show: false},
      axisLine: {show: false},
      axisTick: {show: false},
      splitLine: {show: false}
    }
  ],
  dataZoom: [
    {
      type: 'inside',
      xAxisIndex: [0, 1],
      start: 98,
      end: 100
    },
    {
      show: true,
      xAxisIndex: [0, 1],
      type: 'slider',
      top: '85%',
      start: 98,
      end: 100
    }
  ],
  series: [
    {
      name: 'Dow-Jones index',
      type: 'candlestick',
      data: [],
      itemStyle: {
        normal: {
          color: upColor,
          color0: downColor,
          borderColor: null,
          borderColor0: null
        }
      },
      tooltip: {
        formatter: function (param) {
          param = param[0]
          return [
            'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
            'Open: ' + param.data[0] + '<br/>',
            'Close: ' + param.data[1] + '<br/>',
            'Lowest: ' + param.data[2] + '<br/>',
            'Highest: ' + param.data[3] + '<br/>'
          ].join('')
        }
      }
    },
    {
      name: 'MA5',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        normal: {opacity: 0.5}
      }
    },
    {
      name: 'MA10',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        normal: {opacity: 0.5}
      }
    },
    {
      name: 'MA20',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        normal: {opacity: 0.5}
      }
    },
    {
      name: 'MA30',
      type: 'line',
      data: [],
      smooth: true,
      lineStyle: {
        normal: {opacity: 0.5}
      }
    },
    {
      name: 'Volume',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: []
    }
  ]
}

export default {
  name: 'bsa',
  components: {
    IEcharts
  },
  props: {
  },
  data: () => ({
    data: [],
    option: option,
    hp1: 50,
    hp2: 30,
    hp3: 1,
    hp4: 5

  }),
  methods: {
    getCategoryData () { return this.data ? this.data.categoryData : [] },

    splitData (rawData) {
      console.log(rawData[0])
      var categoryData = []
      var values = []
      var volumes = []
      for (var i = 0; i < rawData.length; i++) {
        categoryData.push(rawData[i].splice(0, 1)[0])
        values.push(rawData[i])
        volumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][1] ? 1 : -1])
      }
      this.data = {
        categoryData: categoryData,
        values: values,
        volumes: volumes
      }

      this.option.xAxis[0].data = categoryData
      this.option.xAxis[1].data = categoryData

      this.option.series[0].data = values
      this.option.series[1].data = calculateMA(5, this.data)
      this.option.series[2].data = calculateMA(10, this.data)
      this.option.series[3].data = calculateMA(20, this.data)
      this.option.series[4].data = calculateMA(30, this.data)
      this.option.series[5].data = values
    }
  },
  mounted () {
    // axios('/static/quote.csv').then((response) => {
    //   // console.log(response.data)
    //   // var results = Papa.parse(response.data, {download: true})
    //   // console.log(results)
    //   this.splitData(response.data)
    // })

    axios('/static/boa.json').then((response) => {
      // console.log(response.data)
      // var results = Papa.parse(response.data, {download: true})
      // console.log(results)
      this.splitData(response.data)
    })

    IEcharts.dispatchAction({
      type: 'brush',
      areas: [
        {
          brushType: 'lineX',
          coordRange: ['2016-06-02', '2016-06-20'],
          xAxisIndex: 0
        }
      ]
    })
  }
}
</script>

<style scoped>
.page-container {
  width:100%;
}
  .echarts {
    width: 100%;
    height: 800px;
  }
</style>
