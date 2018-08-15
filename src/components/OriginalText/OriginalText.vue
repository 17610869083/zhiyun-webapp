<template>
  <div class="origin">
  <iframe id='if_content' name="if_content"  :src="originalUrl" frameborder="0" width="100%" height="100%" security="restricted" sandbox="allow-scripts"></iframe>
  </div>
</template>

<script type="text/ecmascript-6">
  import { mapState } from 'vuex'
  export default {
    name: 'original-text',
    computed: {
      ...mapState({
        originalUrl: state => state.originalUrl
      })
    }
  }
</script>

<style scoped>
   .origin{
      width: 94%;
      height:100%;
      padding:0 20px;
   }
</style>
