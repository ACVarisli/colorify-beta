const {ipcRenderer, remote} = require('electron')
const {app} = remote; 


ipcRenderer.on('hexColor', (events, args) => {
	document.querySelector('.hex').innerHTML = "#"+args.hex;
		document.querySelector('#leftPane').style.backgroundColor = "#"+args.hex;
			document.querySelector('.rgba').innerHTML = args.rgba; 
});

function stopButton(){
    ipcRenderer.send('stop-color-engine'); 
}

window.onkeydown = function(event) {
	if (event.keyCode == 32 ){
		ipcRenderer.send('stop-color-engine');
	}
}

function copyHex(){
	var clipboard = new Clipboard('.hex', {
		target: function(){
			return document.querySelector('.hex'); 
		}
	});
	document.querySelector('.copy').setAttribute('class', 'showed');
}

function copyRgb(){
	var clipboard = new Clipboard('.rgba', {
		target: function(){
			return document.querySelector('.rgba'); 
		}
	});
	document.querySelector('.copy').setAttribute('class', 'showed');
}