import { join } from 'path'
import { exists, readFile } from '../fs'
import { regKey } from '../registry'
import { STEAM_APP_ID, STEAM_REG_KEY, STEAM_REG_VAL } from './constants'

const findSteamLibraries = async () => {
  const steamPath = await regKey(STEAM_REG_KEY, STEAM_REG_VAL)

  if (steamPath === undefined) return []
  const baseDir = join(steamPath, 'steamapps')
  const libraryfolders = await readFile(
    join(baseDir, 'libraryfolders.vdf'),
    'utf8'
  )

  const regex = /\s"\d"\s+"(.+)"/
  const libraries = libraryfolders
    .split('\n')
    .filter(line => line.match(regex))
    .map(line =>
      (regex.exec(line) as RegExpExecArray)[1].replace(/\\\\/g, '\\')
    )
    .map(line => join(line, 'steamapps'))

  return [baseDir, ...libraries]
}

const findSteamPathFromLibraries: () => Promise<
  string | undefined
> = async () => {
  const libraries = await findSteamLibraries()
  if (libraries.length === 0) return undefined

  const manifests = await Promise.all(
    libraries.map(async library => {
      const test = join(library, `appmanifest_${STEAM_APP_ID}.acf`)
      const fileExists = await exists(test)
      return { path: test, library, fileExists }
    })
  )

  const filtered = manifests.filter(x => x.fileExists)
  if (filtered.length === 0) return undefined
  const [manifestInfo] = filtered
  const manifestLines = await readFile(manifestInfo.path, 'utf8')

  return parseManifest(manifestLines, manifestInfo.library)
}

const parseManifest = (manifestLines: string, library: string) => {
  const regex = /\s"installdir"\s+"(.+)"/
  const [installDir] = manifestLines
    .split('\n')
    .filter(line => line.match(regex))
    .map(line =>
      (regex.exec(line) as RegExpMatchArray)[1].replace(/\\\\/g, '\\')
    )

  return join(library, 'common', installDir)
}

const findSteamPathFromRegistry: () => Promise<
  string | undefined
> = async () => {
  const key = await regKey(
    `\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\Steam App ${STEAM_APP_ID}`,
    'InstallLocation'
  )

  if (key === undefined) return undefined
  else return key
}

export const findSteamPath: () => Promise<string | undefined> = async () => {
  const fromLibs = await findSteamPathFromLibraries()
  if (fromLibs !== undefined) return fromLibs

  const fromReg = await findSteamPathFromRegistry()
  if (fromReg !== undefined) return fromReg

  return undefined
}
