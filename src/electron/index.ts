const { ipcRenderer } = window.require('electron')
const Electron = {
  showOpenDialog: () => ipcRenderer.invoke("showOpenDialog"),
  startLocalServer: (app: any) => ipcRenderer.send("startLocalServer", app),
  closeLocalServer: () => ipcRenderer.send("closeLocalServer"),
  restartLocalServer: () => ipcRenderer.send("restartLocalServer"),
}
export default Electron;