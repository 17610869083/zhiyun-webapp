<template>
        <div class="topic-setting">
           <div class="topic-add-input" v-for="(item,index) in topicList" :key="index">
                <span @click="editwarning(item.topicid)" class="subject">{{item.topicname}}</span>
                <x-icon type="ios-close" size="26" v-show="delKeywordState" @click="delWarning(item.topicid)"
                class="del-keyword"
                ></x-icon>
           </div>
        </div>
</template>
<script type="text/ecmascript-6">
import request from '@/utils/request'
import {api_get_topicMemu,api_del_topic,api_get_topicRule} from '@/services/api'
import {topicSettingSwitch,getTime} from '@/utils/format'
import { mapState } from 'vuex'
export default {
    name:"topic-setting",
    data(){
        return {
            topicList:[]
        }
    },
    computed:{
        ...mapState({
             delKeywordState: state => state.delKeyword
          })    
    },
    beforeDestroy(){
        this.$store.commit('showDelBtn',false)
    },
    methods:{
         editwarning(id){
                  request(api_get_topicRule +`&topicid=${id}`)
                  .then(res=>{
                      if(res.data){
                        this.$store.commit('addTopicName',{'topicName':res.data.topicname,'begin':getTime(res.data.topicbdate.time) ,'End':getTime(res.data.topicedate.time),'rule':res.data.rulearr})
                        this.$router.push({path:'/topic/add',query:{topicid:id}});
                      }                     
                  }) 
         },
         delWarning(id){
            const _this=this
            this.$vux.confirm.show({
                content:'是否将选中项删除？',
                onConfirm(){
                        request(api_del_topic +`&topicid=${id}`)
                        .then(res=>{
                            request(api_get_topicMemu)
                            .then(res=>{
                                if(res.data) _this.topicList=topicSettingSwitch(res.data);
                            })
                        })
                }
            })
         }
    },
    created(){
             request(api_get_topicMemu)
             .then(res =>{
                  if(res.data) this.topicList=topicSettingSwitch(res.data);
             })
    }
}
</script>
<style scope lang="less">
   .topic-setting{
         font-size: 0.28rem;
         background: #e6e6e6;
         padding:0.36rem 0.24rem; 
         min-height: 100%;
         .addTopic{
            position: fixed;
            top: 12px;
            right: 8px;
            z-index: 200;
            font-size: 0.26rem;
            color: #ffffff;
         }
         .topic-add-input{
             background: #ffffff; 
             height: 0.94rem;
             line-height: 0.94rem;
             margin-bottom: 0.14rem;
             border-radius:0.06rem; 
             display: flex;
             justify-content: space-between; 
             align-items: center;
             padding: 0 0.46rem;
             .subject{
                 width: 60%;
             }
             .del-keyword{
                  fill:#2d324f;
             }
        }
   }
</style>
