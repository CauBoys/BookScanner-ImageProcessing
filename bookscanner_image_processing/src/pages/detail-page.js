import React, { useState } from 'react'
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

  return (
    <div className="detail page">
      <div onClick={() => history.push('/home')} className="sub_title">
        <img src="../Polygon.png" className="btn_back" />
        <p className="go_back">Go Back</p>
      </div>
      <div className="title">Adjust Image</div>
      <div className="content">
        {/* <div className="showImg"></div> */}
        <canvas
          id="jsCanvas"
          className="canvas"
          style={{
            backgroundImage:
              'url(https://s7d2.scene7.com/is/image/TWCNews/snowflake-formatted-snow-03222020jpg?wid=1250&hei=703&$wide-bg$)',
          }}
        ></canvas>
        <div className="adjustImg">
          <div className="adjust">
            <p className="adjust_title">const</p>
            <div className="adjust_content">
              <input
                type="range"
                id="jsRange"
                min="0.1"
                max="5"
                value="2.5"
                step="0.1"
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
                    id="jsRange"
                    min="0.1"
                    max="5"
                    value="2.5"
                    step="0.1"
                  />
                  {/* <RangeSlider value="0" onChange={(changeEvent) => {}} /> */}
                </div>
                <p className="adjust_title">blur</p>
                <div className="adjust_content">
                  <input
                    type="range"
                    id="jsRange"
                    min="0.1"
                    max="5"
                    value="2.5"
                    step="0.1"
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
