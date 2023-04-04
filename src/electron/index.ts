const { ipcRenderer } = window.require('electron')
const Electron = {
  showOpenDialog: () => ipcRenderer.invoke("showOpenDialog")
}
export default Electron;