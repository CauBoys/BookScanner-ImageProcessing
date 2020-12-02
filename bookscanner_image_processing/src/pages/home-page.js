import React, { useState, useRef, useCallback, useEffect } from 'react'
import { NextButtons } from '../components/nextButton'
import {
  Button,
  Card,
  ProgressBar,
  Image,
  Col,
  Container,
  Row,
} from 'react-bootstrap'
import { FaDownload, FaPlusCircle } from 'react-icons/fa'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css'
import testImg from '../assets/logo.png'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { imageUpload, imageDelete, addWaterMark } from '../modules/image'
import {
  BASE_URL,
  DEEP_CLONE,
  encodeBase64ImageTagviaFileReader,
} from '../common/common'
import '../style/home.css'

export default function Home() {
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
    },
  ])
  const [contrastValue, setContrastValue] = useState([])
  const hiddenFileInput = useRef(null)
  const nextId = useRef(0)
  const imageStore = useSelector((state) => state.image.imageFile)
  const dispatch = useDispatch()

  const imgUpload = useCallback((image) => dispatch(imageUpload(image)), [
    dispatch,
  ])
  const imgDelete = useCallback(() => dispatch(imageDelete()), [dispatch])
  const imgWaterMark = useCallback((images) => dispatch(addWaterMark(images)), [
    dispatch,
  ])
  useEffect(() => {
    if (nextId.current >= 1) {
      imgUpload(image)
    }

    nextId.current += 1
  }, [image])

  const handleSaveClick = () => {
    for (var i = 0; i < nextId.current - 1; i++) {
      const link = document.createElement('a')
      link.href = imageStore[i].url

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
      setContrastValue((oldArray) => [...oldArray, newValue])
    }
    reader.readAsDataURL(file)
  }

  const cardList = (imageStore) => {
    return imageStore.map((item, id) => {
      return (
        <Card className="Card" id={id}>
          <Card.Header>HELLO</Card.Header>
          <Card.Img className="Card-Image" variant="top" src={item.url} />

          <Card.Body className="Card-Body">
            <NextButtons
              className="Next-Button"
              path="/detail"
              name="Adjust Image"
              id={id}
            />
          </Card.Body>
        </Card>
      )
    })
  }

  return (
    <div className="Container">
      <div className="Header">
        <h1 className="Title">Image List</h1>
        <Button
          variant="primary"
          className="DownloadButton"
          onClick={() => {
            if (
              window.confirm(
                `${nextId.current - 1}개의 사진을 다운로드 받으시겠습니까?`
              ) == true
            ) {
              imgWaterMark(imageStore)
              handleSaveClick()
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
        <h1 className="Title">Auto Cropped Image</h1>
        <h2 className="SubTitle">Click Image to link page</h2>
        <div>
          <Container>
            <Row>
              <Col xs={6} md={4}>
                <Image src={imageStore[0].new_url} rounded />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  )
}
