<template>
    <div class="opinion-analysis" @touchmove="touch">
         <div class="analysis" @click="goTopic">
               <div class="analysis-left">
                   <span class="circle">
                        <Icon type="icon-shichangfenxi" color="#000" size="36"></Icon>
                   </span>
                   <span >专题事件分析
                   <div class="analysis-gary">
                   深度挖掘，精准化解读
                   </div>
                   </span>
               </div>
         </div>
         <div class="analysis">
               <div class="analysis-left"  @click="goCategory">
                   <span class="circle">
                       <Icon type="icon-shujufenxi" color="#abadb9" size="30"></Icon>
                   </span>
                   <span >分类事件分析
                    <div class="analysis-gary">
                   层层分析，实时追踪
                    </div>
                   </span>
               </div>
         </div>
    </div>
</template>
<script type="text/ecmascript">
import Icon from '@/base/IconSvg/IconSvg'
export default {
    name:'opinion-analysis',
    data(){
        return {

        }
    },
    methods:{
        goTopic(){
            this.$router.push('/topic')
        },
        goCategory(){
            this.$router.push('/category')
        },
        touch(event){
            event.preventDefault();
        }
    },
    components:{
        Icon
    }
}
</script>
<style scope lang="less">
     .opinion-analysis{
         font-size: 0.28rem;
         background: #e6e6e6;
         padding:0.4rem 0.2rem 0 0.2rem; 
         height: 100%;
         .analysis{
             display: flex;
             align-items: center;
             width: 93%;
             height:0.96rem;
             background: #ffffff;
             border-radius:6px;
             padding:0 0.2rem;
             margin-bottom: 0.18rem;
             .analysis-left{
                display: flex;
                align-items: center;
                .circle{
                    width: 0.62rem;
                    height: 0.62rem;
                    margin-right:0.2rem;
                }
             }
             .analysis-gary{
             color:#bcbcbc;
             font-size: 0.24rem;
         }
         }
     }
</style>
