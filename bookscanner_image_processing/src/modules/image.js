import { BASE_URL, toDataUrl } from '../common/common'
//Action Type
const IMAGE_UPLOAD = 'image/IMAGE_UPLOAD'
const IMAGE_DELETE = 'image/IMAGE_DELETE'
const IMAGE_PROCESSING_MOSAIC = 'image/IMAGE_PROCESSING_MOSAIC'
const IMAGE_PROCESSING_BLUR = 'image/IMAGE_PROCESSING_BLUR'
const IMAGE_PROCESSING_DELETEION = 'image/IMAGE_PROCESSING_DELETION'
const IMAGE_PROCESSING_CONTRAST = 'image/IMAGE_PROCESSING_CONTRAST'
const IMAGE_PROCESSING_RESTORE = 'image/IMAGE_PROCESSING_RESTORE'
const ADD_WATERMARK = 'image/ADD_WATERMARK'
const FIND_IMAGE = 'image/FIND_IMAGE'
//Action Function
export const imageUpload = (image) => ({ type: IMAGE_UPLOAD, image })
export const imageDelete = (id) => ({ type: IMAGE_DELETE, id }) // 해당 id값을 가진 사진 전부 삭제
//Thunk
export const findImage = (images) => async (dispatch, getState) => {
  images.forEach((image, id) => {
    var formdata = new FormData()
    formdata.append('img', image.img)
    var requestOptions = {
      method: 'POST',
      body: formdata,
    }

    const requestImage = () => {
      return new Promise((res, rej) => {
        fetch(BASE_URL + 'ip/cutAndFind', requestOptions)
          .then((response) => response.json())
          .then((result) => {
            return result
          })
          .then((result) => {
            downloadImage(result.subFileName, 'array')
              .then((req) => {
                res(req)
              })
              .catch((err) => {
                rej(err)
              })
          })
          .catch((err) => {
            rej(err)
          })
      })
    }
    requestImage().then((req) => {
      console.log(req)
      dispatch({ type: FIND_IMAGE, id, imgPart: req })
    })
  })
}

export const addWaterMark = (images) => async (dispatch, getState) => {
  images.forEach((image, id) => {
    var formdata = new FormData()
    formdata.append('img', image.img)
    var requestOptions = {
      method: 'POST',
      body: formdata,
    }

    const requestImage = () => {
      return new Promise((res, rej) => {
        fetch(BASE_URL + 'ip/cutAndAdd', requestOptions)
          .then((response) => response.json())
          .then((result) => {
            return result
          })
          .then((result) => {
            downloadImage(result.fileName, 'element')
              .then((req) => {
                res(req)
              })
              .catch((err) => {
                rej(err)
              })
          })
          .catch((err) => {
            rej(err)
          })
      })
    }
    requestImage().then((req) => {
      dispatch({ type: ADD_WATERMARK, id, new_url: req })
    })
  })
}
//blur mosiac deletion contrast
export const addBlur = (image, startX, startY, endX, endY, value) => async (
  dispatch,
  getState
) => {
  const formdata = new FormData()
  formdata.append('img', image.img)
  formdata.append('startX', startX)
  formdata.append('startY', startY)
  formdata.append('endX', endX)
  formdata.append('endY', endY)
  formdata.append('value', value)

  const requestOptions = {
    method: 'POST',
    body: formdata,
  }

  const requestImage = () => {
    return new Promise((res, rej) => {
      fetch(BASE_URL + 'ip/blur', requestOptions)
        .then((response) => response.json())
        .then((result) => {
          return result
        })
        .then((result) => {
          downloadImage(result.fileName, 'element')
            .then((req) => {
              res(req)
            })
            .catch((err) => {
              rej(err)
            })
        })
        .catch((err) => {
          rej(err)
        })
    })
  }
  requestImage().then((req) => {
    dispatch({ type: IMAGE_PROCESSING_BLUR, new_url: req })
  })
}

