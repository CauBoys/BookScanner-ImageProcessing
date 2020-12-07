import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Button as Btn } from 'react-bootstrap'
import {
  Button,
  Card,
  ProgressBar,
  Image,
  Col,
  Container,
  Row,
} from 'react-bootstrap'
import { FaDownload, FaPlusCircle, FaCut } from 'react-icons/fa'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css'
import testImg from '../assets/logo.png'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import {
  imageUpload,
  imageDelete,
  addWaterMark,
  findImage,
} from '../modules/image'
import {
  BASE_URL,
  DEEP_CLONE,
  encodeBase64ImageTagviaFileReader,
} from '../common/common'
import '../style/home.css'

export default function Home() {
  let imgX = 0
  let imgY = 0

  const [imageList, setImageList] = useState()
  const [image, setImage] = useState([
    {
      img: '',
      id: 0,
      type_process: 'O',
      type_id: 0,
      selectRectZone: {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0,
      },
      backgroundZone: {
        backX: 0,
        backY: 0,
      },
      contrast: {
        value: 0,
      },
      imgPart: [],
    },
  ])
  const [cutImage, setCutImage] = useState()
  const hiddenFileInput = useRef(null)
  const nextId = useRef(0)
  const [buttonBlock, setButtonBlock] = useState(true)
  const imageStore = useSelector((state) => state.image.imageFile)
  const dispatch = useDispatch()
  console.log(image)
  const imgUpload = useCallback((image) => dispatch(imageUpload(image)), [
    dispatch,
  ])
  const imgDelete = useCallback((id) => dispatch(imageDelete(id)), [dispatch])
  const imgWaterMark = useCallback((images) => dispatch(addWaterMark(images)), [
    dispatch,
  ])
  const findImg = useCallback((images) => dispatch(findImage(images)), [
    dispatch,
  ])
  useEffect(() => {
    if (nextId.current >= 1) {
      imgUpload(image)
    }
    nextId.current += 1
  }, [image])

  useEffect(() => {
    if (nextId.current > 1) {
      setButtonBlock(false)
    } else {
      setButtonBlock(true)
    }
  }, [nextId.current])

  const NextButtons = ({ path, name, id }) => {
    const history = useHistory()
    return (
      <div>
        <Btn
          variant="primary"
          onClick={() => {
            imgWaterMark(imageStore).then(() => {
              history.push(`${path}/${id}`)
            })
          }}
        >
          {name}
        </Btn>
      </div>
    )
  }

  const handleSaveClick = () => {
    for (var i = 0; i < nextId.current - 1; i++) {
      const link = document.createElement('a')
      link.href = imageStore[i].new_url
      link.download = `${imageStore[i].img.name}`
      link.click()
    }
  }
  const handleClick = (event) => {
    hiddenFileInput.current.click()
  }
  const handleChange = async (event) => {
    event.preventDefault()
    let reader = new FileReader()
    let file = event.target.files[0]
    reader.onloadend = () => {
      let newArr = DEEP_CLONE(image)
      newArr[0].img = file
      newArr[0].id = nextId.current
      newArr[0].url = reader.result

      setImage(newArr)
      let newValue = {
        id: nextId.current,
        value: 0,
      }
    }
    reader.readAsDataURL(file)
    console.log(file)
    fetch(BASE_URL + 'ip/uploadInfor', {
      method: 'POST',
      body: {
        img: file,
      },
    }).then((response) => {
      console.log('1')
      console.log(response)
    })
  }

  const cardList = (imageStore) => {
    return imageStore.map((item, id) => {
      const formdata = new FormData()

      formdata.append('img', item)
      const requestOptions = {
        method: 'POST',
        body: item,
      }

      console.log(requestOptions)
      // new Promise((res, rej) => {
      //   fetch(BASE_URL + 'ip/uploadInfor', requestOptions)
      //     .then((response) => response.json())
      //     .then((result) => {
      //       console.log(result)
      //       return result
      //     })
      //     .then((result) => {
      //       console.log(result)
      //       console.log(newY)
      //     })
      //     .catch((err) => {
      //       rej(err)
      //     })
      // })

      return (
        <Card className="Card" id={id}>
          <button
            class="Button-Remove"
            onClick={() => {
              nextId.current -= 1
              imgDelete(item.id)
            }}
          >
            X
          </button>
          <Card.Img className="Card-Image" variant="top" src={item.url} />
          <Card.Body className="Card-Body">
            <NextButtons
              className="Next-Button"
              path="/detail"
              name="Adjust Image"
              id={id}
              // width={imgX}
              // height={imgY}
            />
          </Card.Body>
        </Card>
      )
    })
  }

  const imgPartList = (imageStore) => {
    return imageStore.map((item, id) => {
      return item.imgPart.map((img, imgId) => {
        return (
          <Card className="Card" id={imgId}>
            <Card.Img className="Card-Image" variant="top" src={img} />
            <Card.Body className="Card-Body">
              <NextButtons
                className="Next-Button"
                path="/detail"
                name="Go"
                id={item.id - 1}
                witdh={imgX}
                height={imgX}
              />
            </Card.Body>
          </Card>
        )
      })
    })
  }

  return (
    <div className="Container">
      <div className="Header">
        <h1 className="Title">Image List</h1>
        <Button
          variant="primary"
          className="DownloadButton"
          disabled={buttonBlock}
          onClick={() => {
            if (
              window.confirm(
                `${nextId.current - 1}개의 사진을 다운로드 받으시겠습니까?`
              ) == true
            ) {
              imgWaterMark(imageStore)
              setTimeout(() => {
                handleSaveClick()
              }, 3000)
            } else {
              return false
            }
          }}
        >
          <FaDownload size={20} />
        </Button>
      </div>
      <div className="Body-Container">
        {cardList(imageStore)}
        <Card className="Card Card-Add">
          <Card.Body className="Card-Body">
            <Button
              variant="Dark"
              className="AddButton-Card"
              onClick={handleClick}
            >
              <FaPlusCircle size={40} />
            </Button>
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
              accept="image/*"
              style={{ display: 'none' }}
            />
          </Card.Body>
        </Card>
      </div>
      <div className="Header-Second">
        <div className="Body-Container">
          <h1 className="Title">Auto Cropped Image</h1>
          <Button
            variant="primary"
            className="DownloadButton"
            disabled={buttonBlock}
            onClick={() => {
              if (
                window.confirm(
                  `${nextId.current - 1}개의 사진의 이미지를 추출하시겠습니까?`
                ) == true
              ) {
                findImg(imageStore)
              } else {
                return false
              }
            }}
          >
            <FaCut size={20} />
          </Button>
        </div>
        <h2 className="SubTitle">Click Image to link page</h2>
      </div>
      <div className="Body-Container">{imgPartList(imageStore)}</div>
    </div>
  )
}
