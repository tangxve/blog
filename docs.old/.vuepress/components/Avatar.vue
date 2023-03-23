<template>
  <div style="width: 48px; height: 48px" class="avatar" v-html="preview">222222</div>
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
      console.log('this.preview', this.preview)
    },
  }
}
</script>

<style scoped>

</style>