export const addMosaic = (image, startX, startY, endX, endY, value) => async (
  dispatch,
  getState
) => {
  const formdata = new FormData()
  formdata.append('img', image.img)
  formdata.append('startX', startX)
  formdata.append('startY', startY)
  formdata.append('endX', endX)
  formdata.append('endY', endY)
  formdata.append('value', value)

  const requestOptions = {
    method: 'POST',
    body: formdata,
  }

  const requestImage = () => {
    return new Promise((res, rej) => {
      fetch(BASE_URL + 'ip/mosiac', requestOptions)
        .then((response) => response.json())
        .then((result) => {
          return result
        })
        .then((result) => {
          downloadImage(result.fileName, 'element')
            .then((req) => {
              res(req)
            })
            .catch((err) => {
              rej(err)
            })
        })
        .catch((err) => {
          rej(err)
        })
    })
  }
  requestImage().then((req) => {
    dispatch({ type: IMAGE_PROCESSING_MOSAIC, new_url: req })
  })
}

export const addDeletion = (
  image,
  startX,
  startY,
  endX,
  endY,
  backX,
  backY
) => async (dispatch, getState) => {
  const formdata = new FormData()
  formdata.append('img', image.img)
  formdata.append('startX', startX)
  formdata.append('startY', startY)
  formdata.append('endX', endX)
  formdata.append('endY', endY)
  formdata.append('endY', backX)
  formdata.append('endY', backY)

  const requestOptions = {
    method: 'POST',
    body: formdata,
  }

  const requestImage = () => {
    return new Promise((res, rej) => {
      fetch(BASE_URL + 'ip/deletion', requestOptions)
        .then((response) => response.json())
        .then((result) => {
          return result
        })
        .then((result) => {
          downloadImage(result.fileName, 'element')
            .then((req) => {
              res(req)
            })
            .catch((err) => {
              rej(err)
            })
        })
        .catch((err) => {
          rej(err)
        })
    })
  }
  requestImage().then((req) => {
    dispatch({ type: IMAGE_PROCESSING_DELETEION, new_url: req })
  })
}

export const addContrast = (image) => async (dispatch, getState) => {
  const formdata = new FormData()
  formdata.append('img', image.img)

  const requestOptions = {
    method: 'POST',
    body: formdata,
  }

  const requestImage = () => {
    return new Promise((res, rej) => {
      fetch(BASE_URL + 'ip/cut', requestOptions)
        .then((response) => response.json())
        .then((result) => {
          return result
        })
        .then((result) => {
          downloadImage(result.fileName, 'element')
            .then((req) => {
              res(req)
            })
            .catch((err) => {
              rej(err)
            })
        })
        .catch((err) => {
          rej(err)
        })
    })
  }
  requestImage().then((req) => {
    dispatch({ type: IMAGE_PROCESSING_CONTRAST, new_url: req })
  })
}

//blur mosiac deletion contrast
export const addBlur = (image, startX, startY, endX, endY, value) => async (
  dispatch,
  getState
) => {
  const formdata = new FormData()
  formdata.append('img', image.img)
  formdata.append('startX', startX)
  formdata.append('startY', startY)
  formdata.append('endX', endX)
  formdata.append('endY', endY)
  formdata.append('value', value)

  const requestOptions = {
    method: 'POST',
    body: formdata,
  }

  const requestImage = () => {
    return new Promise((res, rej) => {
      fetch(BASE_URL + 'ip/blur', requestOptions)
        .then((response) => response.json())
        .then((result) => {
          return result
        })
        .then((result) => {
          downloadImage(result.fileName, 'element')
            .then((req) => {
              res(req)
            })
            .catch((err) => {
              rej(err)
            })
        })
        .catch((err) => {
          rej(err)
        })
    })
  }
  requestImage().then((req) => {
    dispatch({ type: IMAGE_PROCESSING_BLUR, id, new_url: req })
  })
}

