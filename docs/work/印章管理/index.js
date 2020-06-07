export default {
  name: 'template-list',
  components: {},
  // filters: {},
  // directives: {},
  mixins: {},
  props: {
    data:{
      type:Array,
    }
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  // beforeCreate() {},
  created() {
  },
  // beforeMount() {},
  mounted() {},
  // beforeUpdate() {},
  // updated() {},
  // activated() {},
  // deactivated() {},
  beforeDestroy() {
    // 页面销毁前 清除轮训
    this.clearLoop()
  },
  // destroyed() {},
  methods: {
    // 设置空间
    async setSpace() {
      // 静默 切换空间 todo 这里 space 要从后端获取ID，然后到空间列表遍历获取详情
      const space = {}
      await this.$EventBus.$emit('SpaceHandleChange', {
        type: 'organ',
        space,
      })
      // 延时跳转
      setTimeout(() => {
        this.$router.push({ path: '/contract' })
      }, 30)
    },
    // 初始化 任务列表
    async initTask() {
      // 获取接口
      const res = await this.getTaskList()
      
      // 如果有进行中的任务 显示弹窗 特殊处理 5秒 后关闭（字段待定）
      if (res.isTask) {
        this.$message({
          type: 'warning',
          message: '您有进行中的任务，请查看处理',
          duration: 5000,
        })
      }
    },
    // 获取任务列表
    async getTaskList() {
      // 异步获取数据
      // ...
    },
    // 轮训更新列表
    loopTaskList() {
      // 轮训反复
      this.loopTaskId = setInterval(() => {
        this.getTaskList()
      }, 1000 * 60)
    },
    // 清除轮训
    clearLoop() {
      clearInterval(this.loopTaskId)
    },
  },
}

const options = {
  // 文档打开完成后，自动启动插件列表
  autostart: ['asc.{639E69BC-58DE-4029-9B43-F0420F67E6F0}'],
  // 插件配置文件 这里引入配置文件，不是引入插件页面
  pluginsData: ['cox-plugin/config.json'],
}
