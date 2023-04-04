const { ipcMain, dialog  } = require("electron");

async function showOpenDialog() {
    const { canceled, filePaths } = await dialog.showOpenDialog({
        properties: ['openDirectory']
    })
    if (!canceled) {
        return filePaths[0]
    }
}


function ipcer(win) {
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
    ipcMain.handle('showOpenDialog', showOpenDialog)
}
module.exports = ipcer;
