import { join } from 'path'
import { exists } from '../fs'
import { BEAT_SABER_EXE } from './constants'
import { findOculusPath } from './findOculus'
import { findSteamPath } from './findSteam'

export type PathLike = string | null

const validatePath = async (path: PathLike) => {
  if (path === null) return false

  const exe = join(path, BEAT_SABER_EXE)
  return exists(exe)
}

const resolvePlatform: (path: PathLike) => InstallPlatform = path => {
  if (path === null) return 'unknown'

  const lower = path.toLowerCase()
  if (
    lower.includes('oculus') ||
    lower.includes('hyperbolic-magnetism-beat-saber')
  ) {
    return 'oculus'
  }

  return 'steam'
}

export const resolveInstallPath = async () => {
  const steam = await findSteamPath()
  if (steam !== undefined) return steam

  const oculus = await findOculusPath()
  if (oculus !== undefined) return oculus

  return null
}

export const resolveInstallInfo: (
  p?: PathLike
) => Promise<IInstallInfo> = async p => {
  const path = p === undefined ? await resolveInstallPath() : p
  const valid = await validatePath(path)
  const platform = resolvePlatform(path)

  return { path, valid, platform }
}
