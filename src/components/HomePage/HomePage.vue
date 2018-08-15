<template>
  <div class="home-page" ref="homeRef" @touchmove="touch">
    <div class="top">
      <div class="count" ref="countRef">
        <div class="wrapper" @click="today">
          <icon-svg type="icon-earth" color="#2d324f" size="26"></icon-svg>
          <h2 >{{todayCount[4]['总数']}}</h2>
          <span >今日舆情</span>
        </div>
        <div class="wrapper" @click="todaywarin">
          <icon-svg type="icon-warning1" color="#2d324f" size="26"></icon-svg>
          <h2 >{{todayCount[3]['预警']}}</h2>
          <span >今日预警</span>
        </div>
        <div class="wrapper" @click="todaynegtive">
          <icon-svg type="icon-warning" color="#2d324f" size="26"></icon-svg>
          <h2 >{{todayCount[2]['负面']}}</h2>
          <span >今日负面</span>
        </div>
        <div class="wrapper">
          <icon-svg type="icon-chartline" color="#2d324f" size="26"></icon-svg>
          <h2 >{{yesterdayCount[2]['负面']-todayCount[2]['负面']}}</h2>
          <span >负面增长</span>
        </div>
      </div>
    </div>
    <div class="bottom" ref="picRef">
      <div class="watch box" @click="goPage(2)">
        <div class="wrapper">
          <icon-svg type="icon-msnui-report-data" color="#ffffff" size="48"></icon-svg>
          <h2>舆情</h2>

        </div>
      </div>
      <div class="opinion box" @click="goPage(1)">
        <div class="wrapper">
          <icon-svg type="icon-jiancedianduibifenxi" color="#ffffff" size="38"></icon-svg>
          <h2>监测</h2>
        </div>
      </div>
      <div class="report box" @click="goPage(3)">
        <div class="wrapper">
          <icon-svg type="icon-baobiaofenxi" color="#ffffff" size="38"></icon-svg>
          <h2>分析</h2>
        </div>
      </div>
      <div class="search box" @click="goPage(4)">
        <div class="wrapper">
          <icon-svg type="icon-plus-datareport" color="#ffffff" size="38"></icon-svg>
          <h2>报告</h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import IconSvg from '@/base/IconSvg/IconSvg'
  import request from '@/utils/request'
  import {baseHost,api_get_userInfo} from '@/services/api'
  export default {
    name: 'home-page',
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
      const info = await request(api_get_userInfo)
      this.$store.commit('USER_INFO',info.data)

    },
    // mounted(){
    //    this._calcHeight()
    // },
    computed: {
      todayCount() {
        return this.count['今日舆情']
      },
      yesterdayCount() {
        return this.count['昨日舆情']
      }
    },
    methods: {
      touch(event){
           event.preventDefault();
      },
      _calcHeight() {
        const home = this.$refs.homeRef.getBoundingClientRect()
        const count = this.$refs.countRef.getBoundingClientRect()
        const pic = this.$refs.picRef
        const picHeight = home.height - count.height
        pic.style.height = picHeight + 'px'
      },
      goPage(page) {
        if (page === 1) {
          this.$router.push('/watch')
        } else if (page === 2) {
          this.$router.push('/situation')
        } else if (page === 3) {
          this.$router.push('/analysis')
        } else if (page === 4) {
          this.$router.push('/report')
        } else {
          this.$router.push('/home')
        }
      },
      today(){
        this.$store.commit('SEARCH_PARAM',{filterValue:1,sortValue:'timedown',timeValue:'today',trendValue:'all',keyword:'',carry:'全部',page:1,sortIndex:0})
        this.$router.push('/watch')
      },
      todaynegtive(){
        this.$store.commit('SEARCH_PARAM',{filterValue:1,sortValue:'timedown',timeValue:'today',trendValue:1,keyword:'',carry:'全部',page:1,sortIndex:1})
        this.$router.push('/watch')
      },
      todaywarin(){
        this.$store.commit('SEARCH_PARAM',{filterValue:1,sortValue:'timedown',timeValue:'today',trendValue:2,keyword:'',carry:'全部',page:1,sortIndex:1})
        this.$router.push('/watch')
      }
    },
    components: {
      IconSvg
    }
  }
</script>

<style scoped lang="less">
  .home-page {
    font-size: 0.28rem;
    color: #ffffff;
    height: 100%;
    width: 100%;
    background: #efefef;
    padding:0.16rem;
    .top {
      width: 95%;
      height: 30%;
      background: url("./home.jpg") no-repeat;
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      .count {
        height: 1.6rem;
        width: 90%;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .wrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          span{
              font-size: 0.24rem;
              color:#2d324f;
          }
          h2 {
            font-size: 0.28rem;
            color:#2d324f;
          }
        }
      }
    }
    .bottom {
      width: 95%;
      height: 68%;
      position: relative;
      .box {
        display: flex;
        justify-content: center;
        align-items: center;
        .wrapper {
          text-align: center;
          h2 {
            font-size: 0.36rem;
            font-weight: 400;
            
          }
        }
      }
      .watch {
        position: absolute;
        top: 0;
        width: 49%;
        height: 53%;
        background: #94d36a;
        margin: 0.1rem 0.1rem 0.1rem 0;
      }
      .opinion {
        position: absolute;
        left: 50%;
        top: 0;
        width: 49%;
        height: 43%;
        background: #ee6c4c;
        margin: 0.1rem;
      }
      .report {
        position: absolute;
        left: 0;
        top: 55%;
        height: 43%;
        width: 49%;
        background: #f1ae43;
        margin: 0.1rem 0.1rem 0.1rem 0;
      }
      .search {
        position: absolute;
        top: 45%;
        left: 50%;
        width: 49%;
        height: 53%;
        background: #3296d2;
        margin: 0.1rem;
      }
    }
  }
</style>
