<template>
  <div>
    <div>
      <md-datepicker v-model="selectedDate" />

    </div>
    <div>
      <md-field>
        <label>필터링 Percentage</label>
        <md-input v-model="std" type="number"></md-input>
        <md-button class="md-dense md-raised md-primary" @click="doFilter">FILTER!!</md-button>
      </md-field>
    </div>
  <div class="md-layout">
    <div class="md-layout-item">
      <md-list class="md-double-line">
        <md-subheader>PRE FILTER</md-subheader>

        <md-list-item v-for="(info, index) in prefilter" :key="index">
          <md-icon class="md-primary">phone</md-icon>
          <div class="md-list-item-text">
            <span>{{info.name}}</span>
            <span>{{info.market}} - {{info.id}}</span>
          </div>
          <md-badge class="md-square" :md-content="calcRatio(info.open, info.close)" />
          <md-button class="md-icon-button md-list-action" @click="addFilter(info)">
            <md-icon>arrow_right_alt</md-icon>
          </md-button>
        </md-list-item>

      </md-list>
    </div>
    <div class="md-layout-item">
      <md-list class="md-double-line">
        <md-subheader>FILTERED</md-subheader>

        <md-list-item v-for="(info, index) in filtered" :key="index">
          <md-icon class="md-primary">phone</md-icon>
          <div class="md-list-item-text">
            <span>{{info.market}} - {{info.id}}</span>
            <span>{{info.name}}</span>
          </div>
          <md-badge class="md-square" :md-content="calcRatio(info.open, info.close)" />
          <md-button class="md-icon-button md-list-action" @click="removeFilter(info)">
            <md-icon>remove_circle</md-icon>
          </md-button>
        </md-list-item>

      </md-list>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'trade_filter',
  data () {
    return {
      selectedDate: '2018-08-07',
      std: 15,
      filtered: [],
      prefilter: [
        {id: '008700', name: '아남전자', market: 'kospi', open: '3000', close: '4000', low: '2500', high: '4500'},
        {id: '008711', name: '삼성전자', market: 'kospi', open: '2000', close: '4000', low: '2500', high: '4500'},
        {id: '008722', name: '엘지전자', market: 'kospi', open: '3300', close: '4000', low: '2500', high: '4500'},
        {id: '008733', name: '금성전자', market: 'kospi', open: '3500', close: '4000', low: '2500', high: '4500'},
        {id: '008744', name: '소니전자', market: 'kospi', open: '3600', close: '4000', low: '2500', high: '4500'},
        {id: '008700', name: '아남전자', market: 'kospi', open: '2000', close: '4000', low: '2500', high: '4500'},
        {id: '008711', name: '삼성전자', market: 'kospi', open: '5000', close: '4000', low: '2500', high: '4500'},
        {id: '008722', name: '엘지전자', market: 'kospi', open: '2000', close: '4000', low: '2500', high: '4500'},
        {id: '008733', name: '금성전자', market: 'kospi', open: '1000', close: '4000', low: '2500', high: '4500'},
        {id: '008744', name: '소니전자', market: 'kospi', open: '2000', close: '4000', low: '2500', high: '4500'},
        {id: '008700', name: '아남전자', market: 'kospi', open: '3000', close: '4000', low: '2500', high: '4500'},
        {id: '008711', name: '삼성전자', market: 'kospi', open: '4000', close: '4000', low: '2500', high: '4500'},
        {id: '008722', name: '엘지전자', market: 'kospi', open: '5000', close: '4000', low: '2500', high: '4500'},
        {id: '008733', name: '금성전자', market: 'kospi', open: '6000', close: '4000', low: '2500', high: '4500'},
        {id: '008744', name: '소니전자', market: 'kospi', open: '3700', close: '4000', low: '2500', high: '4500'},
        {id: '008700', name: '아남전자', market: 'kospi', open: '3600', close: '4000', low: '2500', high: '4500'},
        {id: '008711', name: '삼성전자', market: 'kospi', open: '3500', close: '4000', low: '2500', high: '4500'},
        {id: '008722', name: '엘지전자', market: 'kospi', open: '3300', close: '4000', low: '2500', high: '4500'},
        {id: '008733', name: '금성전자', market: 'kospi', open: '3202', close: '4000', low: '2500', high: '4500'},
        {id: '008744', name: '소니전자', market: 'kospi', open: '3100', close: '4000', low: '2500', high: '4500'},
        {id: '008700', name: '아남전자', market: 'kospi', open: '1000', close: '4000', low: '2500', high: '4500'},
        {id: '008711', name: '삼성전자', market: 'kospi', open: '3000', close: '4000', low: '2500', high: '4500'},
        {id: '008722', name: '엘지전자', market: 'kospi', open: '3000', close: '4000', low: '2500', high: '4500'},
        {id: '008733', name: '금성전자', market: 'kospi', open: '3000', close: '4000', low: '2500', high: '4500'},
        {id: '008744', name: '소니전자', market: 'kospi', open: '3000', close: '4000', low: '2500', high: '4500'}
      ]
    }
  },
  methods: {
    calcRatio (open, close) {
      return ((close - open) / open * 100).toFixed(1)
    },
    doFilter: function () {
      const that = this
      // this.prefilter.concat(this.filtered)
      this.filtered = []
      this.prefilter.forEach(function (item) {
        if ((that.calcRatio(item.open, item.close)) >= that.std) {
          that.filtered.push(item)
        }
      })
    },
    addFilter (info) {
      if (this.filtered.indexOf(info) === -1) {
        this.filtered.push(info)
      }
    },
    removeFilter (info) {
      this.filtered = this.filtered.filter(item => item !== info)
    }
  }
}
</script>

<style lang="scss" scoped>
  .md-list {
    width: 320px;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
    border: 1px solid rgba(#000, .12);
  }

  li {
    list-style-type: none;
  }

  .md-double-line {
    width: 90%;
  }

  .md-list-item {
    height: 100%;
  }
</style>
