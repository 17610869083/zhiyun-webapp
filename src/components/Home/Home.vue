<template>
  <div class="home" ref="homeRef">
    <div class="title" ref="titleRef">
      <div class="rectangle">
        中国互联网感知产品及解决方案提供商
      </div>
      <div class="triangle">
        <img src="./triangle.png" alt="" width="100%" height="100%">
      </div>
    </div>
    <div class="count" ref="countRef">
      <div class="wrapper">
        <icon-svg type="icon-earth" color="#2d324f" size="28"></icon-svg>
        <h2>{{todayCount[4]['总数']}}</h2>
        <span>今日舆情</span> 
      </div>
      <div class="wrapper">
        <icon-svg type="icon-warning1" color="#2d324f" size="28"></icon-svg>
        <h2>{{todayCount[3]['预警']}}</h2>
        <span>今日预警</span>
      </div>
      <div class="wrapper">
        <icon-svg type="icon-warning" color="#2d324f" size="28"></icon-svg>
        <h2>{{todayCount[2]['负面']}}</h2>
        <span>今日负面</span>
      </div>
      <div class="wrapper">
        <icon-svg type="icon-chartline" color="#2d324f" size="28"></icon-svg>
        <h2>{{yesterdayCount[2]['负面']-todayCount[2]['负面']}}</h2>
        <span>负面增长</span>
      </div>
    </div>
    <div class="pic" ref="picRef">
      <div class="watch" @click="goPage(1)"></div>
      <div class="opinion" @click="goPage(2)"></div>
      <div class="report" @click="goPage(3)"></div>
      <div class="search" @click="goPage(4)"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import IconSvg from '@/base/IconSvg/IconSvg'
  import request from '@/utils/request'
  import {baseHost} from '@/services/api'
  export default {
    name: 'home',
    data() {
      return {
        count: {
          '今日舆情': [
            {'正面':0},
            {'中性':0},
            {'负面':0},
            {'预警':0},
            {'总数':0}
          ],
          '昨日舆情': [
            {'正面':0},
            {'中性':0},
            {'负面':0},
            {'预警':0},
            {'总数':0}
          ]
        }
      }
    },
    async created() {
      const res = await request(baseHost + 'webpart/main/DocSearchDo?action=mainCountDay')
      this.count = res.data
      console.log(this.count)
    },
    mounted() {
      this._calcHeight()
    },
    methods: {
      _calcHeight() {
        const home = this.$refs.homeRef.getBoundingClientRect()
        const title = this.$refs.titleRef.getBoundingClientRect()
        const count = this.$refs.countRef.getBoundingClientRect()
        const pic = this.$refs.picRef
        const picHeight = home.height - title.height - count.height
        pic.style.height = picHeight + 'px'
        pic.style.width = '100%'
        pic.style.backgroundImage = 'url(http://p4nbsa4s3.bkt.clouddn.com/pic.png)'
        pic.style.backgroundSize = '100% 100%'
        pic.style.backgroundRepeat = 'no-repeat'
      },
      goPage(page) {
        if (page === 1) {
          this.$router.push('/watch')
        } else if (page === 2) {
          this.$router.push('/watch')
        } else if (page === 3) {
          this.$router.push('/report')
        } else if (page === 4) {
          this.$router.push('/watch')
        } else {
          this.$router.push('/home')
        }
      }
    },
    computed: {
      todayCount() {
        return this.count['今日舆情']
      },
      yesterdayCount() {
        return this.count['昨日舆情']
      }
    },
    components: {
      IconSvg
    }
  }
</script>

<style scoped lang="less">
  .home {
    font-size: 0.24rem;
    height: 100%;
    .title {
      color: #ffffff;
      .rectangle {
        background-color: #3e4464;
        height: 0.6rem;
        text-align: center;
        line-height: 0.9rem;
        font-size: 0.22rem;
      }
      .triangle {
      }
    }
    .count {
      height: 2rem;
      width: 100%;
      background-image: url("./city1.png");
      background-repeat: no-repeat;
      background-size: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      color: #2d324f;
      .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
    .pic {
      position: relative;
      .watch {
        position: absolute;
        width: 50%;
        height: 45%;
      }
      .opinion {
        position: absolute;
        left: 50%;
        top: 0;
        width: 50%;
        height: 55%;
      }
      .report {
        position: absolute;
        left: 0;
        top: 45%;
        height: 55%;
        width: 50%;
      }
      .search {
        position: absolute;
        top: 55%;
        left: 50%;
        width: 50%;
        height: 45%;
      }
    }
  }
</style>
