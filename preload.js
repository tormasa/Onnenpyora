const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld(
	'rendCommand', {
		quitApp: () => ipcRenderer.invoke('rendCommand:quitApp')
	}
)