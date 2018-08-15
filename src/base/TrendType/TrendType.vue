<template>
  <span :class="trendClass">{{trendType}}</span>
</template>

<script>
  export default {
    name: 'trend-type',
    props: {
      trend: {
        default: 0
      }
    },
    computed: {
      trendType() {
        const text = ['正面', '中性', '负面', '预警']
        return text[this.trend + 1]
      },
      trendClass() {
        if (this.trend === -1) {
          return 'position'
        } else if (this.trend === 0) {
          return 'neutral'
        } else if (this.trend === 1) {
          return 'negative'
        } else {
          return 'warning'
        }
      }
    }
  }
</script>

<style scoped lang="less">
  span {
    width: 28px;
    height: 11px;
    color: #ffffff;
    border-radius: 3px;
    font-size: 0.22rem;
    padding-left: 5px;
    padding-right: 5px;
  }
  .position {
    color: rgb(0, 122, 255);
  }
  .neutral {
    color: rgb(0, 140, 33);
  }
  .negative {
    color: rgb(233, 0, 0);
  }
  .warning {
    color: rgb(255, 210, 0);
  }
</style>
