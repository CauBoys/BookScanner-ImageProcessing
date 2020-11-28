import React, { useState, useRef, useCallback, useEffect } from 'react'
import { NextButtons } from '../components/nextButton'
import { Button, Card, ProgressBar } from 'react-bootstrap'
import { FaPlusCircle } from 'react-icons/fa'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css'
import RangeSlider from 'react-bootstrap-range-slider'
import testImg from '../assets/logo.png'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { imageUpload, imageDelete } from '../modules/image'
import { BASE_URL, DEEP_CLONE } from '../common/common'
import '../style/home.css'

export default function Home() {
  const [imageList, setImageList] = useState()
  const [image, setImage] = useState([
    {
      file: '',
      id: 0,
      type_process: 'O',
      type_id: 0,
      selectRectZone: {
        xMin: 0,
        yMin: 0,
        xMax: 0,
        yMax: 0,
      },
      url: '',
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

  useEffect(() => {
    if (nextId.current >= 1) {
      imgUpload(image)
    }
    nextId.current += 1
  }, [image])

  const handleClick = (event) => {
    hiddenFileInput.current.click()
  }

  const handleChange = async (event) => {
    event.preventDefault()
    let reader = new FileReader()
    let file = event.target.files[0]
    reader.onloadend = () => {
      let newArr = DEEP_CLONE(image)
      newArr[0].file = file
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
          <Card.Img className="Card-Image" variant="top" src={item.url} />
          <Card.Body className="Card-Body">
            <div className="Slider-Container">
              <div className="Slider-Title">contrast</div>
              <div className="Slider">
                <RangeSlider
                  value={contrastValue[nextId.current]}
                  onChange={(changeEvent) => {
                    setContrastValue(
                      contrastValue.map((item) =>
                        item.id === id + 1
                          ? { ...item, value: changeEvent.target.value }
                          : item
                      )
                    )

                    console.log(contrastValue)
                  }}
                />
              </div>
            </div>
            <div className="Next-Button">
              <NextButtons path="/detail" name="Adjust Image" />
            </div>
          </Card.Body>
        </Card>
      )
    })
  }

  return (
    <div className="Container">
      <div className="Header">
        <h1 className="Title">Image List</h1>
        {/* <Button variant="primary" className="AddButton">
          <FaPlusCircle size={20} />
        </Button> */}
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
      </div>
    </div>
  )
}
