import * as React from 'react'

const getLocation = () => {}

const drawSection = () => {}

export const Detail = () => {
  return (
    <div className="detail page">
      <div className="sub_title">
        <img src="../Polygon.png" className="btn_back" />
        <p class="go_back">Go Back</p>
      </div>
      <div class="title">Adjust Image</div>
      <div className="content">
        <div className="showImg"></div>
        <div className="adjustImg">
          <div className="adjust">
            <p className="adjust_title">const</p>
            <div className="adjust_content">---------------</div>
            <p>Erase</p>
            <img src="../border_color.png" className="adjust_content erase" />
          </div>
          <button className="btn">Save Change</button>
        </div>
      </div>
    </div>
  )
}
