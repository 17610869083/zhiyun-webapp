<template>
    <div class="opinion-detail-list">
     <div v-if="showList" class="filter">
          <img :src="SetBlankpage" alt="空白页">
          <div class="gap">
              没内容就尴尬了~
          </div>
          <div>  
              请您尝试设置
              <router-link :to="'/topic/add'">
                <span class="add">关键词</span>
              </router-link> 哦？
          </div> 
      </div> 
      <div v-if="showList1" class="filter">
          <img :src="Blankpage" alt="空白页">
          <div class="gap">
              无符合条件的结果，
          </div>
          <div>  
               答应我，去换个条件试试好不好？
          </div> 
      </div> 
      <div class="list-wrapper" v-else>
      <swipeout>
      <ul>
        <li v-for="(item,index) in docList" :key="index" class="list-item vux-1px-b">
         <swipeout-item style="width:100%;">
          <div slot="right-menu">
          <swipeout-button style="font-size:0.28rem" background-color="#f61d00"  @click.native="del(item.sid)">删除</swipeout-button>
          <swipeout-button style="font-size:0.28rem" background-color="#fb9a00" @click.native="collection(item.sid)">收藏夹</swipeout-button>
          <swipeout-button style="font-size:0.28rem" background-color="#ece900" @click.native="material(item.sid)">素材库</swipeout-button>
          </div>
          <div slot="content" style="display:flex;">
          <div class="check-wrapper" v-show="isCheckedListShow">
            <input type="checkbox" :value="item" v-model="checkedList" @change="sidSave">
          </div>
          <div class="content-wrapper">
            <div class="top" @click="goDetail(item.sid)">
              <media-type :media="item.carry"></media-type>
              <span class="title">{{item.title}}</span>
            </div>
            <div class="bottom ">
              <div class="left">
                <trend-type :trend="item.negative"></trend-type>
                <span class="carry">{{item.source}}</span>
                <span class="pubdate">{{item.pubdate}}</span>
              </div>
              <div class="right" @click="toggleSummary($event)">
                 <img :src="triangleDown" alt="下拉" class="show">
                 <img :src="triangleUp" alt="下拉" class="hidden">
              </div>
            </div>
            <div class="summary">
               <div class="vux-1px-b" ></div>
              {{item.summary}}            
            </div>
          </div>
          </div>
          </swipeout-item>
        </li>
      </ul>
      </swipeout>
    </div>
    </div>
</template>
<script type="text/ecmascript-6">
import { CheckIcon,Swipeout, SwipeoutItem, SwipeoutButton,TransferDomDirective as TransferDom, Loading, XButton } from 'vux'
import MediaType from '@/base/MediaType/MediaType'
import TrendType from '@/base/TrendType/TrendType'
import IconSvg from '@/base/IconSvg/IconSvg'
import triangleDown from '@/assets/triangle-down.png'
import triangleUp from '@/assets/triangle-up.png'
import Blankpage from '@/assets/webwxgetmsgimg4.jpg'
import SetBlankpage from '@/assets/webwxgetmsgimg2.jpg'
import request from '@/utils/request'
import {api_del_doc,api_put_resource} from '@/services/api'
import { mapState } from 'vuex'
import {requestDoclist} from '@/utils/format'
export default {
    name:'opinion-detail-list',
    data(){
        return {
          checkedList:[],
          triangleDown:triangleDown,
          Blankpage:Blankpage,
          SetBlankpage:SetBlankpage,
          triangleUp:triangleUp
        }
    },
    props:['docList','isCheckedListShow','flag','type'],
    computed:{
         showList(){ 
               if(this.docList.length===0 && this.flag) return true 
         },
         showList1(){ 
               if(this.docList.length===0 && !this.flag) return true 
         },
         ...mapState({
          param:state => state.param
         })
    },
    beforeUpdate(){
         let summaryNodes = document.querySelectorAll('.summary-show');
         summaryNodes.forEach( item => {
                 item.className='summary'
         })
    },
    methods:{
        toggleSummary(event){
        const summaryNode = event.target.parentNode.parentNode.nextElementSibling
        const imgNode = event.target.parentNode.parentNode.lastChild.children
        if (summaryNode.className === 'summary') {
            summaryNode.className = 'summary-show'
        }else {
            summaryNode.className = 'summary'
        }
        if(imgNode[0].className==="show"){
            imgNode[0].className="hidden"
            imgNode[1].className="show"
        }else if (imgNode[0].className==="hidden"){
            imgNode[0].className="show"
            imgNode[1].className="hidden"
        }
        },
        sidSave(){
           this.$emit('sidEmit',this.checkedList)
        },
        removeCheckedList(){
           this.$emit('sidEmit',[])
           this.checkedList=[]
        },
        goDetail(sid){
          if (sid) {
          this.$router.push(`/detail?sid=${sid}`)
          }
        },
        del(sid){
            const _this=this
            request(api_del_doc + `&sid=["${sid}"]`)
            .then(res => {
                 if(res.data.code===1){
                      this.$emit('delDetail',new Date())
                 }
            })
        },
        material(sid){
                const _this=this
                request(api_put_resource +`&catid=1&model=1&sid=["${sid}"]`).then(res => {
                _this.$vux.alert.show({
                  title: res.data.msg
                })
                })
        },
        collection(sid){
                const _this=this
                request(api_put_resource +`&catid=21&model=2&sid=["${sid}"]`).then(res => {
                _this.$vux.alert.show({
                  title: res.data.msg
                })
              })
        }
    },
    components:{
    IconSvg,
    CheckIcon,
    MediaType,
    TrendType,
    Loading,
    XButton,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton
    }
}
</script>
<style scope lang="less">
     .opinion-detail-list{
      .filter{
       width: 100%;
       font-size: 0.28rem;
       margin-top: 20%;
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
      padding:0 0.1rem;
      background: #ffffff;
      .list-item {
        display: flex;
        .check-wrapper {
          max-height: 1rem;
          margin-right: 0.1rem;
          padding-left:0.1rem;
          display: flex;
          align-items: center;
        }
        .content-wrapper {
          width: 100%;
          .top {
            font-size: 0.26rem;
            padding-top: 6px;
            max-height:0.8rem;
            overflow: hidden;
            padding-left:0.1rem;
            width: 98%;
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
                color:#828282;
                margin-left: 0.2rem;
                margin-right: 0.3rem;
              }
              .pubdate{
                color:#828282;
              }
            }
            .right {
              z-index: 50;
              .show{
                  display: block;
              }
              .hidden{
                  display: none;
              }
              img {
                width: 0.2rem;
                padding:0.1rem 0.3rem 0rem 0.3rem;
              }
            }
          }
            .summary {
              font-size: 0.2rem;
              text-indent: 0.28rem;
              display: none;
              color:#a7a7a7;
            }
            .summary-show {
              font-size: 0.24rem;
              text-indent: 0.28rem;
              display: block;
              color:#6c6c6c;
              padding-top:0.1rem; 
              max-height: 1.08rem;
              overflow: hidden;
              margin-bottom: 0.1rem;
              text-overflow: ellipsis;
            }

          .detail {
            font-size: 0.14rem;
            text-indent: 0.28rem;
            color: #868686;

          }
           .hidden{
                display:none;
            }
        }
      }
    }
    .operate-wrapper {
      position: fixed;
      right: 0;
      top: 40%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.24rem;
      .operate {
        background-color: #8b8fa2;
        color: #ffffff;
        border-top-left-radius: 0.1rem;
        border-bottom-left-radius: 0.1rem;
        li {
          list-style: none;
        }
      }
    }
    }
</style>
