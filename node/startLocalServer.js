const createServer = require("./createServer");
const react = require('@vitejs/plugin-react')

class LocalServer {
  constructor(app) {
    this.app = app;
    this.pool = []
    this.port = [5153]
    this.portLastIndex = this.port.length - 1
  }
  resolveConfig(app) {
    return {
      root: app.projectPath,
      logLevel: 'info',
      configFile: false,
      plugins: [react()],
      server: {
        port: app.port,
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100,
        },
        host: true,
        fs: {
          strict: false,
        },
      },
      build: {
        // esbuild do not minify ES lib output since that would remove pure annotations and break tree-shaking
        // skip transpilation during tests to make it faster
        target: 'esnext',
        // tests are flaky when `emptyOutDir` is `true`
        emptyOutDir: false,
      },
    }
  }
  /**
   * 1. 读取配置文件
   * 2. 创建一个 http server 用于本地开发调试
   * 3. 创建一个 websocket 服务用于热重载
   * 4. 创建一个 插件容器 用于在构建的各个阶段调用插件的钩子
   * 5. 内部中间件的处理
   * 6. 预构建依赖
   * 7. startServer 启动本地开发服务器
   * @returns 
   */
  async run() {
    if (!this.app.length) {
      console.warn('add one app before running!')
    }
    this.app.forEach(async (app) => {
      const port = this.port[this.portLastIndex]
      const options = this.resolveConfig({ ...app, port })
      const viteServer = await createServer(options)
      viteServer._mine_unique_app_info = app
      const viteServerInstance = await viteServer.listen()
      this.port.push(port + 1)
      this.pool.push(viteServer)
      console.log(`${app.appName} is running in`, viteServerInstance.resolvedUrls.local);
    })
  }
  close() {
    if (!this.pool.length) {
      console.warn('all app is alredy closed!')
    }
    this.pool.forEach(viteServer => {
      viteServer.close()
      console.log(`${viteServer._mine_unique_app_info.appName} is alredy closed`);
    })
    console.log(`all app is alredy closed!`);
    this.pool = []
  }
  async restart() {
    if (!this.pool.length) {
      console.warn('start one app before restarting!')
    }
    this.pool.forEach(async (viteServer) => {
      await viteServer.restart()
      console.log(`${viteServer._mine_unique_app_info.appName} is alredy restart`);
    })
  }
}
module.exports = LocalServer