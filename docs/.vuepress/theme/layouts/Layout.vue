<template>
  <Layout></Layout>
</template>


<script>
import Layout from '@vuepress/theme-default/layouts/Layout.vue'
import { downloadAvatar } from '../../components/avatar'

export default {
  components: { Layout },

  props: ['sidebarItems'],
  async created() {
    console.log(2222)
  },
  async mounted() {
    // const url = await downloadAvatar()

    // console.log('url', url)
    // this.$page.frontmatter.heroImage = url
    // console.log('this.$page', this.$page)
  },
  methods: {}
}
</script>

<style lang="stylus">
.page {
  padding-bottom: 2rem;
  display: block;
}

#gitalk-container {
  padding: 0 2.25rem;
  max-width: 740px;
  margin: 0 auto;
}
</style>
