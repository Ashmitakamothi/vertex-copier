import appConfig from '../../public/config.json'
import type { RuntimeConfig } from './types'

const DEFAULT_API_BASE_URL = 'http://localhost:3000/api'

const resolveApiBaseUrl = (): string => {
  if (
    typeof appConfig === 'object' &&
    appConfig !== null &&
    'apiBaseUrl' in appConfig &&
    typeof appConfig.apiBaseUrl === 'string' &&
    appConfig.apiBaseUrl.trim()
  ) {
    return appConfig.apiBaseUrl.trim()
  }

  return DEFAULT_API_BASE_URL
}

const runtimeConfig: RuntimeConfig = {
  apiBaseUrl: resolveApiBaseUrl(),
}

export async function loadAppConfig(): Promise<RuntimeConfig> {
  return runtimeConfig
}

export function getApiBaseUrl(): string {
  return runtimeConfig.apiBaseUrl
}
