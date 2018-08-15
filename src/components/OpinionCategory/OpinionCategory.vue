<template>
     <div class="opinion-category">
            <div v-for="(item,index) in gradeMemu" :key="index">
            <p class="categoryFileName">{{item.catname}}</p>
            <div class="categoryList" v-for="(items,indexs) in item.clflist" :key="indexs" @click="goCategoryDetail(items.clfid,items.clfname)">
                <div>{{items.clfname}}</div>
                <div class="categoryNameBox">
                    <Icon type="icon-wenjian" color="#4b5069" size="20"></Icon>
                    <span class="categoryName">舆情详细</span>
                    <x-icon type="ios-arrow-right" size="22" class="del-keyword"
                    ></x-icon>
                </div>
            </div>
            </div>
     </div>
</template>
<script type="text/ecmascript-6">
import {api_get_gradeMemu} from '@/services/api'
import request from '@/utils/request'
import Icon from '@/base/IconSvg/IconSvg'
export default {
    name:'opinion-category',
    data(){
        return {
              gradeMemu:[]
        }
    },
    methods:{
        goCategoryDetail(clfid,clfname){
              this.$router.push({path:'/topic/detail',query:{type:'category',topicid:clfid,topicname:clfname}})
        }
    },
    created(){
        request(api_get_gradeMemu).then(res=>{
               if(res.data) this.gradeMemu=res.data
        })
    },
    components:{
        Icon
    }
}
</script>
<style scope lang="less">
     .opinion-category{
         font-size: 0.26rem;
         padding:0.28rem 0.26rem; 
         min-height: 100%;
         background: #e6e6e6;
         .categoryFileName{
             padding-left:0.36rem;
         }
         .categoryList{
             display:flex;
             justify-content: space-between;
             align-items: center;
             height: 0.66rem;
             border:1px solid #d7d7d7;
             border-radius:8px;
             padding:0 0.28rem 0  0.34rem;
             font-size: 0.24rem;
             margin:0.14rem 0;
             background: #ffffff;
             .categoryNameBox{
              display: flex;
              align-items: center;
              .categoryName{
                  margin: 0 0.3rem 0 0.16rem ;
                  font-size: 0.22rem;
                  color:#8d8d8d;
              }
             }
         }
     }
</style>

