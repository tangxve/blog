export default {
  data() {
    return {
      // 记录已经完成的动画
      doneTranslate: [],
      // 是否需要等待动画 开关
      waitTranslate: false
    }
  },
  methods: {
    async afterLoad(origin, destination, direction) {
      // 当前页面已经完成动画
      if (this.doneTranslate.includes(destination.index)) {
        this.waitTranslate = false
        return
      }

      // 动画开始 等待动画
      this.waitTranslate = true

      // 异步动画 方法
      await this.startTranslate()

      this.waitTranslate = false

      // 记录完成的页面
      this.doneTranslate.push(destination.index)
    },
    onLeave(origin, destination, direction, trigger) {
      // 当前页面动画没有完成禁止滚动
      if (this.waitTranslate) {
        return false
      }
    },
    startTranslate() {
      // 异步动画 方法
    }
  }
}
