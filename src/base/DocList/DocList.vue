<template>
    <ul class="doc-list vux-1px-t">
        <li v-if="!!list" v-for="(item,index) in docList" :key="index" class="list-item">
            <div class="content-wrapper">
                <div class="top">
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
            </div>
        </li>
    </ul>
</template>

<script type="text/ecmascript-6">
  import request from '@/utils/request'
  import MediaType from '@/base/MediaType/MediaType'
  import TrendType from '@/base/TrendType/TrendType'
  import {getHourTime} from '@/utils/format'
  export default {
    name: 'doc-list',
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
    computed:{
        docList(){
            let lists =  this.list
            lists.forEach( (item) => {
                   item.pubdate.time=getHourTime(item.pubdate.time)
            })   
            return lists
        }
    },
    components: {
        MediaType,
        TrendType
    }
  }
</script>

<style scoped lang="less">
.doc-list {
    padding-top: 0.1rem;
    max-height: 4rem;
    overflow: scroll;
    z-index: 500;
    .list-item {
        list-style: none;
        .content-wrapper {
          width: 100%;
          .top {
            font-size: 0.22rem;
            margin-top: 6px;
            text-align: left;
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
            font-size: 0.16rem;
            padding-bottom: 0.1rem;
            .left {
              .carry {
                color: #ec0000;
                margin-left: 0.2rem;
                margin-right: 0.3rem;
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
}
</style>
