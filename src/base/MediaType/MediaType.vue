<template>
  <icon-svg :type="imgUrl" size="20"></icon-svg>
</template>
<script type="text/ecmascript-6">
  import IconSvg from '@/base/IconSvg/IconSvg'
  export default {
    name: 'media-type',
    props: {
      media: {
        type: String,
        default: '综合'
      }
    },
    computed: {
      imgUrl() {
        switch (this.media) {
          case '新闻':
            return 'icon-xinwen'
          case '微博':
            return 'icon-social-weibo'
          case '论坛':
            return 'icon-luntanzixun'
          case '视频':
            return 'icon-shipin'
          case '综合':
            return 'icon-zongheshuju'
          case '微信':
            return 'icon-weixin'
          case '平媒':
            return 'icon-xinwendongtai'
          case '博客':
            return 'icon-bokeblogger3'
          case 'APP':
            return 'icon-app1'
          case 'pjljkm':
            return 'icon-minzhengxinxi-jingwairenyuan'
          default:
            return 'icon-zongheshuju'
        }
      }
    },
    components: {
      IconSvg
    }
  }
</script>

<style scoped>
</style>
