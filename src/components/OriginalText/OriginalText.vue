<template>
  <div class="origin">
  <iframe :src="originalUrl" frameborder="0" width="100%" height="100%" security="restricted" sandbox="allow-scripts"></iframe>
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
      width: 100%;
      height:100%;
   }
</style>
