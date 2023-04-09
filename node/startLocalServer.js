const createServer = require("./createServer");
const createProxy = require("./createProxy");
const react = require('@vitejs/plugin-react')
const { createLogger } = require("vite")
const { pureColorString } = require("../utils/index")
const { v4 }  = require('uuid')

class LocalServer {
  constructor(win, app) {
    this.app = app; // id, projectPath, appName, port, options
    this.pool = []
    this.port = [5153]
    this.portLastIndex = this.port.length - 1
    this.win = win
  }

  createCustomLogger (app) {
    const logger = createLogger()
    const loggerWarn = logger.warn;
    const loggerInfo = logger.info;
    const loggerError = logger.error;
    logger.info = (msg, options) => {
      loggerInfo(msg, options)
      app.uniqueMsg = v4()
      this.win.webContents.send('showHmrMessage', 'info', JSON.stringify(app), `${new Date().toLocaleTimeString()} [vite] ${pureColorString(msg)}`)
    }
    logger.warn = (msg, options) => {
      loggerWarn(msg, options)
      app.uniqueMsg = v4()
      this.win.webContents.send('showHmrMessage', 'warn', JSON.stringify(app), `${new Date().toLocaleTimeString()} [vite] ${pureColorString(msg)}`)
    }
    logger.error = (msg, options) => {
      loggerError(msg, options)
      app.uniqueMsg = v4()
      this.win.webContents.send('showHmrMessage', 'error', JSON.stringify(app), `${new Date().toLocaleTimeString()} [vite] ${pureColorString(msg)}`)
    }
    return logger
  }

  async resolveConfig(app) {
    return {
      root: app.projectPath,
      mode: 'development',
      plugins: [react()],
      server: {
        port: app.port,
        open: false,
        proxy: await createProxy(),
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100,
        },
        host: true,
        fs: {
          strict: false,
        }
      },
      customLogger: this.createCustomLogger(app),
      logLevel: 'info',
      configFile: false,
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
   * @createServer
   * 1. 读取配置文件
   * 2. 创建一个 http server 用于本地开发调试
   * 3. 创建一个 websocket 服务用于热重载
   * 4. 创建一个 插件容器 用于在构建的各个阶段调用插件的钩子
   * 5. 内部中间件的处理
   * 6. 预构建依赖
   * 7. startServer 启动本地开发服务器
   */

  /**
   * @run new createServer()
   */
  async run() {
    if (!this.app.size) {
      console.warn('add one app before running!')
      return
    }
    this.app.forEach(async (app) => {
      const port = this.port[this.portLastIndex]
      const appEnhance = { ...app, port }
      const options = await this.resolveConfig(appEnhance)
      appEnhance.options = options
      this.app.set(app.id, appEnhance)
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
      return
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
      return
    }
    const restartPool = []
    this.pool.forEach(async (viteServer, index) => {
      await viteServer.restart()
      console.log(`${viteServer._mine_unique_app_info.appName} is alredy restart`);
    })
  }
}
module.exports = LocalServer