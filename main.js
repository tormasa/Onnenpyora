const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

app.whenReady().then(() => {
	createWindow()

	// aktivointi-event
	app.on('activate', function () {
		// MACia varten: yhtään ikkunaa ei ole auki, joten avataan ikkuna
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})	
})

// Sulkee appin Windowsilla kun kaikki ikkunat on kiinni
app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') app.quit()
})

function createWindow () {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			// __dirname nykyinen sijainti
			// path.join liittää yhdeksi tiedostopoluksi
			preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
			enableRemoteModule: true,
			contextIsolation: false
	 	}
	})

	//win.removeMenu(true)
	win.loadFile('index.html')

	ipcMain.handle('rendCommand:quitApp', () => {
		console.log('quit app')
	})
}