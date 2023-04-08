const { ipcMain, dialog  } = require("electron");
const LocalServer = require("../node/startLocalServer");

async function showOpenDialog() {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ['openDirectory']
    })
    if (!canceled) {
        return filePaths[0]
    }
}


function ipcer(win) {
    let pool = {};
    ipcMain.on("min", function () {
        win.minimize();
    });
    ipcMain.on("max", function () {
        win.maximize();
    });
    ipcMain.on("unmax", function () {
        win.unmaximize();
    });
    ipcMain.on("onTop", function () {
        win.setAlwaysOnTop(true);
    });
    ipcMain.on("startLocalServer", function (event, app) {
        pool.localServer = new LocalServer(app)
        pool.localServer.run()
    });
    ipcMain.on("closeLocalServer", function () {
        pool.localServer.close()
    });
    ipcMain.on("restartLocalServer", function () {
        pool.localServer.restart()
    });
    ipcMain.handle('showOpenDialog', showOpenDialog);
}
module.exports = ipcer;
