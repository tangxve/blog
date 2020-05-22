<template>
  <div class="version-test">
    <div v-if="versionGated.Vxxx0">我是版本 1.0</div>
    <div v-if="versionGated.Vxxx1">我是版本 1.1</div>
    <div v-if="versionGated.Vxxx2">我是版本 1.2</div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      // 个人纬度：versionGated，企业纬度：organVersionGated
      ...mapGetters('version', ['versionGated', 'organVersionGated']),
    },
    created() {
      // 通过 versionGated 调用自己定义 key（版本标示）
      console.log('home___版本 1.0', this.versionGated.Vxxx0)    // ===> false
      console.log('home___版本 1.2', this.versionGated.Vxxx1)    // ===> true
      console.log('home___版本 1.2', this.versionGated.Vxxx2)    // ===> true
    },
  }
</script>
