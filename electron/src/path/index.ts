import { answerRenderer } from '../ipc/betterIPC'
import { resolveInstallInfo } from './resolve'

answerRenderer<IInstallInfo, string | null>('resolve-install', async path => {
  const info = await resolveInstallInfo(path === null ? undefined : path)
  return info
})
