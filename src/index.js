const {app, BrowserWindow, remote, ipcMain} = require('electron')
const path = require('path')
const {webContents} = require('electron');
const url = require('url')
const dialog = require('electron').dialog
var robot = require('robotjs');

let win

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 200, 
    height: 250, 
	  titleBarStyle: 'hidden-inset',
	  maximizable: false, 
	resizable: false,	  backgroundColor: '#f2f2f2',
	})

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });
	
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'renderer/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  mainWindow.on('closed', () => {
    mainWindow = null
  })
  
}

function colorFind(){
    timer = setInterval(function(){ 
          var mousePos = robot.getMousePos();
          var color = robot.getPixelColor(mousePos.x, mousePos.y);
            function convertRGB(hex){
              var c;
              if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
                  c= hex.substring(1).split('');
                  if(c.length== 3){
                      c= [c[0], c[0], c[1], c[1], c[2], c[2]];
                  }
                  c= '0x'+c.join('');
                  return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
              }
              throw new Error('Error');
          }
          var rgb = convertRGB("#"+color);
        mainWindow.webContents.send('hexColor', {
            hex: color, 
            rgba: rgb
        });

      }, 100); 


    var a = 0; 
      ipcMain.on('stop-color-engine', () => {
        if ( a == 0 ){
          clearInterval(timer);
            a++;
        }else{
              timer = setInterval(function(){ 
          var mousePos = robot.getMousePos();
          var color = robot.getPixelColor(mousePos.x, mousePos.y);
            function convertRGB(hex){
              var c;
              if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
                  c= hex.substring(1).split('');
                  if(c.length== 3){
                      c= [c[0], c[0], c[1], c[1], c[2], c[2]];
                  }
                  c= '0x'+c.join('');
                  return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
              }
              throw new Error('Error');
          }
          var rgb = convertRGB("#"+color);
        mainWindow.webContents.send('hexColor', {
            hex: color, 
            rgba: rgb
        });

      }, 100); 
          a = 0;
      }
      
    });

}

colorFind();

app.on('ready', createWindow)

app.on('window-all-closed', () => {

  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

 dialog.showErrorBox = function(title, content) {
    console.log(`${title}\n${content}`);
  };