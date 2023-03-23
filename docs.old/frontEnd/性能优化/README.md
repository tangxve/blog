# 性能优化

- 指标
  - 网络资源请求时间。 
  - Time To Start Render(TTSR)：浏览器开始渲染的时间。 
  - Dom Ready：页面解析完成的时间。 
  - Time To Interact(TTI))：页面可交互时间。 
  - Total Blocking Time (TBT)：总阻塞时间，代表页面处于不可交互状态的耗时。 
  - First Input Delay(FID)：从用户首次交互，到浏览器响应的时间。
- 评估工具
  - Chrome DevTools 谷歌开发工具
  - Light House 面板
  - Performance 面板
- 优化方案
  - 压缩
    - 代码压缩：UglifyJS
    - 文本资源压缩（Gzip、Brtli、Zopfli等）
    - Tree-shaking
    - Code-splitting（代码分割）
  - 图片优化
    - 小图优化（雪碧图、iconfront、dataUrl、svg）
    - 图片格式选择（webp，如何判断是否支持webp）
    - 图片压缩：[tinypng](https://tinypng.com/)
  - 加载策略
    - 懒加载
    - DNS预解析、预加载、预先渲染
    - 资源加载（顺序、位置、异步等） async、defer
    - 客户端离线化（ServiceWorker、AppCache、离线包）
    - 客户端容器化
    - CDN 优化
    - HTTP 缓存
    - 数据缓存（localStorage、sessionStorage）
    - 使用 HTTP/2/3
    - 请求优化（合并请求、域名拆分、减少DNS 查询时间）
    - 服务端渲染 SSR
  - 感官体验优化
- 项目角度性能优化
  - 首屏性能提速
    - 按需加载 / 懒加载 / 预加载
    - 骨架屏
    - loading
    - 服务端渲染 SSR
    - 客户端容器化
    - 客户端离线化（ServiceWorker、AppCache、离线包）
  - 网络请求优化
    - CDN 优化
    - 缓存优化 数据缓存（localStorage、sessionStorage）
    - 使用 HTTP/2/3
    - 资源压缩（Gzip）
    - 请求优化（合并请求、域名拆分、减少DNS 查询时间）

## 指标


