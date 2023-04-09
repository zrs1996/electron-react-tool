const { ipcRenderer } = window.require('electron')
const Electron = {
  showOpenDialog: () => ipcRenderer.invoke("showOpenDialog"),
  initFrontAppMap: (app: any) => ipcRenderer.send("initFrontAppMap", app),
  startLocalServer: (app: any) => ipcRenderer.send("startLocalServer", app),
  closeLocalServer: () => ipcRenderer.send("closeLocalServer"),
  restartLocalServer: () => ipcRenderer.send("restartLocalServer"),
  receiveHmrMessage: (callback: any) => ipcRenderer.on("showHmrMessage", callback)
}
export default Electron;