export const addMosiac = (image, startX, startY, endX, endY, value) => async (
  dispatch,
  getState
) => {
  const formdata = new FormData()
  formdata.append('img', image.img)
  formdata.append('startX', startX)
  formdata.append('startY', startY)
  formdata.append('endX', endX)
  formdata.append('endY', endY)
  formdata.append('value', value)

  const requestOptions = {
    method: 'POST',
    body: formdata,
  }

  const requestImage = () => {
    return new Promise((res, rej) => {
      fetch(BASE_URL + 'ip/mosiac', requestOptions)
        .then((response) => response.json())
        .then((result) => {
          return result
        })
        .then((result) => {
          downloadImage(result.fileName, 'element')
            .then((req) => {
              res(req)
            })
            .catch((err) => {
              rej(err)
            })
        })
        .catch((err) => {
          rej(err)
        })
    })
  }
  requestImage().then((req) => {
    dispatch({ type: IMAGE_PROCESSING_MOSAIC, id, new_url: req })
  })
}

export const addDeletion = (
  image,
  startX,
  startY,
  endX,
  endY,
  backX,
  backY
) => async (dispatch, getState) => {
  const formdata = new FormData()
  formdata.append('img', image.img)
  formdata.append('startX', startX)
  formdata.append('startY', startY)
  formdata.append('endX', endX)
  formdata.append('endY', endY)
  formdata.append('endY', backX)
  formdata.append('endY', backY)

  const requestOptions = {
    method: 'POST',
    body: formdata,
  }

  const requestImage = () => {
    return new Promise((res, rej) => {
      fetch(BASE_URL + 'ip/deletion', requestOptions)
        .then((response) => response.json())
        .then((result) => {
          return result
        })
        .then((result) => {
          downloadImage(result.fileName, 'element')
            .then((req) => {
              res(req)
            })
            .catch((err) => {
              rej(err)
            })
        })
        .catch((err) => {
          rej(err)
        })
    })
  }
  requestImage().then((req) => {
    dispatch({ type: IMAGE_PROCESSING_DELETEION, id, new_url: req })
  })
}

export const addContrast = (image) => async (dispatch, getState) => {
  const formdata = new FormData()
  formdata.append('img', image.img)

  const requestOptions = {
    method: 'POST',
    body: formdata,
  }

  const requestImage = () => {
    return new Promise((res, rej) => {
      fetch(BASE_URL + 'ip/cut', requestOptions)
        .then((response) => response.json())
        .then((result) => {
          return result
        })
        .then((result) => {
          downloadImage(result.fileName, 'element')
            .then((req) => {
              res(req)
            })
            .catch((err) => {
              rej(err)
            })
        })
        .catch((err) => {
          rej(err)
        })
    })
  }
  requestImage().then((req) => {
    dispatch({ type: IMAGE_PROCESSING_CONTRAST, id, new_url: req })
  })
}

export const downloadImage = (fileName, type) => {
  return new Promise((res, rej) => {
    let imgArray = []
    type == 'element'
      ? fetch(BASE_URL + `file/download/${fileName}`).then((result) => {
          toDataUrl(result.url, function (myBase64) {
            res(myBase64)
          })
        })
      : fileName.forEach(async (item) => {
          await fetch(BASE_URL + `file/download/${item}`).then((result) => {
            toDataUrl(result.url, function (myBase64) {
              imgArray.push(myBase64)
            })
          })
        })
    //임시방편
    setTimeout(() => {
      res(imgArray)
    }, 5000)
  })
}

