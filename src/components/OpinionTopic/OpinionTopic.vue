<template>
     <div class="opinion-topic">
        <div v-for="(item,index) in topicMemu" :key="index">
            <p class="categoryFileName">{{item.catname}}</p>
            <div class="categoryList" v-for="(items,indexs) in item.topicList" :key="indexs">
                <div class="topicListBox">
                    <div class="topicFile">
                    <span class="topicFileName">{{ items.topicname }}</span>
                    </div>
                    <div class="topicChart">
                        <span @click="goTopicList(items.topicid,items.topicname)">
                            <Icon type="icon-wenjian" color="#f1c100" size="20"></Icon>
                            <span>舆情详情</span>
                        </span>
                        <span class="topicFileName" @click="goTopicChart(items.topicid,items.topicname)">
                            <Icon type="icon-tubiao_zhexiantu" color="#ec1e1e" size="20"></Icon>
                            <span>图表分析</span>
                        </span>
                    </div>                            
                </div>  
            </div>
        </div>
     </div>
</template>
<script type="text/ecmascript-6">
import request from '@/utils/request'
import {api_get_topicMemu} from '@/services/api'
import Icon from '@/base/IconSvg/IconSvg'
export default {
    name:'opinion-topic',
      data(){
          return {
               topicMemu: ['贵州','舆情']
          }
      },

      created(){
            request(api_get_topicMemu).then(res=>{
                   if(res.data){
                       this.topicMemu=res.data;
                   }                 
            })
      },
      methods:{
          goTopicList(topicid,topicname){
            this.$router.push({path:'/topic/detail',query:{type:'topic',topicid:topicid,topicname:topicname}})
          },
          goTopicChart(topicid,topicname){
               this.$router.push({path:'/topic/chart',query:{topicid:topicid,topicname:topicname}})
          }
      },
      components:{
          Icon
      }
}
</script>
<style scoped lang="less">
   .opinion-topic{
         font-size: 0.26rem;
         background: #e6e6e6;
         padding:0.28rem 0.26rem; 
         min-height: 100%;
         .categoryFileName{
             padding-left:0.26rem;
         }
        .categoryList{
                .topicListBox{
                     height: 1.18rem;
                     border-top:4px solid #2d324f;
                     background: #ffffff;
                     margin: 0.22rem 0;
                     border-radius:4px 4px 8px 8px;
                     padding:0 0.22rem;
                     .topicFile{
                         border-bottom:1px solid #e6e6e6;
                         height: 0.6rem;
                         line-height: 0.6rem; 
                     }
                     .topicChart{
                         height: 0.58rem;
                         line-height: 0.58rem;
                         font-size: 0.24rem;
                         color:#8d8d8d;
                         display: flex;
                         justify-content: space-between;
                     }
                  }
        }
   }

</style>
