import appConfig from '../../public/config.json'

const DEFAULT_API_BASE_URL = 'http://localhost:3000/api'

const resolveApiBaseUrl = () => {
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

const runtimeConfig = {
  apiBaseUrl: resolveApiBaseUrl(),
}

export async function loadAppConfig() {
  return runtimeConfig
}

export function getApiBaseUrl() {
  return runtimeConfig.apiBaseUrl
}
