const electron = require('electron');
const ffmpeg = require('fluent-ffmpeg');
const {
    app,
    BrowserWindow,
    ipcMain
} = electron;

let mainWindow;

app.on('ready', () => {
    console.log('App is started');
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});
  // recieving the object from the main web page.

ipcMain.on('videoSubmitted', (event, path) => {
    ffmpeg.ffprobe(path, (error, metadata) => {
        console.log('Video duration:', metadata.format.duration);
   
   // sending data back to the web page.
        mainWindow.webContents.send(
            'videoMetaData',
             metadata.format.duration
            );
        
    });
});