<template>
     <div class="opinion-warning">
           <div class="toopit" v-if="toopit">
                未设置关键词，请点击右上角添加
           </div>
           <div class="topic-add-input" v-for="(item,index) in warningList" :key="index">
                <span @click="editwarning(index)" class="subject">{{item.rule1}}</span>
                <x-icon type="ios-close" size="30" v-show="waringState" @click="delWarning(item.id)"
                class="del-keyword"
                ></x-icon>
           </div>
     </div>
</template>
<script>
import request from '@/utils/request'
import {api_warning_extend,api_del_warning} from '@/services/api'
import { mapState } from 'vuex'
export default {
     name:'opinion-warning',
     data(){
         return {
            visibility:true,
            warningList:[],
            toopit:false
         }
     },
     computed:{
          ...mapState({
              waringState: state => state.waring
          }) 
     },
     beforeDestroy(){
        this.$store.commit('showWaringBtn',false)
    },
     methods:{
         goAdd(){
            this.$router.push({path:'/topic/setting',query:{type:'warning'}});
         },
         edit(){
            this.visibility=!this.visibility;
            this.iconVisibility=true;
         },
         editwarning(index){
            this.$router.push({path:'/topic/setting',query:{index:index}});
         },
         delWarning(id){
            const _this=this
            this.$vux.confirm.show({
                content:'是否将选中项删除？',
                onConfirm(){
                        request(api_del_warning +`&id=${id}`)
                        .then(res=>{
                                request(api_warning_extend)
                                .then(res=>{
                                    if(res.data) _this.warningList=res.data.show602List
                                })
                        })
                 }
                 })
            }
     },
     created(){
           request(api_warning_extend)
           .then(res=>{
               if(res.data.message==='当前用户没有添加规则'){
                  this.toopit=true
               } else{
                  this.warningList=res.data.show602List 
               }
           })
     }
}
</script>
<style scope lang="less"> 
    .opinion-warning{
         font-size: 0.28rem;
         background: #e6e6e6;
         padding:0.36rem 0.24rem; 
         height: 100%;
        .toopit{
            text-align: center;
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
