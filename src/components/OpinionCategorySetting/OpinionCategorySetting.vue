<template>
       <div class="category-setting">
           <div class="topic-add-input" v-for="(item,index) in categoryList" :key="index">
                <span @click="editwarning(item.clfid)" class="subject">{{item.clfname}}</span>
                <x-icon type="ios-close" size="26" v-show="delKeywordState" @click="delWarning(item.clfid)"
                class="del-keyword"
                ></x-icon>
           </div>
        </div>
</template>
<script type="text/ecmascript-6">
import request from '@/utils/request'
import {api_get_gradeMemu,api_del_grade,api_get_gradeRule} from '@/services/api'
import {categorySettingSwitch} from '@/utils/format'
import { mapState } from 'vuex'
export default {
    name:'category-setting',
    data(){
        return {
             categoryList:[]
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
        delWarning(clfid){
              const _this=this
              this.$vux.confirm.show({
                   content:'是否将选中项删除？',
                   onConfirm(){
                            request(api_del_grade +`&clfid=${clfid}`)
                            .then(res=>{
                                if(res.data.code===1){
                                        request(api_get_gradeMemu)
                                        .then(res => {
                                            if(res.data) _this.categoryList=categorySettingSwitch(res.data)
                                        })
                                }
                            })
                   }
              })
        },
        editwarning(clfid){
                request(api_get_gradeRule +`&clfid=${clfid}`)
                .then(res => {
                     if(res.data){
                          this.$store.commit('addTopicName',{'topicName':res.data.clfname,'catid':res.data.catid,'rule':res.data.rulearr})
                          this.$router.push({path:'/category/add',query:{clfid:clfid}})
                     }
                })
        }
    },
    created(){
         request(api_get_gradeMemu)
         .then(res => {
               if(res.data) this.categoryList=categorySettingSwitch(res.data)
         })
    }
}
</script>
<style scope lang="less">
    .category-setting{
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
