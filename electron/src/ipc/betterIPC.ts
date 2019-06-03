import { BrowserWindow, ipcMain as ipc, WebContents } from 'electron'
import serializeError from 'serialize-error'

const getResponseChannels = (channel: string) => ({
  dataChannel: `%better-ipc-response-data-channel-${channel}`,
  errorChannel: `%better-ipc-response-error-channel-${channel}`,
  sendChannel: `%better-ipc-send-channel-${channel}`,
})

const getRendererResponseChannels = (windowId: number, channel: string) => ({
  dataChannel: `%better-ipc-response-data-channel-${windowId}-${channel}`,
  errorChannel: `%better-ipc-response-error-channel-${windowId}-${channel}`,
  sendChannel: `%better-ipc-send-channel-${windowId}-${channel}`,
})

export const callRenderer: <Reply = any, Arg = any>(
  window: BrowserWindow,
  channel: string,
  data: Arg
) => Promise<Reply> = (window, channel, data) =>
  new Promise((resolve, reject) => {
    const {
      sendChannel,
      dataChannel,
      errorChannel,
    } = getRendererResponseChannels(window.id, channel)

    const cleanup = () => {
      ipc.removeAllListeners(dataChannel)
      ipc.removeAllListeners(errorChannel)
    }

    ipc.on(dataChannel, (_: any, result: any) => {
      cleanup()
      resolve(result)
    })

    ipc.on(errorChannel, (_: any, error: Error) => {
      cleanup()
      reject(error)
    })

    if (window.webContents) {
      window.webContents.send(sendChannel, data)
    }
  })

export const answerRenderer: <Reply = any, Arg = any>(
  channel: string,
  callback: (arg: Arg, window?: BrowserWindow) => Reply | Promise<Reply>
) => void = (channel, callback) => {
  const { sendChannel, dataChannel, errorChannel } = getResponseChannels(
    channel
  )

  const listener = async (event: { sender: WebContents }, data: any) => {
    const window = BrowserWindow.fromWebContents(event.sender)

    const send = (ch: string, da: any) => {
      if (!(window && window.isDestroyed())) {
        event.sender.send(ch, da)
      }
    }

    try {
      send(dataChannel, await callback(data, window))
    } catch (error) {
      send(errorChannel, serializeError(error))
    }
  }

  ipc.on(sendChannel, listener)
  return () => {
    ipc.removeListener(sendChannel, listener)
  }
}
