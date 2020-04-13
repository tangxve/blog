// Header options
export default {
  data() {
    return {
      // logo部分
      logo: {
        // logo 图片的地址，默认 oss 地址 @string
        url: 'xxxx'
      },
      // 导航部分
      nev: [
        {
          label: '证据管理',
          path: '/aaaa',
          class: ['nav-item']
        }
      ],
      // 用户部分
      account: {
        // 帮助中心地址，默认帮助中心地址 @string
        helpLink: 'xxxx',
        // 站内信通知
        notify: {
          // 通知信息数量
          newMsgCount: 0,
          // 通知信息列表
          newMessages: [{ msg: 'xxx' }],
          // 我的消息地址
          messageLink: 'xxx'
        },
        // 用户信息
        user: {
          // 用户头像地址
          head: 'xxx',
          // 用户姓名
          name: '',
          // 用户实名状态 @boolean
          realName: false,
          // 手机号
          mobile: 'xxx',
          // 邮箱
          email: 'xxx',
          // 用户中心地址
          userLink: '',
          // 计费中心地址
          orderLink: ''
        }
      }
    }
  }
}

// Space
export default {
  data() {
    return {
      spcae: 'orgid-xxx1'
    }
  },
  methods: {
    spaceChange(space) {
      // 手动切换空间
    },
    beforeChange(done) {
      // 切换前的拦截
    }
  }
}
