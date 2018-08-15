<template>
  <div class="opinion-detail" ref="detail">
    <div ref="detailContent" class="detail-content">
    <header class="header" style="line-height: 0.3rem">
      <span class="type" :style="typeBackgound(detail.negative)">{{detail.negative}}</span>
      <h2 class="title">{{detail.title}}</h2>
    </header>
    <section class="info">
      <span class="carry">{{detail.carry}}</span>
      <span class="author" v-if="detail.author">{{detail.author}}</span>
      <span class="time">{{detail.pubdate}}</span>
    </section>
    <section class="content" v-html="detail.content">
    </section>
    <section class="keywords">
      <span class="name">关键词：</span>
      <div class="keyword-wrapper">
        <span class="keyword"  v-if="detail.nztags && detail.nztags.length>0">
          {{detail.nztags}}
        </span>
      </div>
    </section>
        <section class="source">
      <span class="name">原文链接：</span>
      <a @click.prevent="goToOriginal" href="#">点击此链接查看原文！</a>
    </section>
    <section class="reference" v-if="detail.similerInfo && detail.similerInfo.similerCount > 0">
      <span class="name">涉及专题：</span>
      <ul class="reference-list">
        <li class="reference-item" v-for="item in detail.similerInfo.similerDocList" :key="item.sid">
          <a :href="'#/detail?sid=233'">{{item.title}}</a>
        </li>
      </ul>
    </section>
        <div v-transfer-dom>
        <loading :show="this.showLoading" text="正在加载..."></loading>
        <confirm v-model="isCreateReportShow"
          title="请输入报告名称"
          theme="ios"
          show-input
          :input-attrs="{type: 'text'}"
          @on-confirm="onCreateReportConfirm">
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
      <div class="operate-wrapper">
      <div class="icon-wrapper" @click="toggleSilder">
        <icon-svg type="icon-jiantou-copy" color="#abadb9" size="40"></icon-svg>
      </div>
      <transition name="fade">
        <div class="operate" v-show="isOperatorShow" ref="operateSlider">
          <ul>
            <li @click="pushCategory">收藏</li>
            <li @click="pushmaterial">素材库</li>
            <li @click="deleteOpinion">删除</li>
            <li @click="createReport">生成报告</li>
          </ul>
        </div>
      </transition>
        </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import request from '@/utils/request'
  import { mapState, mapMutations } from 'vuex'
  import {api_get_detail,api_del_doc,baseHost,api_put_resource} from '@/services/api'
  import IconSvg from '@/base/IconSvg/IconSvg'
  import { Loading, XButton, Confirm,TransferDomDirective as TransferDom } from 'vux'
  import {setHighlightTags} from '@/utils/format'
  export default {
    name: 'opinionDetail',
    data() {
      return {
        detail: {},
        isOperatorShow:false,
        showLoading: false,
        isCreateReportShow: false,
        isCheckReportShow: false,
        sid:'',
        reportName:'',
        reportId:''
      }
    },
    created () {
      const url = `${api_get_detail}&sid=`
      const sid = this.query.sid ? this.query.sid : '4341dd13-69e5-456b-814d-2025b8c5eeb8'
      this.sid=sid
      request(url + sid).then(res => {
        if (!!res.data && res.data.code === 1) {
          Object.assign(res.data,{content:setHighlightTags(res.data.content,res.data.nztags)})
          this.detail = res.data
          this.setOriginalUrl(res.data.url)
        }
      })
    },
    mounted(){
        this._calcHeight()
    },
    methods: {
      _calcHeight() {
        const watch = this.$refs.detail.getBoundingClientRect().height
        const content = this.$refs.detailContent
        content.style.height = watch + 'px'
      },
      typeBackgound (type) {
        if (type === '正面') {
          return {backgroundColor: 'rgb(0, 122, 255)'}
        } else if (type === '中性') {
          return {backgroundColor: 'rgb(0, 140, 33)'}
        } else if (type === '负面') {
          return {backgroundColor: 'rgb(233, 0, 0)'}
        } else {
          return {backgroundColor: 'rgb(255, 210, 0)'}
        }
      },
      goToOriginal() {
        this.$router.push('/original-text')
      },
      ...mapMutations({
        setOriginalUrl: 'SET_ORIGINAL_URL'
      }),
      toggleSilder(){
        this.isOperatorShow = !this.isOperatorShow
      },
      pushCategory() {
          const _this=this
          this.$vux.confirm.show({
            // 组件除show外的属性
            content: '是否加入收藏夹？',
            onConfirm () {
              request(baseHost+'mpart/oWork/reportDo?action=putResource&model=2&catid=21&sid=["'+_this.sid+'"]').then(res => {
                _this.$vux.alert.show({
                  title: res.data.msg
                })
              })
            }
          })
      },
      deleteOpinion() {
          const _this=this
          this.$vux.confirm.show({
            // 组件除show外的属性
            content: '确定删除？',
            onConfirm () {
              request(api_del_doc +'&sid=["'+_this.sid+'"]').then(res => {
                _this.$vux.alert.show({
                  title: res.data.msg,
                  onHide(){
                      _this.$router.go('-1')
                  }
                })
              })
            }
          })
      },
      pushmaterial(){
          const _this=this
          this.$vux.confirm.show({
            // 组件除show外的属性
            content: '是否加入素材库？',
            onConfirm () {
              request(api_put_resource +'&catid=1&model=1&sid=["'+_this.sid+'"]').then(res => {
                _this.$vux.alert.show({
                  title: res.data.msg
                })
              })
            }
          })
      },
      async onCreateReportConfirm(value) {
        if (value === '') {
            this.$vux.alert.show({
              content: '报告名不能为空'
            })
          return
        }
        if (value !== '') {
          this.reportName = value
          this.isCreateReportShow = false
          this.isCheckReportShow=true
        this.showLoading = true
        const report = await request(`${baseHost}mpart/oWork/reportDo?action=addReport&reportname=${this.reportName}`)
        if (report.data) {
          const result = await request(`${baseHost}mpart/oWork/reportDo?action=putDocToReport&reportid=${report.data.reportId}&sid=["${this.sid}"]`)
          this.showLoading = false
          if (result.data && result.data.code === 1) {
            this.reportId = report.data.reportId
            this.isCheckReportShow = true
          }
        }
          }
      },
      createReport() {
        this.isCreateReportShow = true
      },
      async onCheckReportConfirm() {
        const reportInfo = await request(`${baseHost}mpart/exp/PreviewAction?action=previewWorkApp&reportid=${this.reportId}&reportname=${this.reportName}`)
        const url = baseHost.substring(0, baseHost.length - 1)
        if (reportInfo.data) {
           this.setOriginalUrl(url + reportInfo.data.downloadUrl)
        }
           this.$router.push('/original-text')
      }
    },

    computed: {
      ...mapState({
        route: state => state.RouteModule,
        path: state => state.RouteModule.path,
        query: state => state.RouteModule.query
      })
    },
    components:{
        IconSvg,
        Loading,
        Confirm
    },
    directives: {
      TransferDom
    }
  }
