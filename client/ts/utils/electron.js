/**
 * @type {import('electron')}
 */
const electron = window.require('electron')

export default electron
export const remote = electron.remote
export const shell = electron.shell
export const clipboard = electron.clipboard
export const ipcRenderer = electron.ipcRenderer
export const app = electron.remote.app
export const dialog = electron.remote.dialog
export const getCurrentWindow = electron.remote.getCurrentWindow
