import { app, BrowserWindow, Menu } from 'electron'
import isDev from 'electron-is-dev'
import { join } from 'path'

const instanceLock = app.requestSingleInstanceLock()
if (!instanceLock) app.quit()

let window: BrowserWindow
app.on('ready', () => {
  window = new BrowserWindow({
    height: 870,
    width: 1500,

    minHeight: 520,
    minWidth: 750,

    // backgroundColor: '#00000000',
    frame: false,
    show: false,
    // transparent: true,

    webPreferences: {
      experimentalFeatures: true,
      nodeIntegration: true,
    },
  })

  const menu = !isDev
    ? null
    : Menu.buildFromTemplate([
        {
          label: 'Dev',
          submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { role: 'toggledevtools' },
          ],
        },
      ])

  window.setMenu(menu)

  window.setTitle('YeetMods')
  const startURL = isDev
    ? 'http://localhost:1234'
    : `file://${join(__dirname, '../build/index.html')}`

  window.loadURL(startURL)
  window.on('ready-to-show', () => window.show())
  window.on('closed', () => app.quit())
})