</script>

<style lang="less" scoped>
  .opinion-detail {
    min-height: 100%;
    background: #ffffff;
    .detail-content{
     overflow: scroll;
     padding: 0.2rem;
    }
    .header {
      .type {
        color: #ffffff;
        border-radius: 2px;
        font-size: 0.2rem;
        float:left;
      }
      .title {
        margin-left: 0.6rem;
        font-size: 0.26rem;
        line-height: 0.4rem;
      }
    }
    .info {
      border-bottom: 1px solid #999999;
      margin: 10px 0;
      font-size: 0.22rem;
      span {
        margin-right: 14px;
      }
      .carry {
        color: rgb(233, 0, 0)
      }
    }
    .content {
      text-indent: 2em;
      word-break:break-all;
      border-bottom: 1px solid #999999;
      padding-bottom: 10px;
      font-size: 0.24rem;
      /deep/ img {
        max-width: 50%;
      }
    }
    .keywords {
      display: flex;
      width: 100%;
      margin: 10px 0;
      font-size: 0.22rem;
      .name {
        width: 80px;
        flex: 0 0 80px
      }
      .keyword-wrapper {
        flex: 1;
      }
    }
    .reference {
      display: flex;
      margin: 10px 0;
      font-size: 0.22rem;
      ul, li {
        list-style: none;
      }
      .name {
        width: 100px;
        flex: 0 0 90px
      }
      .reference-list {
        flex: 1;
      }
    }
    .source {
      font-size: 0.22rem;
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
          height: 40px;
          line-height: 40px;
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
