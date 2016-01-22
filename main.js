const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const updater = require('electron-updater');

var mainWindow = null;

app.on('window-all-closed', function() {
    app.quit();
});

app.on('ready', function() {

    console.log(" electron on  ");

    updater.on('ready', function() {
        updaterWindow = new BrowserWindow({
            name: "updater",
            width: 400,
            height: 600,
            toolbar: false
        });
        mainWindow.loadURL('file://' + __dirname + "/index.html");

        mainWindow.on('closed', function() {
            mainWindow = null;
        });
    });

    updater.on('update-required', function() {
        app.quit();
    });

    updater.on('update-available', function() {
        if (mainWindow) {
            mainWindow.webContents.send('update-available');
        }
    });

    updater.on('error', function(err) {
        console.log('there is an error  ')
    });

    updater.start();

});
