<template>
     <div class="opinion-topic-detail" ref="topicDetail">
      <div class="tabs" ref="topicDetailTop">
      <div class="tab" v-for="(item, index) in sorts" :key="index" >
        <div :class="param.sortIndex === index?'highlight':'name'" @click="onClickItem(index,item.type)">{{item.value}}</div>
        <img :src="triangle" v-show="param.sortIndex === index">
      </div>
      </div>
      <div class="choose">
            <div class="timeChoose" :style="sortType ==='time'? 'display:block;': 'display:none;'">
                <ul>
                    <li class="vux-1px-b" v-for="(item,index) in time" :key="index" 
                    @click="timeClick(item.value)"
                    :class="param.timeValue===item.value?'timecheck':''"
                    >{{item.name}}</li>
                    <li class="time-wrapper">
                        <span class="custom">自定义</span>
                        <datetime
                            v-model="dateStart"
                            @on-cancel="onCancelStart"
                        >    
                            <input type="text" placeholder="开始时间" onfocus='this.blur();' v-model="dateStart" class="input">
                        </datetime>
                        <span class="go">到</span>
                        <datetime
                            v-model="dateEnd"
                            @on-cancel="onCancelStart"
                            @on-change="onConfirmEnd">
                            <input type="text" placeholder="结束时间" onfocus='this.blur();' v-model="dateEnd" class="input">
                        </datetime>
                    </li>
                </ul>
                <div class="btn">
                <div class="button submit" @click="Timesubmit">确定</div>
                <div class="button cancel" @click="cancel">取消</div>
                </div>
            </div>
            <div class="inclinationChoose" :style="sortType ==='inclination'? 'display:flex;': 'display:none;'">
                 <div mini v-for="(item,index) in trend" :key="index" :class="param.trendValue===item.value?btnClass[index]+'show':btnClass[index]"
                 @click="trendClick(item.value)"
                 >{{item.name}}</div>
            </div>
            <div class="sourceChoose" :style="sortType ==='source'? 'display:block;': 'display:none;'">
                 <ul>
                     <li v-for="(item,index) in carryCount" :key="index">
                         <label><input type="radio" name="radio" :checked="param.carry===item.value?true:false" @click="carryChange(item.value)"/>{{item.value}} 
                         <span>({{item.count}})</span>
                         </label>
                     </li>
                 </ul>
            </div>
            <div class="otherChoose" :style="sortType ==='other'? 'display:block;': 'display:none;'">
                <div class="vux-1px-b other">
                    <span>排序：</span>
                    <span v-for="(item,index) in sort" :key="index"
                    @click="clickSort(item.value)"
                    :class="param.sortValue===item.value ? 'font' :''"
                    >{{item.name}}</span>
                </div>
                <div class="vux-1px-b other">
                    <span>去重：</span>
                    <span v-for="(item,index) in filter" :key="index"
                     @click="clickFilter(item.value)"
                     :class="param.filterValue===item.value ? 'font' :''"
                    >{{item.name}}</span>
                </div> 
                <div class="btn">
                <div class="button submit" @click="submit">确定</div>
                <div class="button cancel" @click="cancel">取消</div>
                </div>            
            </div>
      </div>

      <div class="content" ref="topicDetailContent" >
          <charts :echartData="echartData" v-if="isShowChart"></charts>
          <OpinionDetailList :docList="docList" :isCheckedListShow="isCheckedListShow" 
          :flag="flag"  
          :type="type"
          @sidEmit="sidEmit" @delDetail="delDetail"
          ref="detailList"
          />
          <div @click="loadMore" class="load-more" v-if="loadMoreBtn">
           <x-button type="primary" mini>点击加载更多</x-button>
          </div>        
      </div>
      <div class="operate-wrapper">
      <div class="icon-wrapper" @click="toggleSilder">
        <icon-svg type="icon-jiantou-copy" color="#abadb9" size="40"></icon-svg>
      </div>
      <transition name="fade">
        <div class="operate" v-show="isOperatorShow" ref="operateSlider">
          <ul>
            <li @click="chooseItem">选择</li>
            <li @click="pushCategory">收藏</li>
            <li @click="pushmaterial">素材库</li>
            <li @click="deleteOpinion">删除</li>
          </ul>
        </div>
      </transition>
        </div>
      <alert v-model="showAlert">开始时间请不要大于结束时间</alert>
      <loading :show="this.showLoading" text="正在加载..."></loading>
      <div class="mask" :style="sortType !==''? 'display:block;': 'display:none;'"
          @click="maskClick" @touchmove.prevent
      ></div> 
      </div> 
