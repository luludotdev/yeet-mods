import { serializeError } from 'serialize-error'
import { ipcRenderer as ipc, remote } from './electron'

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

export const callMain: <Reply = any, Arg = any>(
  channel: string,
  data: Arg
) => Promise<Reply> = (channel, data) =>
  new Promise((resolve, reject) => {
    const { sendChannel, dataChannel, errorChannel } = getResponseChannels(
      channel
    )

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

    ipc.send(sendChannel, data)
  })

export const answerMain: <Reply = any, Arg = any>(
  channel: string,
  callback: (arg: Reply, window?: Electron.BrowserWindow) => Arg | Promise<Arg>
) => void = (channel, callback) => {
  const window = remote.getCurrentWindow()
  const {
    sendChannel,
    dataChannel,
    errorChannel,
  } = getRendererResponseChannels(window.id, channel)

  const listener = async (_: any, data: any) => {
    try {
      ipc.send(dataChannel, await callback(data))
    } catch (error) {
      ipc.send(errorChannel, serializeError(error))
    }
  }

  ipc.on(sendChannel, listener)
  return () => {
    ipc.removeListener(sendChannel, listener)
  }
}
