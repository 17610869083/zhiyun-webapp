<template>
  <div class="opinion-material" ref="material">
    <div class="filter" v-if="isBlankpageShow">
          <img :src="Blankpage" alt="空白页">
          <div class="gap">
              素材库空空如也，
          </div>
          <div>
               要不要去
              <router-link :to="'/watch'">
                <span class="add">添加</span>
              </router-link> 呢？
       </div>
    </div>
    <div >
      <div v-transfer-dom>
        <loading :show="this.showLoading" text="正在加载..."></loading>
        <confirm v-model="isCreateReportShow"
          title="请输入报告名称"
          theme="ios"
          show-input
          :input-attrs="{type: 'text'}"
          @on-confirm="onCreateReportConfirm">
        </confirm>
        <confirm v-model="isPreviewReportShow"
          title="请确认以下信息是否生成报告"
          theme="ios"
          @on-confirm="onPreviewReportConfirm">
          <doc-list :list="checkedList"></doc-list>
        </confirm>
        <confirm v-model="isCheckReportShow"
          title="是否查看报告？"
          theme="ios"
          confirm-text="是"
          cancel-text="否"
          @on-confirm="onCheckReportConfirm">
        </confirm>
      </div>
    </div>
    <div class="list-wrapper" v-if="!isBlankpageShow" ref="materialContent">
      <ul>
        <li v-if="!!docList" v-for="(item,index) in docList" :key="index" class="list-item">
          <div class="check-wrapper" v-show="isCheckedListShow">
            <input type="checkbox" :value="item" v-model="checkedList">
          </div>
          <div class="content-wrapper">
            <div class="top" @click="goDetail(item.sid)">
              <media-type :media="item.carry"></media-type>
              <span class="title">{{item.title}}</span>
            </div>
            <div class="bottom vux-1px-b">
              <div class="left">
                <trend-type :trend="item.negative"></trend-type>
                <span class="carry">{{item.source}}</span>
                <span class="pubdate">{{item.pubdate.time}}</span>
              </div>
              <div class="right">
                <!--<img src="./triangle-down.png" alt="">-->
              </div>
            </div>
            <div class="detail vux-1px-b">
              <p>{{item.summary}}</p>
            </div>
          </div>
        </li>
      </ul>
      <div @click="loadMore" class="load-more" v-if="flag">
        <x-button type="primary" mini>点击加载更多</x-button>
      </div>
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
            <li @click="createReport">生成报告</li>
            <li @click="deleteOpinion">删除</li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import request from '@/utils/request'
  import { CheckIcon, TransferDomDirective as TransferDom, Loading, XButton, Confirm } from 'vux'
  import MediaType from '@/base/MediaType/MediaType'
  import TrendType from '@/base/TrendType/TrendType'
  import IconSvg from '@/base/IconSvg/IconSvg'
  import DocList from '@/base/DocList/DocList'
  import { throws } from 'assert';
  import {baseHost} from '@/services/api'
  import Blankpage from '@/assets/webwxgetmsgimg.jpg'
  import { mapMutations } from 'vuex'
  import { getHourTime } from '@/utils/format'
  export default {
    name: 'opinion-material',
    data() {
      return {
        docList: [],
        checkedList: [],
        isCheckedListShow: false,
        showLoading: false,
        loadMorePage: 1,
        isOperatorShow: false,
        isCreateReportShow: false,
        isPreviewReportShow: false,
        isCheckReportShow: false,
        Blankpage:Blankpage,
        isBlankpageShow:false,
        flag:true
      }
    },
    created() {
      this._loadBase()
    },
    mounted(){
      this._calcHeight()
    },
    methods: {
      ...mapMutations({
      setOriginalUrl: 'SET_ORIGINAL_URL'
      }),
      _calcHeight() {
        const watch = this.$refs.material.getBoundingClientRect()
        const picHeight = watch.height 
        const content = this.$refs.materialContent
        content.style.height = picHeight + 10 + 'px'
      },
      _loadBase() {
        request(baseHost + 'mpart/oWork/reportDo?action=getResourceByUserId&model=1').then(res => {
          if(res.data.code===1){
             if(res.data.docList.length===0 || this.loadMorePage>=res.data.pageinfo.pagecount){
              this.flag=false
             }
             res.data.docList.forEach(( item ) => {
                   item.pubdate.time=getHourTime(item.pubdate.time)
             })
             this.docList = res.data.docList
          }else{
             this.isBlankpageShow = true
             this.flag=false
          }
        })
      },
      loadMore() {
        this.showLoading = true
        request(`${baseHost}mpart/oWork/reportDo?action=getResourceByUserId&model=1&pagesize=20&page=${this.loadMorePage}`).then(res => {
          if (!!res.data && res.data.code === 1) {
           const lastDocList = this.docList
            res.data.docList.forEach(item =>{
                item.pubdate.time=getHourTime(item.pubdate.time)
            })
            lastDocList.push(...res.data.docList)
            this.docList = lastDocList
            this.loadMorePage++
            if(this.loadMorePage>=res.data.pageinfo.pagecount){
               this.flag=false
            }
          }
          this.showLoading = false
        })
      },
      chooseItem() {
        this.isCheckedListShow = !this.isCheckedListShow
        if(this.sidList.length>0){
            this.checkedList=[]
        }
      },
      pushCategory() {
        if (this.sidList.length > 0) {
          const _this = this
          this.$vux.confirm.show({
            // 组件除show外的属性
            content: '是否将选中项加入收藏？',
            onConfirm () {
              request(`${baseHost}mpart/oWork/reportDo?action=putResource&catid=21&sid=${JSON.stringify(_this.sidList)}`).then(res => {
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
      deleteOpinion() {
        if (this.idList.length > 0) {
          const _this = this
          this.$vux.confirm.show({
            // 组件除show外的属性
            content: '确定将选中项删除？',
            onConfirm () {
              request(`${baseHost}mpart/oWork/reportDo?action=delDocFromCat&id=${JSON.stringify(_this.idList)}`).then(res => {
                _this.$vux.alert.show({
                  title: res.data.msg
                })
                _this._loadBase()
              })
            }
          })
        }
      },
      toggleSilder() {
        this.isOperatorShow = !this.isOperatorShow
        if(this.isCheckedListShow){
        this.isCheckedListShow=false
        this.checkedList=[]
        } },
      onCreateReportConfirm(value) {
        if (this.sidList.length > 0) {
          if (value === '') {
            this.$vux.alert.show({
              content: '报告名不能为空'
            })
          return
        }
        if (value !== '') {
          this.reportName = value
          this.isCreateReportShow = false
          this.isPreviewReportShow = true
          }
        }
      },
      createReport() {
        if (this.sidList.length > 0) {
          this.isCreateReportShow = true
        } else {
            this.$vux.alert.show({
              content: '最少选择一条舆情'
            })
        }
      },
      async onPreviewReportConfirm() {
        this.showLoading = true
        const report = await request(`${baseHost}mpart/oWork/reportDo?action=addReport&reportname=${this.reportName}`)
        if (report.data) {
          const result = await request(`${baseHost}mpart/oWork/reportDo?action=putDocToReport&reportid=${report.data.reportId}&sid=${JSON.stringify(this.sidList)}`)
          this.showLoading = false
          if (result.data && result.data.code === 1) {
            this.reportId = report.data.reportId
            this.isCheckReportShow = true
          }
        }
      },
      async onCheckReportConfirm() {
        const reportInfo = await request(`${baseHost}mpart/exp/PreviewAction?action=previewWorkApp&reportid=${this.reportId}&reportname=${this.reportName}`)
        const url = baseHost.substring(0, baseHost.length - 1)
        if (reportInfo.data) {
          this.setOriginalUrl(url + reportInfo.data.downloadUrl)
        }
          this.$router.push('/original-text')
      },
      goDetail(sid){
          if (sid) {
          this.$router.push(`/detail?sid=${sid}`)
      }
      }
    },
    computed: {
      sidList() {
        if (this.checkedList.length > 0) {
          const list = this.checkedList.map((item) => {
            return item.sid
          })
          return list
        }
        return []
      },
      idList() {
        if (this.checkedList.length > 0) {
          const list = this.checkedList.map((item) => {
            return item.id
          })
          return list
        }
        return []
      }
    },
    components: {
      IconSvg,
      CheckIcon,
      MediaType,
      TrendType,
      Loading,
      XButton,
      Confirm,
      DocList
    },
    directives: {
      TransferDom
    }
  }
</script>

<style scoped lang="less">
  .opinion-material {
    min-height: 100%;
    display: flex;
    justify-content: center;
    background: #ffffff;
    .filter{
       width: 80%;
       font-size: 0.28rem;
       .gap{
          margin-top: 0.2rem;
       }
       img{
          width: 50%;
          height: 50%;
          margin: 0 auto;
          display: block;
       }
       div:last-child{
           font-size: 0.26rem;
           color:#6c6c6c;
       }
       .add{
         font-size: 0.28rem;
         color:#ffdf59;
       }
       div{
         text-align: center;
       }
    }
    .list-wrapper {
      padding:0 0.2rem;
      overflow: scroll;
      .list-item {
        display: flex;
        .check-wrapper {
          max-height: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 0.1rem;
        }
        .content-wrapper {
          width: 100%;
          .top {
            font-size: 0.26rem;
            margin-top: 6px;
            max-height:0.8rem;
            overflow: hidden;
            img {
              vertical-align: top;
            }
            span {
              vertical-align: top;
              margin-left: 10px;
            }
          }
          .bottom {
            display: flex;
            justify-content: space-between;
            font-size: 0.22rem;
            padding-bottom: 0.1rem;
            .left {
              .carry {
                color: #828282;
                margin-left: 0.2rem;
                margin-right: 0.3rem;
              }
              .pubdate{
                color: #828282
              }
            }
            .right {
              img {
                width: 0.2rem;
              }
            }
          }
          .detail {
            font-size: 0.14rem;
            text-indent: 0.28rem;
            color: #868686;
          }
        }
      }
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
