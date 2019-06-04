import { app, BrowserWindow, Menu } from 'electron'
import isDev from 'electron-is-dev'
import { setBlurBehind } from 'ewc'
import { convert } from 'ewc-color'
import { join } from 'path'

import './src/yeet'

const instanceLock = app.requestSingleInstanceLock()
if (!instanceLock) app.quit()

let window: BrowserWindow
app.on('ready', () => {
  window = new BrowserWindow({
    height: 600,
    width: 600,

    backgroundColor: '#00000000',
    frame: false,
    maximizable: false,
    resizable: false,
    show: false,
    transparent: true,

    webPreferences: {
      nodeIntegration: true,
    },
  })

  const bg = convert('#c3a6ff')
  setBlurBehind(window, bg)

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
