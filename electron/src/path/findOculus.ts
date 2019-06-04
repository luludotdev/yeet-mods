import { join } from 'path'
import { regKey } from '../registry'

export const findOculusPath = async () => {
  const key = await regKey(
    '\\Software\\WOW6432Node\\Oculus VR, LLC\\Oculus\\Config',
    'InitialAppLibrary'
  )
  if (key === undefined) return undefined

  return join(key, 'Software', 'hyperbolic-magnetism-beat-saber')
}
