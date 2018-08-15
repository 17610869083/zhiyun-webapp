<template>
      <div class="opinion-topic-chart">
             <div v-if="showBlankPage" class="showBlank">
                 <img :src="imgUrl" alt="暂无数据">
                  暂无图表数据
             </div>
             <div v-else>
             <p>时间分布</p>
             <div class="chartBox">
                <div v-if="showTime" class="blankPage">
                    <img :src="imgUrl" alt="暂无数据">
                    近{{time}}暂无图表数据
                </div>
                <chart :options="timeDistribution" v-else></chart>
             </div>
             <p>媒体类型倾向性分析</p>
             <div class="chartBox">
                <div v-if="showType" class="blankPage">
                    <img :src="imgUrl" alt="暂无数据">
                     暂无图表数据
                </div>
                <chart :options="typeAnalysis" v-else></chart>
             </div>
             <p>倾向性分析</p>
             <div class="chartBox">
                <div v-if="showTend" class="blankPage">
                    <img :src="imgUrl" alt="暂无数据" class="blankPage">
                     暂无图表数据
                </div> 
                <chart :options="tendenciesAnalysis" v-else></chart>
             </div>
             </div>
      </div>
</template>
<script type="text/ecmascript-6">
import request from '@/utils/request'
import {api_get_showTimeDistributionECharts,api_get_showTypeAnalysisECharts,api_get_showTendenciesAnalysisECharts} from '@/services/api'
import Echarts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import {topicPieSwitch,topicLine} from '@/utils/format'
import imgUrl from '@/assets/webwxgetmsgimg2.jpg'
export default {
    name:'opinion-topic-chart',
    data(){
        return{
             showTime:false,
             showType:false,
             showTend:false,
             imgUrl:imgUrl,
             time:1,
             timeDistribution:{
                color: ['#ece900','#003366', '#45d100', '#ffa507','#ec0000'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data:[]
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '6%',
                    top:30,
                    bottom:20,
                    containLabel: true
                },
                xAxis : [{
                        type : 'category',
                        boundaryGap : false,
                        data : ['周一','周二','周三','周四','周五','周六','周日']
                    }],
                yAxis :{
                        type : 'value',
                        nameGape:100
                    } ,
                series : []
             },
             typeAnalysis:{
                    color: ['#003366', '#45d100', '#ffa507','#ec0000'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: []
                    },
                    grid: {
                    left: '20%',
                    top:30,
                    bottom:30
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center',
                        feature: {
                            mark: {show: true},
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            axisTick: {show: false},
                            data: ['2012', '2013', '2014', '2015', '2016']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: []
                },
             tendenciesAnalysis:{
                    color: ['#003366', '#45d100', '#ffa507','#ec0000'],
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        data: []
                    },
                    series : [
                        {
                            name: '倾向性',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '50%'],
                            data:[],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                }
       
       
       
       }
    },
    computed:{
        showBlankPage(){
              if(this.showTime && this.showType && this.showTend){
                  return true
              }else{
                  return false
              }
        }
    },
    created(){
        let topicid = this.$route.query.topicid;
         request(api_get_showTimeDistributionECharts + '&topicId=' + topicid)
         .then(res=>{
               if(res.data.code===1){
                   this.timeDistribution.series=topicLine(res.data.series);
                   this.timeDistribution.xAxis[0]=res.data.xAxis;
               }else{
                   this.showTime=true
                   this.time=res.data.days
               }
               request(api_get_showTypeAnalysisECharts + '&topicId=' + topicid)
               .then(res=>{
                     if(res.data.code===1){
                         this.typeAnalysis.series= res.data.series;
                         this.typeAnalysis.xAxis[0]=res.data.xAxis;
                     }else{
                       this.showType=true
                     }
                     request(api_get_showTendenciesAnalysisECharts + '&topicId=' + topicid)
                     .then(res=>{
                          if(res.data.code===1){
                              this.tendenciesAnalysis.series[0]['data']=topicPieSwitch(res.data);
                          }else{
                              this.showTend=true
                          }
                     })
               })
         })
    },
    components:{
        chart:Echarts
    }
}
</script>
<style scope lang="less">
     .opinion-topic-chart{
           background: #efefef;
           font-size: 0.28rem;
           width: 100%;
           height:100%;
           overflow: auto;
           padding-top:0.2rem;
           .showBlank{
               background: #ffffff;
               width: 100%;
               height: 100%;
               text-align: center;
               padding-top:50%;
               img{
                   width: 50%;
                   margin:0 auto;
                   display: block;
               }
           }
           p{
               padding: 0.2rem 0  0.2rem 0.26rem;
           }
           .chartBox{
               background: #ffffff;
               border-radius:6px;
               height:3.6rem;
               width: 90%;
               margin:0 auto;
               .blankPage{
                   text-align: center;
                   padding-top:0.3rem;
                   img{
                       width: 50%;
                       margin: 0 auto;
                       display: block;
                   }
               }
           }
     }
</style>

