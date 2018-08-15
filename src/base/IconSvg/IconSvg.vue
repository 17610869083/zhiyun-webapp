<template>
  <svg class="icon" aria-hidden="true" :style="{ color: color, fontSize: size + 'px' }">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'svg-icon',
    props: {
      type: {
        type: String,
        required: true
      },
      color: {
        type: String
      },
      size: {
        type: String
      }
    },
    computed: {
      iconName() {
        return `#${this.type}`
      }
    }
  }
</script>

<style scoped>
  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
