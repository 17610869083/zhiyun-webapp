<template>
     <div class="SearchLogo">
            <div class="search-img">
            <img src="./logo.jpg" alt="知云网">
             </div>
            <div class="search-logo" @click="hideLogo">
            <x-icon type="ios-search" size="30"></x-icon>
            <x-icon type="ios-close-empty" size="30"></x-icon>
            </div>
     </div>
</template>
<script type="text/ecmascript-6">
export default {
     name:"SearchLogo",
     data(){
         return {}
     },
     methods:{
         hideLogo(){
            this.$router.push('/search')
         }
     },
     components:{
     }
}
</script>
<style scope lang="less">
        .SearchLogo{
        .search-img{
            display: flex;
            justify-content: center;
            margin-top: 2rem;
            img{
                width: 2rem;
                height: 1.36rem;
            }
        }
        .search-logo{
             width:70%;
             height: 0.6rem;
             border-radius:0.35rem;
             border: 1px solid #DBDBDB;
             margin: 1rem auto;
             display: flex;
             justify-content: space-between;
             align-items: center;
             padding: 0 0.3rem;
             background: #ffffff;
             box-shadow: 0.03rem 0.03rem 0.03rem#a7a7a7;
        }
        }
</style>
