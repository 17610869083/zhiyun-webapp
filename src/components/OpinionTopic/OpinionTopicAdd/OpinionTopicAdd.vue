<template>
      <div class="opinion-topic-add">
           <div class="topic-add-input">
               <span>专题名称：</span>
               <input type="text" placeholder="请输入专题名称" v-model="topicName">
           </div>
           <div class="topic-add-input">
               <span>开始时间：</span>
                <datetime
                v-model="addDateStart"
                @on-cancel="onCancelStart"
                @on-confirm="onConfirmStart"
                >               
                <input type="text" onfocus='this.blur();' placeholder="请选择时间" v-model="addDateStart" >
              </datetime>
           </div>
           <div class="topic-add-input">
               <span>结束时间：</span>
                <datetime
                v-model="addDateEnd"
                @on-cancel="onCancelStart"
                @on-confirm="onConfirmStart">
                <input type="text"  onfocus='this.blur();' placeholder="请选择时间" v-model="addDateEnd" >
              </datetime>
           </div>
           <div class="keyword-setting">关键词设置</div>
            <div class="topic-add-input" v-for="(item,index) in topicrule" :key="index">
              <span class="subject" @click="goTopicSetting(index)">{{item.rule1}}</span>
              <x-icon type="ios-minus" size="26" class="del-keyword"
              @click="delKeyword(index,item.id)"
              ></x-icon>
            </div>
           <div class="topic-add-input">
              <span @click="goKeywordSetting">请添加关键词</span>
              <x-icon type="ios-plus" size="26" class="del-keyword"
              @click="goKeywordSetting"
              ></x-icon>
           </div>
           <div>
                <div class="trueBtn" @click="submitTopic">确定</div>
           </div>
            <alert v-model="showAlert" >开始时间请不要大于结束时间</alert>
      </div>
</template>
<script type="text/ecmascript-6">
import {Datetime,AlertModule,Alert} from 'vux'
import {getSecondTime} from '@/utils/format'
import { mapState } from 'vuex'
import request from '@/utils/request'
import {api_add_topic,api_get_topicRule,api_del_topicRule,api_edit_topic} from '@/services/api'
  export default {
        name:'opinion-topic-add',
        data(){
            return {
                topicName:'',
                addDateStart:'',
                addDateEnd:'',
                showAlert:false,
                topicrule:[],
                topicid:0
            }
        },
        beforeRouteLeave(to, from, next) {
            if(to.path === '/topicSetting'){
                this.$store.commit('addTopicName',{'topicName':'','begin':'','End':'','rule':[]})
                next()
            } else {
                next()
            }
        },
        computed:{
        ...mapState({
             rule: state => state.topicRule
          })    
        },
        created(){  
                let topicid=this.$route.query.topicid;
                if (topicid!==undefined) this.topicid=topicid
                this.topicName=this.rule.topicName;
                this.addDateStart=this.rule.begin;
                this.addDateEnd=this.rule.End;
                this.topicrule=this.rule.rule;     
        },
        methods:{
            onCancelStart(){

            },
            onConfirmStart(){
            },
            goTopicSetting(index){
                 this.$router.push({path:'/topic/setting',query:{ruleindex:index}})
            },
            goKeywordSetting(){              
                if(getSecondTime(this.addDateStart)>=getSecondTime(this.addDateEnd)){
                      this.showAlert = true
                }else{
                    this.$store.commit('addTopicName',{'topicName':this.topicName,'begin':this.addDateStart ,'End':this.addDateEnd ,'rule':this.topicrule})
                    this.$router.push('/topic/setting')
                }
            },
            delKeyword(index,id){   
                    if(this.topicid!==0){
                        request(api_del_topicRule +`&ruleid=${id}`)
                        .then(res=>{
                                request(api_get_topicRule +`&topicid=${this.topicid}`)
                                .then(res=>{
                                    if(res.data){
                                        this.topicrule=res.data.rulearr;
                                    }                     
                                })
                        })
                    }
                    this.$store.commit('delTopicRule',index);                   
            },
            submitTopic(){   
             let rule= JSON.stringify(this.topicrule);
             let api= this.topicid!==0?api_edit_topic:api_add_topic;
             let contentStr=`addtype=1&bind=1&catid=75&tname=${this.topicName}&begin=${this.addDateStart +' 00:00:00'}&end=${this.addDateEnd +' 23:59:59'}&bind=1&rule=${rule}`;
             let content= this.topicid!==0? contentStr+`&topicid=${this.topicid}`:contentStr;
             request(api,{
                    method:'POST',
                    headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body:content
             }).then(res=>{
                   this.$vux.alert.show({
                        title: res.data.msg
                   })
                   if(res.data.code===1) {
                       this.$router.go('-1');
                   }
             })
             this.$store.commit('addTopicName',{'topicName':'','begin':'','End':'','rule':[]})
            }
        },
        components:{
            Datetime,
            Alert
        }
    }
</script>
<style scope lang="less">
    .opinion-topic-add{
         font-size: 0.28rem;
         background: #e6e6e6;
         padding:0.36rem 0.24rem; 
         min-height: 100%;
         .topic-add-input{
             background: #ffffff; 
             height: 0.94rem;
             line-height: 0.94rem;
             margin-bottom: 0.14rem;
             border-radius:0.06rem; 
             display: flex;
             justify-content: space-between; 
             align-items: center;
             padding: 0 0.2rem;
             
             .subject{
                 width: 80%;
                 text-overflow: ellipsis;
                 white-space: nowrap;
                 overflow : hidden ;
             }
             input{
                 border:0;
                 outline:0;
                 font-size: 0.26rem;
             } 
             .del-keyword{
                  fill:#2d324f;
             }
         }
         .keyword-setting{
              font-size: 0.3rem;
              margin: 0 0 0.2rem 0.38rem;
         }
         .topic-add-btn{
             background: #ffffff; 
             height: 0.94rem;
             line-height: 0.94rem;
             margin-bottom: 0.14rem;
             border-radius:0.06rem; 
             display: flex;
             justify-content: flex-end; 
             align-items:center;
         }
         .trueBtn{
            color:#ffffff;
            width: 50%;
            margin: 0.66rem auto;
            background: #2d324f;
            text-align: center;
            border-radius:6px;
            height:0.6rem;
            line-height:0.6rem;
        }
    }
</style>