</template>
<script type="text/ecmascript-6">
import {Search,Datetime,XButton,AlertModule,Loading,Alert,Confirm,TransferDomDirective as TransferDom} from 'vux'
import request from '@/utils/request'
import {api_get_showClfListECharts,api_del_doc,api_put_resource,api_get_topicList,api_get_showTopicListECharts,api_get_gradeList} from '@/services/api'
import OpinionDetailList from './../OpinionDetailList/OpinionDetailList'
import triangle from '@/assets/triangle.png'
import {requestTopicList,getSecondTime} from '@/utils/format'
import IconSvg from '@/base/IconSvg/IconSvg'
import DocList from '@/base/DocList/DocList'
import charts from './../OpinionDetailchart/OpinionDetailchart'
import { mapState } from 'vuex'
export default { 
    name:'opinion-topic-detail',
    data(){
        return {
            results:[],
            time: [
                {
                    name: '今天',
                    value: 'today'
                },
                {
                    name: '昨天',
                    value: 'yestoday'
                },
                {
                    name: '近7天',
                    value: '7day'
                },
                {
                    name: '近30天',
                    value: '30day'
                }
            ],
            btnClass:['allBtn','positiveBtn','primaryBtn','negtiveBtn','waringBtn'],
            trend: [
                {
                    name: '全部',
                    value: 'all'
                },
                {
                    name: '正面',
                    value: -1
                },
                {
                    name: '中性',
                    value: 0
                },
                {
                    name: '负面',
                    value: 1
                },
                {
                    name: '预警',
                    value: 2
                }
            ],
            sorts:[{type:'time',value:'时间'},
                   {type:'inclination',value:'倾向'},
                   {type:'source',value:'来源'},
                   {type:'other',value:'其它'}],
            docList:[],
            triangle:triangle,
            remove:false,
            dateStart:'',
            dateEnd:'',
            sortType:'',
            carryCount:[{count: 0, key: "all", value: "全部"}],
            sort:[{
                    name: '时间降序',
                    value: 'timedown'
                },
                {
                    name: '时间升序',
                    value: 'timeup'
                },
                {
                    name: '热搜排序',
                    value: 'hot'
                }],
               filter: [
                {
                    name: '去重',
                    value: 0
                },
                {
                    name: '不去重',
                    value: 1
                }
            ],   
            showAlert:false,
            isOperatorShow:false,
            isCheckedListShow:false,
            checkedList:[],
            reportName:'',
            loadMoreBtn:false,
            showLogo:true,
            echartData:{},
            type:'',
            showLoading:false,
            isBlankpageShow:true,
            flag:true,
            isShowChart:true,
            timeBtn:'',
            delState:1
        }
    },
    beforeRouteLeave(to, from, next) {
        if(to.path !== '/detail'){
            this.$store.commit('TOPIC_PARAM',{filterValue:1,sortValue:'timedown',timeValue:'all',trendValue:'all',carry:'全部',page:1,flag:false,topicid:1,sortIndex:0})
            next()
        } else {
            next()
        }
    },
    beforeUpdate(){
        this.flag=false
    },
    watch:{
        delState(){
            const _this=this
            const url= this.$route.query.type=== 'topic'? api_get_topicList : api_get_gradeList
            const id = this.$route.query.type=== 'topic'?'topicid':'clfid'
            requestTopicList(url,_this.param,id)
            .then(res => {
                if(res.data.code===1){
                    _this.docList=res.data.docList
                    _this.carryCount=res.data.carryCount
                }else{
                    _this.docList=[]
                }
            })
        }
    },
    created(){
          this.showLoading = true;
          let topicid=this.$route.query.topicid;
          let type=this.$route.query.type;
          const param = Object.assign({}, this.param, {topicid:topicid})
          this.$store.commit('TOPIC_PARAM',param)
            if(type==='topic'){
               request(api_get_showTopicListECharts +`&topicId=${topicid}`)
                .then( res =>{
                       if(res.data.code===1){
                        this.echartData=res.data
                       }else{
                         this.isShowChart=false
                       }
                }) 
                if(param.flag){
                         requestTopicList(api_get_topicList,param,'topicid')
                        .then(res=>{
                               this.showLoading = false 
                                if(res.data.code===1){
                                this.docList=res.data.docList
                                this.carryCount=res.data.carryCount
                                const state= res.data.pageInfo.count<=10?false:true
                                this.loadMoreBtn=state
                                this.type=type  
                                
                                }else{
                                this.isBlankpageShow=true
                                }
                            }) 
                        }else{
                            request(api_get_topicList +`&topicid=${topicid}`)
                            .then(res => {
                                this.showLoading = false 
                                if(res.data.code===1){
                                this.docList=res.data.docList
                                this.carryCount=res.data.carryCount
                                const state= res.data.pageInfo.count<=10?false:true
                                this.loadMoreBtn=state
                                this.type=type  
                                this.showLoading = false   
                                }else{
                                this.isBlankpageShow=true
                                }  
                            })
                        }
            }else{
                request(api_get_showTopicListECharts +`&clfId=${topicid}`)
                .then( res =>{
                       if(res.data.code===1){
                        this.echartData=res.data
                       }else{
                         this.isShowChart=false
                       }
                        }) 
                        if(param.flag){
                            requestTopicList(api_get_gradeList,param,'clfid')
                            .then(res=>{
                                        this.showLoading = false 
                                        if(res.data.code===1){
                                        this.docList=res.data.docList
                                        this.carryCount=res.data.carryCount
                                        const state= res.data.pageInfo.count<=10?false:true
                                        this.loadMoreBtn=state
                                        this.type=type  
                                        this.showLoading = false 
                                        }else{
                                        this.isBlankpageShow=true
                                        }
                                })   
                        }else{
                            request(api_get_gradeList +`&clfid=${topicid}`)
                            .then(res => {
                                        this.showLoading = false 
                                        if(res.data.code===1){
                                        this.docList=res.data.docList
                                        this.carryCount=res.data.carryCount
                                        const state= res.data.pageInfo.count<=10?false:true
                                        this.loadMoreBtn=state
                                        this.type=type  
                                        this.showLoading = false 
                                        }else{
                                        this.isBlankpageShow=true
                                        }
                            })
                        }
               }
               
             
    },
    mounted(){
        this._calcHeight()
    },
    computed:{
        sidList() {
        if (this.checkedList.length > 0) {
          const list = this.checkedList.map((item) => {
            return item.sid
          })
          return list
        }
        return []
      },
      ...mapState({
          param: state => state.topicparam
      })
    },
    methods:{ 
       delDetail(data){
            this.delState=data
       },
      _calcHeight() {
        const watch = this.$refs.topicDetail.getBoundingClientRect()
        const top = this.$refs.topicDetailTop.getBoundingClientRect()
        const picHeight = watch.height - top.height
        const content = this.$refs.topicDetailContent
        content.style.height = picHeight + 10 + 'px'
      },   
      async loadMore(){       
          this.showLoading=true  
          const param = Object.assign({}, this.param, {page:this.param.page+1})
          this.$store.commit('TOPIC_PARAM',param)
          let docData=this.type==='topic'? await requestTopicList(api_get_topicList,param,'topicid') :await requestTopicList(api_get_gradeList,param,'clfid')
          if(docData.data.code===1){
             this.docList=this.docList.concat(docData.data.docList)
             this.carryCount=docData.data.carryCount
             this.showLoading=false
          }else{
             this.docList=[]
             this.showLoading=false
          } 
          if(docData.data.pageInfo.count<=10){
             this.loadMoreBtn=false 
          }
      },
      delWord(){
          this.inputValue = ''
      },
      onClickItem(index,type){
           this.sortType=type
           const param = Object.assign({}, this.param, {sortIndex:index})
           this.$store.commit('TOPIC_PARAM',param)
      },
      onCancelStart(){

      },
      onConfirmEnd(){         
         let time= new Date().getTime();       
         if(getSecondTime(this.dateStart)>getSecondTime(this.dateEnd)){
                this.showAlert = true
                return
         }else if (time<getSecondTime(this.dateEnd)) {
                this.$vux.alert.show({
                    title:'结束时间请小于当日'
                })
         }
          this.isShowChart=false
          const param = Object.assign({}, this.param, {timeValue:'custom',begin:this.dateStart,end:this.dateEnd})
          this.$store.commit('TOPIC_PARAM',param) 
      },
      chooseItem(){
           this.isCheckedListShow = !this.isCheckedListShow
           if(this.sidList.length>0){
                this.$refs.detailList.removeCheckedList()
           }
      },
      pushCategory(){
          if (this.sidList.length > 0) {
          const _this = this
          this.$vux.confirm.show({
            // 组件除show外的属性
            content: '是否将选中项加入收藏？',
            onConfirm () {
              _this.$refs.detailList.removeCheckedList()  
              request(api_put_resource +`&catid=21&model=2&sid=${JSON.stringify(_this.sidList)}`).then(res => {
                _this.$vux.alert.show({
                  title: res.data.msg,

                })
              })
            }
          })
        }
      },
      pushmaterial(){
          if (this.sidList.length > 0) {
          const _this = this
          this.$vux.confirm.show({
            // 组件除show外的属性
            content: '是否将选中项加入素材库？',
            onConfirm () {
              request(api_put_resource +`&catid=21&model=1&sid=${JSON.stringify(_this.sidList)}`).then(res => {
                _this.$refs.detailList.removeCheckedList() 
                _this.$vux.alert.show({
                  title: res.data.msg,
                  onShow () {
                    console.log('Plugin: I\'m showing')
                  }
                })
              })
            }
          })
        }
      },
      deleteOpinion(){
          let sidsList=JSON.stringify(this.sidList)
          let type= this.type==='topic'?'topicid':'clfid'
          if (this.sidList.length > 0) {
          const _this = this
          this.$vux.confirm.show({
            // 组件除show外的属性
            content: '确定将选中项删除？',
            onConfirm () {
                request(api_del_doc,{
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: `sid=${sidsList}`
                }).then(res=>{
                     if(res.data.code===1){
                            _this.$refs.detailList.removeCheckedList()
                            _this.$vux.alert.show({
                            title: res.data.msg
                            })
                            requestTopicList(api_get_topicList,_this.param,type)
                            .then(res => {
                                if(res.data.code===1){
                                    _this.docList=res.data.docList
                                    _this.carryCount=res.data.carryCount
                                }else{
                                    _this.docList=[]
                                } 
                            })
                     }
                })       
            }
          })
        }
      },  
      sidEmit(data){
            this.checkedList=data
      },   
      //右侧操作
      toggleSilder(){
            this.isOperatorShow = !this.isOperatorShow
            if(this.isCheckedListShow){
            this.isCheckedListShow=false
            this.$refs.detailList.removeCheckedList()
            } 
      },
      //点击蒙层
      maskClick(){
          this.sortType=''
      },
      async submit(){
          this.sortType=''
          this.isShowChart=false
          let docData= this.type==='topic'?await requestTopicList(api_get_topicList,this.param,'topicid'):await requestTopicList(api_get_gradeList,this.param,'clfid')
         if(docData.data.code===1){
             this.docList=docData.data.docList
             this.carryCount=docData.data.carryCount
             this.loadMoreBtn=true
          }else{
             this.docList=[]
          } 
          if(docData.data.pageInfo.count<=10){
             this.loadMoreBtn=false 
          }
      },
      cancel(){
          this.sortType=''
      },
      //选择去重
       clickFilter(value){  
          const param = Object.assign({}, this.param, {filterValue: value})
          this.$store.commit('TOPIC_PARAM',param)
      },
      //选择排序
       clickSort(value){
           const param = Object.assign({}, this.param, {sortValue: value}) 
           this.$store.commit('TOPIC_PARAM',param)
      },
      //选择来源
      async carryChange(value){
            if(value===this.carry){
                 this.carry='all'
            }else{
            this.carry=value
            this.sortType=''
            this.isShowChart=false
            const param = Object.assign({}, this.param, {carry: value}) 
            this.$store.commit('TOPIC_PARAM',param)
            let docData= this.type==='topic'?await requestTopicList(api_get_topicList,param,'topicid'):await requestTopicList(api_get_gradeList,param,'clfid')
          if(docData.data.code===1){
             this.docList=docData.data.docList
             this.carryCount=docData.data.carryCount
             this.loadMoreBtn=true
          }else{
             this.docList=[]
          } 
          if(docData.data.pageInfo.count<=10){
             this.loadMoreBtn=false 
          }
          }
      },
      //选择倾向
     async trendClick(trend){
        this.sortType=''
        this.trendBtn=trend
        this.isShowChart=false
        const param = Object.assign({}, this.param, {trendValue: trend}) 
        let docData= this.type==='topic'?await requestTopicList(api_get_topicList,param,'topicid'):await requestTopicList(api_get_gradeList,param,'clfid')
          if(docData.data.code===1){
             this.docList=docData.data.docList
             this.carryCount=docData.data.carryCount
             this.loadMoreBtn=true
          }else{
             this.docList=[]
          }    
           if(docData.data.pageInfo.count<=10){
             this.loadMoreBtn=false 
          }
      },
      //选择时间
      timeClick(time){
          this.isShowChart=false   
          this.timeBtn=time  
          const param = Object.assign({}, this.param, {timeValue: time})
          this.$store.commit('TOPIC_PARAM',param)
        },
       async Timesubmit(){
          if(this.timeBtn===''){
          if(this.dateStart==='' || this.dateEnd===''){
                this.showAlert = true
                return
          }
          }
          this.sortType=''
          let docData= await requestDoclist(api_doc_searchDo,this.param)
          if(docData.data.code===1){
             this.docList=docData.data.docList
             this.carryCount=docData.data.carryCount
             this.loadMoreBtn=true
          }else{
             this.docList=[]
          } 
          if(docData.data.pageInfo.count<=10){
             this.loadMoreBtn=false 
          }
        }
    },
    components:{
        Search,
        OpinionDetailList,
        Datetime,
        XButton,
        Alert,
        IconSvg,
        Confirm,
        DocList,
        Loading,
        charts
    }
}
</script>
<style scope lang="less">
    .opinion-topic-detail{
         font-size: 0.28rem;
         min-height:100%;
         position: relative;
         background: #ffffff;
        .mask{
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        height:100%;
        background: rgba(0,0,0,0.6);
        }
        .tabs {
        position: absolute;
        display: flex;
        height: 0.6rem;
        line-height: 0.6rem;
        width: 100%;
        font-size: 0.26rem;
        background-color: #3e4464;
        z-index: 30;
        .tab {
        position: relative;
        width: 33.33%;
        text-align: center;
        .name {
          color:#6d718a;
        }
        .highlight{
          color:#ffffff;
        }
        img {
          position: absolute;
          width: 0.20rem;
          height: 0.16rem;
          bottom: -2px;
          left: 44%;
        }
      }
    }
    .choose {
        background: #ffffff;
        position: absolute;
        width: 100%;
        z-index:20;
        top:0.6rem;
        .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
        }
        .fade-enter, .fade-leave-to{
        opacity: 0;
        }
        .sourceChoose{
            padding: 0 0.5rem;
            font-size: 0.28rem;
            margin:0.42rem 0;
            ul{
                list-style: none;
                overflow: hidden;
                li{
                   float:left;
                   width: 50%;
                   input{
                       margin-right: 0.2rem;
                   }
                }
            }
        }
        .otherChoose{
            padding: 0 0.14rem;
            font-size: 0.26rem;
            .other{
                height: 0.68rem;
                line-height: 0.68rem;
                .font{
                    color: #000000;
                }
                span{
                    &:first-child{
                    color:#000000;
                    width: 0.8rem;
                    }
                    float:left;
                    width: 1.2rem;
                    margin: 0 0.2rem;
                    color:#919191;
                }
            }
            .btn{
                display: flex;
                margin: 0.4rem 0 0.1rem 0;
             .button{
                width: 30%; 
                border-radius:0.06rem;
                border:1px solid #2d324f;
                text-align: center;
                margin:0 0.55rem;
             }
             .submit{
                 color:#ffffff;
                 background: #2d324f;
             }
             .cancel{
                 color: #2d324f;
             }
            }
        }
        .inclinationChoose{
            height: 0.94rem;
            line-height: 0.94rem;
            align-items: center;
            padding: 0 0.2rem;
            div{
                width: 1rem;
                height: 0.4rem;
                text-align: center;
                color:#ffffff;
                margin:0 0.08rem;
                line-height: 0.4rem;
                border:1px solid #ececec;
                border-radius:4px;
            }
                      .positiveBtn{
                color:#007aff;
            }
            .positiveBtnshow{
                background:#007aff;
                color:#ffffff;
            }
            .waringBtn{
                color:#ffa507;
            }
            .waringBtnshow{
                background:#ffa507;
                color:#ffffff;
            }
            .allBtn{
                 color:#000000;
            }
            .allBtnshow{
                color:#000000;
            }
            .primaryBtn{
                 color: #45d100;
            }
            .primaryBtnshow{
                 background:#45d100;           
                 color: #ffffff;
            }
            .negtiveBtn{
                 color: #ec0000;
            }
            .negtiveBtnshow{
                 background:#ec0000; 
                 color: #ffffff;
            }
        }
        .timeChoose{
            font-size: 0.14rem;
            padding: 0 0.2rem;
            ul{
                list-style: none;
                li{
                    height:0.63rem;
                    line-height: 0.63rem;
                    font-size: 0.26rem;
                    color:#919191;
                }
                .timecheck{
                    color:#000000;
                }
                .time-wrapper{
                    display: flex;
                    align-items: center;
                    input{
                         width:1.45rem;
                         height:0.38rem;
                         line-height: 0.38rem;
                         border-radius:0.04rem;
                         text-align: center;
                         border:1px solid #a7a7a7;
                    }
                    .custom{
                        margin-right: 0.2rem;
                    }
                    .go{
                        margin: 0 0.22rem;
                    }
                }
            }
        }
             .btn{
                display: flex;
                margin: 0.2rem 0 0.1rem 0;  
                font-size: 0.26rem;
             .button{
                width: 30%; 
                border-radius:0.06rem;
                border:1px solid #2d324f;
                text-align: center;
                margin:0 0.55rem;
             }
             .submit{
                 color:#ffffff;
                 background: #2d324f;
             }
             .cancel{
                 color: #2d324f;
             }
            }
    }
    .content {
      top: 0.6rem;
      position: absolute;
      overflow: scroll;
      .load-more {
        margin-top: 0.2rem;
        margin-bottom: 0.2rem;
        display: flex;
        justify-content: center;
      }
     }
      .operate-wrapper {
      position: fixed;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.24rem;
      .icon-wrapper {
        margin-right: 0.06rem;
      }
      .operate {
        width: 90px;
        height: 180px;
        overflow: hidden;
        background-color: #3e4464;
        color: #ffffff;
        border-top-left-radius: 0.1rem;
        border-bottom-left-radius: 0.1rem;
        opacity:0.8;
        li {
          font-size: 0.24rem;
          list-style: none;
          white-space: nowrap;
          height: 44px;
          line-height: 44px;
          margin-left: 0.24rem;
        }
        &.fade-enter-active, &.fade-leave-active {
          transition: all 0.5s ease;
        }
        &.fade-enter{
          width: 0;
          opacity: 1;
        }
        &.fade-leave-to {
          width: 0;
          opacity: 1;
        }
      }
    }
    }
</style>
