const { app, BrowserWindow } = require("electron");
const path = require("path");
const runApp = require("./app");

let win = null;

function createWindow(app) {
  win = new BrowserWindow({
    width: 1080,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    },
  });
  if (app.isPackaged) {
    win.loadFile("./dist/index.html");
  } else {
    win.loadURL(`http://localhost:3366/`);
    win.webContents.openDevTools();
  }
  runApp(win)
}

app.whenReady().then(() => {
  createWindow(app);
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
