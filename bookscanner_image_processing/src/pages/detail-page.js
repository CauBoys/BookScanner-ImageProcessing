import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import '../style/detail.css'
import {
  drawEraseSection,
  handleSaveClick,
  endPainting,
} from '../modules/detail'
import { useHistory } from 'react-router-dom'

const getLocation = () => {}

const drawSection = () => {}

export default function Detail() {
  const history = useHistory()
  const [checkErase, setCheckErase] = useState(false)
  const id = Number(window.location.pathname.replace('/detail/', '')) + 1
  const imageStore = useSelector((state) => state.image.imageFile)
  const imageDate = imageStore.filter((image) => image.id === id)
  const [constrast, setConstrast] = useState(50)
  const [mosaic, setMosaic] = useState(50)
  const [blur, setBlur] = useState(50)

  return (
    <div className="detail page">
      <div onClick={() => history.push('/home')} className="sub_title">
        <img src="../Polygon.png" className="btn_back" />
        <p className="go_back">Go Back</p>
      </div>
      <div className="title">
        <p>Adjust Image</p>
        <Button variant="primary" className="DownloadButton">
          Save
        </Button>
      </div>
      <div className="content">
        {/* <div className="showImg"></div> */}
        <canvas
          id="jsCanvas"
          className="canvas"
          style={{
            backgroundImage: `url(${imageDate[0].url})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center center',
          }}
        ></canvas>
        <div className="adjustImg">
          <div className="adjust">
            <p className="adjust_title">const</p>
            <div className="adjust_content">
              <input
                type="range"
                id="constrastRange"
                min="0"
                max="100"
                value={constrast}
                step="1"
                onChange={() =>
                  setConstrast(document.querySelector('#constrastRange').value)
                }
              />
              {/* <RangeSlider value="0" onChange={(changeEvent) => {}} /> */}
            </div>
            <p>Erase</p>
            <img
              onClick={() => {
                setCheckErase(!checkErase)
                drawEraseSection()
              }}
              src="../border_color.png"
              className="adjust_content erase"
            />
            {checkErase ? (
              <>
                <p className="adjust_title">mosaic</p>
                <div className="adjust_content">
                  <input
                    type="range"
                    id="mosaicRange"
                    min="0"
                    max="100"
                    value={mosaic}
                    step="1"
                    onChange={() =>
                      setMosaic(document.querySelector('#mosaicRange').value)
                    }
                  />
                </div>
                <p className="adjust_title">blur</p>
                <div className="adjust_content">
                  <input
                    type="range"
                    id="blurRange"
                    min="0"
                    max="100"
                    value={blur}
                    step="1"
                    onChange={() =>
                      setBlur(document.querySelector('#blurRange').value)
                    }
                  />
                  {/* <RangeSlider value="0" onChange={(changeEvent) => {}} /> */}
                </div>
                <p className="adjust_title">delete</p>
                <div className="adjust_content">
                  <img
                    onClick={() => endPainting()}
                    src="../spoid.png"
                    className="adjust_content erase spoid "
                  />
                  {/* <RangeSlider value="0" onChange={(changeEvent) => {}} /> */}
                </div>
              </>
            ) : (
              ''
            )}
          </div>
          <button onClick={() => handleSaveClick()} className="save_btn">
            Save Change
          </button>
        </div>
      </div>
    </div>
  )
}
