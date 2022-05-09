<template>
  <div style="width: 48px; height: 48px" class="avatar" v-html="preview"></div>
</template>

<script>


import { generatePreview } from './avatar'

export default {
  name: 'avatar',
  data() {
    return {
      preview: ''
    }
  },
  created() {
  },
  mounted() {
    this.generatePreview()
  },
  methods: {
    async generatePreview() {
      this.preview = await generatePreview()
    },
  }
}
</script>

<style scoped>

</style>
