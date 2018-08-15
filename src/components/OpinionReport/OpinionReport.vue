<template>
  <div class="opinion-report">
    <ul>
      <li v-for="report in reportList" :key="report.id" class="report-item">
        <div class="left" @click="goReportDetail(report.status,report.new,report.id)">
          {{report.reportname}}
          <div class="time">{{report.new === '1'?report.updateTime:report.reportdate}} </div>
        </div>
        <div class="right" v-if="showReport">
              <x-icon type="ios-close" size="26" class="del-keyword" @click="delReport(report.id)"
              ></x-icon>
        </div>
        <div class="right" @click="goReportDetail(report.status,report.new,report.id)" v-else>
          <span>查看</span>
          <icon-svg type="icon-chevron-right" color="#b0b0b0" size="22"></icon-svg>
        </div>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
import request from '@/utils/request'
import IconSvg from '@/base/IconSvg/IconSvg'
import {api_get_reportList,api_preview_workApp,baseHost,api_del_report,api_new_report} from '@/services/api'
import {getHourTime} from '@/utils/format'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'opinion-report',
  data() {
    return {
      reportList: [],
      page:1
    }
  },
  created() {
    let _this = this;
    request(api_get_reportList).then(res => {
      res.data.reportList.forEach((item) => {
            if(item.reportdate) item.reportdate=item.reportdate === ''?'':getHourTime(item.reportdate)
            if(item.updateTime) item.updateTime=item.updateTime === ''?'':getHourTime(item.updateTime)
      })
      this.reportList = res.data.reportList
    })
    document.querySelector('#vux_view_box_body').addEventListener('scroll', _this.handleScroll,true);
  },
  beforeDestroy(){
      this.$store.commit('showReportBtn',false)  
  },
  computed:{
     ...mapState({
         showReport: state => state.delReport
     })
  },
  methods: {
    ...mapMutations({
      setOriginalUrl: 'SET_ORIGINAL_URL'
    }),
    handleScroll(e){
      let bScrollH = e.target.scrollHeight;
      if(e.target.scrollTop + e.target.clientHeight >= bScrollH){
          request(api_get_reportList +`&page=${this.page+1}`).then(res => {
                if(res.data){
                     this.reportList = this.reportList.concat(res.data.reportList)
                     this.page = this.page+1
                }
          })
      }
    },
    goReportDetail(status,isnew,id) {
         if(status === '2'){
             if(isnew === '1'){
                 request(api_new_report +`&reportId=${id}&dType=html`).then(res => {
                  if (res.data) {
                    this.setOriginalUrl(baseHost + res.data.fileAddress)
                  }else{
                    this.setOriginalUrl('')
                  }
                  this.$router.push('/original-text')
                  })
             }else{
                request(api_preview_workApp +`&reportid=${id}`).then(res => {
                  const url = baseHost.substring(0, baseHost.length - 1)
                  if (res.data) {
                    this.setOriginalUrl(url + res.data.downloadUrl)
                  }else{
                    this.setOriginalUrl('')
                  }
                  this.$router.push('/original-text')
                })
             }

         }else{
                this.$vux.alert.show({
                  title: '该报告未生成成功',
                  onHide(){
                       
                  }
                })
         }

    },
    delReport(id){
          request(api_del_report +`&reportid=${id}`)
          .then(res => {
              if(res.data.code === 1){
                      request(api_get_reportList + '&pagesize=100&page=1').then(res => {
                      res.data.reportList.forEach((item) => {
                            item.reportdate=getHourTime(item.reportdate)
                      })
                      this.reportList = res.data.reportList
                    })
              }
          })
    }
  },
  components: {
    IconSvg
  }
}
</script>

<style scoped lang="less">
  .opinion-report {
    background-color: #efefef;
    font-size: 0.28rem;
    min-height: 100%;
    padding: 0.3rem 0;
    .report-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 1rem;
      border-radius: 0.06rem;
      margin-left: 0.2rem;
      margin-right: 0.2rem;
      background-color: #ffffff;
      margin-bottom: 0.3rem;
      .left {
        margin-left: 0.56rem;
        .time{
            font-size: 0.24rem;
            color:#bcbcbc;
        }
      }
      .right {
        margin-right: 0.28rem;
        display: flex;
        align-items: center;
        color:#bcbcbc;
        .del-keyword{
            fill:#2d324f;
        }
      }
    }
  }
</style>