export const processMosaic = (image) => async (dispatch, getState) => {
  //모자이크 처리, c++로 image 정보 넘기고 결과를 다시 받아야함
  // const result = mosaicImage(image)
  const result = null // 임시
  dispatch({ type: IMAGE_PROCESSING_MOSAIC, image, result })
}
export const processRestore = (id, type_process, type_id) => async (
  dispatch,
  getState
) => {
  const original = getState().bufferImage.filter(
    (v) =>
      v.id === id &&
      v.type_process === type_process &&
      v.type_id === type_id - 1
  )
  if (type_id === 0) {
    type_process = 'O'
  }
  dispatch({
    type: IMAGE_PROCESSING_RESTORE,
    id,
    type_process,
    type_id,
    original,
  })
}
//initialState 이런식으로 저장될 예정, 지금은 dummy data고 나중에 전부 지워야함
//같은 이미지에 대한 다른 영상처리는 같은 id값, 다른 type_process(M, B, D, O), 다른 type_id값을 가짐
//Restore는 각각의 기능별로(모자이크, 블러, deletion)의 뒤로가기 느낌 구현할 예정.
const initialState = {
  imageFile: [
    /* 현재 과정 명시적으로 나타는것
    {
      id: 0, // 같은 사진에 대해서는 같은 id값다른 type_process, type_id
      type_process: 'O', //origin image
      type_id: 0,
      name: 'LOGO',
      selectRectZone: {
        xMin: 0,
        yMin: 0,
        xMax: 0,
        yMax: 0,
      },
      uri: null,
    },
    {
      id: 0,
      type_process: 'M',
      type_id: 0, //모자이크 1번
      name: 'LOGO',
      selectRectZone: {
        xMin: 10,
        yMin: 10,
        xMax: 50,
        yMax: 50,
      },
      uri: null,
    },
    */
    {
      id: 0,
      type_process: 'M', //모자이크 2번
      type_id: 1,
      name: 'LOGO',
      selectRectZone: {
        xMin: 100,
        yMin: 100,
        xMax: 200,
        yMax: 200,
      },
      uri: null,
    },
  ],
  //원본의 이미지에 영상처리(모자이크 등)을 가했을때 복구하기 위한 버퍼이미지
  bufferImage: [
    {
      id: 0,
      type_process: 'O', //0번 사진을 mosaic 기능을 눌렀을때 누르기 전의 이미지 저장(즉 origin이미지 저장)
      type_id: 0, //0번 사진을 mosaic 기능을 1번 사용
      name: 'LOGO',
      selectRectZone: {
        xMin: 0,
        yMin: 0,
        xMax: 0,
        yMax: 0,
      },
      uri: null,
    },
    {
      id: 0,
      type_process: 'M',
      type_id: 0, //0번 사진을 mosaic 기능을 2번째로 사용한 경우 1번 사용했을때의 정보를 저장
      name: 'LOGO',
      selectRectZone: {
        xMin: 10,
        yMin: 10,
        xMax: 50,
        yMax: 50,
      },
      uri: null,
    },
  ],
}

//Reducer
export default function image(state = initialState, action) {
  switch (action.type) {
    case IMAGE_UPLOAD:
      return {
        ...state,
        imageFile: [...state.imageFile, ...action.image],
      }
    case IMAGE_DELETE:
      return {
        ...state,
        imageFile: state.imageFile.filter((v) => v.id !== action.id),
        bufferImage: state.bufferImage.filter((v) => v.id !== action.id),
      }
    case IMAGE_PROCESSING_MOSAIC:
      return {
        ...state,
        imageFile: [...action.result],
        bufferImage: [...state.bufferImage, ...action.image],
      }
    case IMAGE_PROCESSING_RESTORE:
      return {
        ...state,
        //현재 image 삭제
        imageFile: state.imageFile.filter(
          (v) =>
            !(
              v.id === action.id &&
              v.type_process === action.type_process &&
              v.type_id === action.type_id
            )
        ),
        //이전 상태의 image 불러옴
        imageFile: [...state.imageFile, ...action.original],
        //불러온 버퍼의 이미지 삭제
        bufferImage: state.bufferImage.filter(
          (v) =>
            !(
              v.id === action.id &&
              v.type_process === action.type_process &&
              v.type_id === action.type_id - 1
            )
        ),
      }
    default:
      return state
  }
}
