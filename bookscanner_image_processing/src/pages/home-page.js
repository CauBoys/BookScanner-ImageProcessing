import React, { useState } from 'react'
import { NextButtons } from '../components/nextButton'
import { Button, Card, ProgressBar } from 'react-bootstrap'
import { FaPlusCircle } from 'react-icons/fa'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css'
import RangeSlider from 'react-bootstrap-range-slider'
import '../style/home.css'
export default function Home() {
  const [contrastValue, setContrastValue] = useState(0)

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
          <Card.Img
            className="Card-Image"
            variant="top"
            src="../../assets/logo.png/100px180"
          />
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
            <NextButtons path="/detail" name="Adjust Image" />
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}
