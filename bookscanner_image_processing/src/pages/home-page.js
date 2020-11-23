import React, { useState, useRef } from 'react'
import { NextButtons } from '../components/nextButton'
import { Button, Card, ProgressBar } from 'react-bootstrap'
import { FaPlusCircle } from 'react-icons/fa'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css'
import RangeSlider from 'react-bootstrap-range-slider'
import testImg from '../assets/logo.png'
import '../style/home.css'

export default function Home() {
  const [image, setImage] = useState()
  const [contrastValue, setContrastValue] = useState(0)
  const hiddenFileInput = useRef(null)

  const handleClick = (event) => {
    hiddenFileInput.current.click()
  }
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0]
    setImage(fileUploaded)
  }
  return (
    <div className="Container">
      <div className="Header">
        <h1 className="Title">Image List</h1>
        <Button variant="primary" className="AddButton">
          <FaPlusCircle size={20} />
        </Button>
      </div>
      <div className="Body-Container">
        <Card className="Card">
          <Card.Img className="Card-Image" variant="top" src={testImg} />
          <Card.Body className="Card-Body">
            <div className="Slider-Container">
              <div className="Slider-Title">contrast</div>
              <div className="Slider">
                <RangeSlider
                  value={contrastValue}
                  onChange={(changeEvent) =>
                    setContrastValue(changeEvent.target.value)
                  }
                />
              </div>
            </div>
            <div className="Next-Button">
              <NextButtons path="/detail" name="Adjust Image" />
            </div>
          </Card.Body>
        </Card>
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
    </div>
  )
}
