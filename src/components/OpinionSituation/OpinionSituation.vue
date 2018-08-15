<template>
  <div class="opinion-situation" ref="situation">
    <div class="tabs" ref="situationTop">
      <div class="tab" v-for="(item, index) in sorts" :key="index" @click="onClickItem(index,item.neg)">
        <div class="name">{{item.name}}</div>
        <img :src="triangle" v-show="param.sortIndex === index">
      </div>
    </div>

    <div class="content" ref="situationContent">
          <OpinionDetailList :docList="docList"  :isCheckedListShow="isCheckedListShow" 
          @sidEmit="sidEmit" @delDetail="delDetail"
          ref="detailList"
          />
        <div @click="loadMore" class="load-more" v-if="showBtn">
          <x-button type="primary" mini>点击加载更多</x-button>
        </div>
    </div>
    <div v-transfer-dom>
      <loading :show="this.showLoading" text="正在加载..."></loading>
    </div>
      <div class="operate-wrapper">
      <div class="icon-wrapper" @click="toggleSilder">
        <icon-svg type="icon-icon_arrow_left" color="#abadb9" size="40"></icon-svg>
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
  </div>
</template>

<script type="text/ecmascript-6">
  import { TransferDomDirective as TransferDom, Loading, XButton } from 'vux'
  import request from '@/utils/request'
  import MediaType from '@/base/MediaType/MediaType'
  import TrendType from '@/base/TrendType/TrendType'
  import Scroll from '@/base/Scroll/Scroll'
  import {api_doc_searchDo,api_put_resource,api_del_doc} from '@/services/api'
  import triangle from '@/assets/triangle.png'
  import OpinionDetailList from './../OpinionDetailList/OpinionDetailList'
  import IconSvg from '@/base/IconSvg/IconSvg'
  import { mapState } from 'vuex'
  export default {
    name: 'opinion-situation',
    data() {
      return {
        sorts: [{name:'预警',neg:2},{name:'负面',neg:1},{name:'最新舆情',neg:'all'}],
        docList: [],
        showLoading: false,
        loadMorePage: 2,
        triangle:triangle,
        isOperatorShow:false,
        isCheckedListShow:false,
        checkedList:[],
        neg:'all',
        delState:1,
        showBtn:false
      }
    },
    beforeRouteLeave(to, from, next) {
        if(to.path !== '/detail'){
            this.$store.commit('SITUATION_PARAM',{sortIndex:2,neg:'all'})
            next()
        } else {
            next()
        }
    },
    watch:{
        delState(){
            const _this=this
            request(api_doc_searchDo+`&neg=${_this.param.neg}`)
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
    created() {
      request(api_doc_searchDo +`&neg=${this.param.neg}`).then(res => {
        if (!!res.data && res.data.code === 1) {
          this.docList = res.data.docList
          const state= res.data.pageInfo.count<=10?false:true
          this.showBtn=state
        }
      })
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
         param: state => state.situationparam
      })
    },
    methods: {
       delDetail(data){
          this.delState=data
       },
       _calcHeight() {
        const watch = this.$refs.situation.getBoundingClientRect()
        const top = this.$refs.situationTop.getBoundingClientRect()
        const picHeight = watch.height - top.height
        const content = this.$refs.situationContent
        content.style.height = picHeight +10+ 'px'
      },
      goToDetail (sid) {
        if (sid) {
          this.$router.push(`/detail?sid=${sid}`)
        }
      },
      onClickItem(index,neg) {
        this.showLoading = true
        const param = Object.assign({},this.param,{neg:neg,sortIndex:index})
        this.$store.commit('SITUATION_PARAM',param)
        request(api_doc_searchDo +`&neg=${param.neg}`).then(res => {
            if (!!res.data && res.data.code === 1) {
              this.docList = res.data.docList
              this.showBtn=true
            }
            if(!!res.data && res.data.pageInfo.count<=10){
             this.showBtn=false
            }
            this.showLoading = false
          })
      },
      loadMore() {
        let _this=this
        request(api_doc_searchDo + `&neg=${_this.param.neg}&page=${this.loadMorePage}`).then(res => {
          if (!!res.data && res.data.code === 1) {
            const lastDocList = this.docList
            lastDocList.push(...res.data.docList)
            this.docList = lastDocList
            this.loadMorePage++
            this.showLoading = false
          }
          this.showLoading = false
          if(!!res.data && res.data.pageInfo.count<=10){
             this.showBtn=false
          }
        })
      },
      toggleSilder(){
        this.isOperatorShow = !this.isOperatorShow
        if(this.isCheckedListShow){
        this.isCheckedListShow=false
        this.$refs.detailList.removeCheckedList()
        } 
      },
      sidEmit(data){
           this.checkedList=data
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
              request(api_put_resource +`&catid=21&model=2&sid=${JSON.stringify(_this.sidList)}`).then(res => {
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
      pushmaterial(){
          if (this.sidList.length > 0) {
          const _this = this
          this.$vux.confirm.show({
            // 组件除show外的属性
            content: '是否将选中项加入素材库？',
            onConfirm () {
              request(api_put_resource +`&catid=1&model=1&sid=${JSON.stringify(_this.sidList)}`).then(res => {
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
                            request(api_doc_searchDo+`&neg=${_this.neg}`)
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
      }
    },
    directives: {
      TransferDom
    },
    components: {
      MediaType,
      TrendType,
      Scroll,
      Loading,
      XButton,
      OpinionDetailList,
      IconSvg
    }
  }
</script>

<style scoped lang="less">
  .opinion-situation {
    min-height:100%;
    position: relative;
    background: #ffffff;
    .tabs {
      position: absolute;
      width: 100%;
      display: flex;
      height: 0.6rem;
      line-height: 0.6rem;
      font-size: 0.26rem;
      background-color: #3e4464;
      color: #ffffff;
      z-index: 30;
      .tab {
        position: relative;
        width: 33.33%;
        text-align: center;
        img {
          position: absolute;
          width: 0.20rem;
          height: 0.16rem;
          bottom: -2px;
          left: 44%;
        }
      }
    }
    .content {
      overflow: scroll;
      top: 0.6rem;
      position: absolute;
      .list-wrapper {
        padding: 0 0.2rem;
        .list {
          list-style: none;
          .list-item {
            border-bottom: 1px solid #cccccc;
            margin-top: 18px;
            .title {
              font-size: 0.22rem;
            }
            .info {
              display: flex;
              justify-content: space-between;
              font-size: 0.16rem;
              .info-left {
                .type {
                  color: #ffffff;
                  border-radius: 2px;
                }
                .carray {
                  margin-left: 10px;
                  color: red;
                }
                .time {
                  margin-left: 10px;
                  color: #999999;
                }
              }
              .info-right {
                img {
                  width: 0.2rem;
                }
              }
            }
            .summary {
              font-size: 0.14rem;
              text-indent: 0.28rem;
            }
          }
        }
      }
        .load-more {
          padding: 0.3rem 0;
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
        z-index:1000;
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
          font-size: 0.26rem;
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
