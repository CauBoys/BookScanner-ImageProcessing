export const BASE_URL = 'http://code-giraffe.iptime.org:35050/'

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

export const encodeBase64ImageTagviaFileReader = (url) => {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.onload = () => {
      let reader = new FileReader()
      reader.onloadend = function () {
        resolve(reader.result)
      }
      reader.readAsDataURL(xhr.response)
    }
    xhr.open('GET', url)
    xhr.responseType = 'blob'
    xhr.send()
  })
}
