type InstallPlatform = 'steam' | 'oculus' | 'unknown'

interface IInstallInfo {
  path: string | null
  platform: InstallPlatform
  valid: boolean
}
