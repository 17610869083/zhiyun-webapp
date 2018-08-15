<template>
    <div class="opinion-topic-keyword-setting" @touchmove="touch">
          <actionsheet v-model="showTooltipModel" :menus="tooltipMenu" theme="android">
          </actionsheet>
          <x-icon type="ios-help" size="30" class="keyword-tooltip" @click="tooltipClick"></x-icon>
          <div class="cell">
              <div >主题词</div>
              <textarea  style="margin-top: 0.2rem;box-sizing: content-box;resize:none;" oninput="this.style.height = this.scrollHeight+'px'"
               placeholder="核心词汇，例如事件的名称、地域、人名、产品名称、公司企业名称等(不能为空)"
               v-model="objectValue"
               @blur="object"
              >
              </textarea>
          </div>
          <div class="cell">
              <div>关联词1</div>
              <textarea 
              placeholder="描述“主题词”的词汇。（可以为空）" 
              style="margin-top: 0.2rem;box-sizing: content-box;resize:none;" oninput="this.style.height = this.scrollHeight+'px'"
               v-model="subject1Value"
               @blur="object"
               />
          </div>
          <div class="cell">
              <div>关联词2</div>
              <textarea placeholder="描述“主题词”与“关联词1”的词汇。（可以为空）" 
              style=" margin-top: 0.2rem;box-sizing: content-box;resize:none;" oninput="this.style.height = this.scrollHeight+'px'" 
              v-model="subject2Value"
              @blur="object"
              />
          </div>
          <div class="cell">
              <div>排除词</div>
              <textarea placeholder="排除歧义词或不相关的词汇、容易产生误解的词汇。（可以为空）" 
              style=" margin-top: 0.2rem;box-sizing: content-box;resize:none;" oninput="this.style.height = this.scrollHeight+'px'" 
              v-model="filterValue"
               @blur="object"
              />
          </div>
          <div>
              <div class="trueBtn" @click="submitTopic">保存</div>
          </div>
    </div>
</template>
<script type="text/ecmascript-6">
import { Actionsheet } from 'vux'
import { mapState } from 'vuex'
import {api_add_warning,api_warning_extend,api_edit_warning} from '@/services/api'
import request from '@/utils/request'
import {keywordDuplicateCheck} from '@/utils/format'
  export default {
    name:'opinion-topic-keyword-setting',
    data(){
        return {
            objectValue:'',
            subject1Value:'',
            subject2Value:'',
            filterValue:'',
            ruleId:0,
            flag:true,
            showTooltipModel:false,
            tooltipMenu:{
                  'title.noop': `<div class="tooltip-row">
                                 <div><span>主题词：</span><span>北京</span><span>昌平</span></div>
                                 <div><span>关联词1：</span><span>暴雨</span><span>冰雹</span><span>暴雪</span></div>
                                 <div><span>关联词2：</span><span>预警</span><span>受灾</span><span>伤亡</span></div>
                                 <div><span>排除词：</span><span>暴雪</span><span>保险（歧义词）</span></div>
                                 </div>
                                 <div class="tooltip-row">系统会匹配舆情信息中出现主题词（北京或昌平），并且包含关联词1（暴雨或冰雹或暴雪），包含关联词2（预警或受灾或伤亡）的数据，其中不包含排除词（暴雪保险）。</div>
                                 <div class="tooltip-row">（北京或昌平）与（暴雪或暴雪）与（预警或受灾或伤亡）排除（暴雪保险）</div>
                               `
            }
        }
    },
    computed: {
    ...mapState({
        rule: state => state.topicRule
     })
    },
    methods:{
        touch(event){
             event.preventDefault()
        },
        asdj(event){
            let num = event.target.scrollHeight
            event.target.style.height=num+'px'  
        },
        object(event){
        const {value} = event.target
        if(/~|!|@|#|\$|\^|&|\*|=|\?|！|￥|-|\(|\)|（|）|%|【|】|\{|\}|；|;|%|,|，|。|\.|^[a-z]$|^[0-9]$/.test(value)){ 
                   this.$vux.alert.show({
                        title: '请不要带有特殊字符'
                   })
                   this.flag=false
        }else if (keywordDuplicateCheck(value.split(' '))){
                   this.$vux.alert.show({
                        title: '请不要出现重复的关键词或多余的空格'
                   })
                   this.flag=false
        }else{
                   this.flag=true
        }
        }, 
        tooltipClick(){
            this.showTooltipModel=true
        },
        submitTopic(){
            let ruleindex = this.$route.query.ruleindex;
            if(this.flag===false || this.objectValue===''){
                 return
            }
            if(this.$route.query.type!==undefined){
                request(api_add_warning,{
                    method:'POST',
                    headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body:`type=602&scope=1&rule1=${this.objectValue}&rule2=${this.subject1Value}&rule3=${this.subject2Value}&rule4=${this.filterValue}`
                })
            }else if(this.$route.query.index!==undefined){
                request(api_edit_warning,{
                    method:'POST',
                    headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body:`id=${this.ruleId}&scope=1&rule1=${this.objectValue}&rule2=${this.subject1Value}&rule3=${this.subject2Value}&rule4=${this.filterValue}`
                })
            }else if(ruleindex!==undefined){
             this.$store.commit('replaceTopicRule',{rule1:this.objectValue,rule2:this.subject1Value,rule3:this.subject2Value,rule4:this.filterValue,index:ruleindex})
            }           
            else{
            this.$store.commit('addTopicRule',{rule1:this.objectValue,rule2:this.subject1Value,rule3:this.subject2Value,rule4:this.filterValue})
            }     
            this.$router.go('-1');    
         }
    },
    created(){
            let index = this.$route.query.index;
            let ruleindex = this.$route.query.ruleindex;
            if(index!==undefined){
                request(api_warning_extend)
                .then(res =>{
                     if(res.data){
                          let dataList = res.data.show602List;
                          this.objectValue=dataList[index]['rule1'];
                          this.subject1Value=dataList[index]['rule2'];
                          this.subject2Value=dataList[index]['rule3'];
                          this.filterValue=dataList[index]['rule4'];
                          this.ruleId=dataList[index]['id'];
                     } 
                })
            }else if (ruleindex!==undefined){
                          let rule = this.rule.rule[ruleindex];
                          this.objectValue=rule.rule1;
                          this.subject1Value=rule.rule2;
                          this.subject2Value=rule.rule3;
                          this.filterValue=rule.rule4;
            }
    },
    components:{
       Actionsheet
    }
  }
</script>
<style scope lang="less">
  .opinion-topic-keyword-setting{
         font-size: 0.3rem;
         background: #ffffff;
         width: 100%;
         min-height:100%;
         padding-top:0.2rem;
         .cell{
             width:90%;
             margin: 0 auto;
         }
         .keyword-tooltip{
            position: fixed;
            top: 8px;
            right: 8px;
            z-index: 200;
            font-size: 32px;
            color: #ffffff;
            fill:#ffffff;
         }
         .tooltip-row{
               margin-bottom: 0.1rem;
            div{
               margin-top: 0.1rem; 
            }   
            span{
               margin-right: 0.1rem;
            }
         }
        textarea{
            width: 100%;
            border-radius:0.1rem;
            height: 0.7rem;
            line-height:0.36rem;
            outline:none;
            font-size: 0.26rem;
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
