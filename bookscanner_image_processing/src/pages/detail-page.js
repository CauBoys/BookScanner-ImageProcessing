import * as React from 'react'
import '../style/detail.css'
// import '../modules/detail'
import { useHistory } from 'react-router-dom'
import RangeSlider from 'react-bootstrap-range-slider'

const getLocation = () => {}

const drawSection = () => {}

export default function Detail() {
  const history = useHistory()

  return (
    <div className="detail page">
      <div onClick={() => history.push('/home')} className="sub_title">
        <img src="../Polygon.png" className="btn_back" />
        <p className="go_back">Go Back</p>
      </div>
      <div className="title">Adjust Image</div>
      <div className="content">
        {/* <div className="showImg"></div> */}
        <canvas id="jsCanvas" className="canvas"></canvas>
        <div className="adjustImg">
          <div className="adjust">
            <p className="adjust_title">const</p>
            <div className="adjust_content">
              <RangeSlider value="0" onChange={(changeEvent) => {}} />
            </div>
            <p>Erase</p>
            <img src="../border_color.png" className="adjust_content erase" />
          </div>
          <button className="save_btn">Save Change</button>
        </div>
      </div>
    </div>
  )
}
