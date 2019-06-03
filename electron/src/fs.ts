import { createHash } from 'crypto'
import fs, { PathLike } from 'fs'
import mkdirp from 'mkdirp'
import { promisify } from 'util'

export const exists = async (path: PathLike) => {
  try {
    await access(path, fs.constants.F_OK)
    return true
  } catch (err) {
    if (err.code === 'ENOENT') return false
    else throw err
  }
}

export const isFile = async (path: PathLike) => {
  const stats = await stat(path)
  return stats.isFile()
}

export const calculateHash = (data: Buffer): string => {
  const hash = createHash('sha1')
  hash.update(data)

  return hash.digest('hex')
}

export const access = promisify(fs.access)
export const stat = promisify(fs.stat)
export const copyFile = promisify(fs.copyFile)
export const ensureDir = promisify(mkdirp)
export const readDir = promisify(fs.readdir)
export const readFile = promisify(fs.readFile)
export const remove = promisify(fs.unlink)
export const rename = promisify(fs.rename)
export const writeFile = promisify(fs.writeFile)
