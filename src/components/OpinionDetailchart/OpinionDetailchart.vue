<template>
    <div class="opinion-detail-chart vux-1px-b">
       <chart :options="options" ref="echarts" :autoResize="resize"></chart>
    </div>
</template>
<script type="text/ecmascript-6">
import Echarts from 'vue-echarts/components/ECharts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
export default {
    name:'opinion-detail-chart',
    data(){
        return {
           resize:true,
           options:{  
            grid:{
                left:'20%',
                top : 20, 
                bottom: 30 
                },   
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed'],
                offset:20
            },
            yAxis: {
              type: 'value',
              splitNumber:4
            },
            series: [{data: [120, 200, 150],type: 'bar'}] 
           }   
        }       
    },     
    props:['echartData'],
    watch:{
       echartData(data){
            this.options = Object.assign({}, this.options, {xAxis:data.xAxis,series:data.series})
       }
    },
    components:{
        chart:Echarts
    }
}
</script>
<style scope lang="less">
    .opinion-detail-chart{
        width: 100%;
        height:3rem;
        padding:0;
    }
</style>
