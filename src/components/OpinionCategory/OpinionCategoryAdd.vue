<template>
     <div class="opinion-category-add">   
           <!-- <div class="category-add-input" @click="addCategoryFile">
               <span>如需新增文件夹请点击此处</span>
           </div>      -->
           <div class="category-selector-input">
              <selector placeholder="请选择文件夹" title="文件夹" :options="list"
               @on-change="change"
               v-model="catid"
               ></selector>
           </div>
           <div class="category-add-input">
               <span>分类名称：</span>
               <input type="text" placeholder="请输入分类名称" v-model="categoryName">
           </div>
            <div class="keyword-setting">关键词设置</div>
            <div class="category-add-input" v-for="(item,index) in category" :key="index">
              <div class="subject" @click="goCategoryKeyword">{{item.rule1}}</div>
              <x-icon type="ios-minus" size="26" class="del-keyword"
              @click="delKeyword(index,item.id)"
              ></x-icon>
            </div>
           <div class="category-add-input">
              <span @click="goKeywordSetting">请添加关键词</span>
              <x-icon type="ios-plus" size="26" class="del-keyword"
              @click="goKeywordSetting"
              ></x-icon>
           </div>
           <div>
                <div class="trueBtn" @click="submitTopic">确定</div>
           </div>
            <!-- <confirm 
            v-model="show"
            ref="confirms"
            show-input
            :input-attrs="{type: 'text'}"
            title="添加文件夹"
            @on-confirm="onConfirm">
            </confirm> -->
     </div>

</template>
<script type="text/ecmascript-6">
import {Selector,Confirm} from 'vux'
import {api_add_gradeCat,api_get_gradeCatList,api_add_grade,api_del_gradeRule,api_edit_grade} from '@/services/api'
import {gradeCatListSwitch} from '@/utils/format'
import request from '@/utils/request'
import { mapState } from 'vuex'
export default {
     name:'opinion-category-add',
     data(){
         return {
              categoryName:'',
              list: [{key: 'gd', value: '广东'}, {key: 'gx', value: '广西'}],
              show:false,
              category:[],
              catid:'',
              clfid:0
           }
     },
     beforeRouteLeave(to, from, next) {
            if(to.path === '/categorySetting'){
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
         let clfid=this.$route.query.clfid;
         if (clfid!==undefined) this.clfid=clfid;
         this.category=this.rule.rule;
         this.categoryName=this.rule.topicName;
         this.catid=this.rule.catid;
         request(api_get_gradeCatList)
         .then(res=>{
              if(res.data) this.list=gradeCatListSwitch(res.data.gradeCatList)
         })
     },
     methods:{
         submitTopic(){
             let rule = JSON.stringify(this.category);
             let api= this.clfid!==0?api_edit_grade:api_add_grade;
             let contentStr=`addtype=1&catid=${this.catid}&clfname=${this.categoryName}&bind=1&rule=${rule}`;
             let content= this.topicid!==0? contentStr+`&clfid=${this.clfid}`:contentStr;
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
         },
         change(value){
             this.catid=value;
         },
         delKeyword(index,clfid){
            if(this.clfid!==undefined){
                request(api_del_gradeRule +`&ruleid=${clfid}`)
                .then(res=>{
                })
            }
            this.$store.commit('delTopicRule',index); 
         },
         goCategoryKeyword(){

         },
         goKeywordSetting(){
             this.$store.commit('addTopicName',{'topicName':this.categoryName,'catid':this.catid,'rule':this.category})
             this.$router.push('/topic/setting')
         }
        //  addCategoryFile(){
        //      this.show=!this.show;
        //  }
        // onConfirm (value) {
        //     request(api_add_gradeCat +`&catname=${value}`)
        //     .then(res=>{
        //          request(api_get_gradeCatList)
        //             .then(res=>{
        //                 if(res.data) {
        //                   this.list=gradeCatListSwitch(res.data.gradeCatList)
        //                   let catid=res.data.gradeCatList.pop();
        //                 }
        //             })
        //     })

        //}
       },
     components:{
        Selector,
        Confirm
     }
}
</script>
<style scope lang="less">
     .opinion-category-add{
         font-size: 0.28rem;
         background: #e6e6e6;
         padding:0.36rem 0.24rem; 
         min-height: 100%;
         .category-selector-input{
             background: #ffffff; 
             height: 0.94rem;
             line-height: 0.94rem;
             margin-bottom: 0.14rem;
             border-radius:0.06rem; 
             align-items: center;
         }
         .category-add-input{
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
                 outline:none;
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
             font-size: 0.26rem;
         }
         .trueBtn{
            color:#ffffff;
            width: 50%;
            margin: 0.66rem auto;
            background: #2d324f;
            text-align: center;
            border-radius:6px;
            height: 0.6rem;
            line-height: 0.6rem;
        }
    }
</style>
