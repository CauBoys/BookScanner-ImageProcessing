export const BASE_URL = 'http://localhost:5000/image'

export const DEEP_CLONE = (obj) => {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  const result = Array.isArray(obj) ? [] : {}

  for (let key of Object.keys(obj)) {
    result[key] = DEEP_CLONE(obj[key])
  }

  return result
}
