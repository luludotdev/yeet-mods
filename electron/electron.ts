import { app, BrowserWindow, dialog, Menu, shell } from 'electron'
import isDev from 'electron-is-dev'
import { autoUpdater } from 'electron-updater'
import { setBlurBehind } from 'ewc'
import { convert } from 'ewc-color'
import { join } from 'path'

import './src/yeet'

const instanceLock = app.requestSingleInstanceLock()
if (!instanceLock) app.quit()

let window: BrowserWindow
app.on('ready', () => {
  if (!isDev) autoUpdater.checkForUpdates()

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

  const bg = convert('#c3a6ff10')
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

autoUpdater.on('download-progress', ({ percent }) => {
  window.setProgressBar(percent / 100, { mode: 'normal' })
})

autoUpdater.on('update-downloaded', async () => {
  const button = dialog.showMessageBox(window, {
    buttons: ['Release Notes', 'OK'],
    message:
      'A newer version has been downloaded.\n\nClick OK to install the update.' +
      '\nThe program will restart with the update applied.',
    title: 'Auto Updater',
    type: 'info',
  })

  if (button === 0) {
    const {
      provider: {
        // @ts-ignore
        options: { owner, repo },
      },
      // @ts-ignore
    } = await autoUpdater.getUpdateInfoAndProvider()

    const releases = `https://github.com/${owner}/${repo}/releases`
    shell.openExternal(releases)
  }

  autoUpdater.quitAndInstall(true, true)
})
