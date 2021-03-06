import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import '../style/detail.css'
import { drawEraseSection } from '../modules/detail'
import { useHistory } from 'react-router-dom'
import { addBlur, addMosiac, addDeletion, addContrast } from '../modules/image'

export default function Detail() {
  const history = useHistory()
  const [locationStartX, setLocationStartX] = useState(0)
  const [locationStartY, setLocationStartY] = useState(0)
  const [locationEndX, setLocationEndX] = useState(0)
  const [locationEndY, setLocationEndY] = useState(0)
  const [checkMode, setCheckMode] = useState(0)
  const [checkErase, setCheckErase] = useState(false)
  const id = Number(window.location.pathname.replace('/detail/', '')) + 1
  const imageStore = useSelector((state) => state.image.imageFile)
  const imageDate = imageStore.filter((image) => image.id === id)
  const [constrast, setConstrast] = useState(50)
  const [mosaic, setMosaic] = useState(50)
  const [blur, setBlur] = useState(50)
  const [backX, setBackX] = useState(0)
  const [backY, setBackY] = useState(0)
  const dispatch = useDispatch()
  let changeColor = true
  const [width, height] = [imageStore[0].size.width, imageStore[0].size.height]

  const startLocation = (event) => {
    if (changeColor) {
      let x = 0
      let y = 0
      if (event.pageX || event.pageY) {
        x = event.pageX
        y = event.pageY
      } else {
        x =
          event.clientX +
          document.body.scrollLeft +
          document.documentElement.scrollLeft
        y =
          event.clientY +
          document.body.scrollTop +
          document.documentElement.scrollTop
      }
      x -= event.target.offsetLeft
      y -= event.target.offsetTop
      setLocationStartX(x * 2)
      setLocationStartY(y * 2)
    }
  }

  const endPainting = (event) => {
    changeColor = false
    setCheckMode(1)
    let x = 0
    let y = 0
    if (event.pageX || event.pageY) {
      x = event.pageX
      y = event.pageY
    } else {
      x =
        event.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft
      y =
        event.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop
    }
    x -= event.target.offsetLeft
    y -= event.target.offsetTop

    setBackX(x * 2)
    setBackY(y * 2)
  }
  const endLocation = (event) => {
    if (changeColor) {
      let x = 0
      let y = 0
      if (event.pageX || event.pageY) {
        x = event.pageX
        y = event.pageY
      } else {
        x =
          event.clientX +
          document.body.scrollLeft +
          document.documentElement.scrollLeft
        y =
          event.clientY +
          document.body.scrollTop +
          document.documentElement.scrollTop
      }
      x -= event.target.offsetLeft
      y -= event.target.offsetTop
      setLocationEndX(x * 2)
      setLocationEndY(y * 2)
    }
  }

  const imgBlur = useCallback(
    (image, id, startX, startY, endX, endY, value) =>
      dispatch(addBlur(image, id, startX, startY, endX, endY, value)),
    [dispatch]
  )
  const imgMosiac = useCallback(
    (image, id, startX, startY, endX, endY, value) =>
      dispatch(addMosiac(image, id, startX, startY, endX, endY, value)),
    [dispatch]
  )
  const imgDeletion = useCallback(
    (image, id, startX, startY, endX, endY, backX, backY) =>
      dispatch(
        addDeletion(image, id, startX, startY, endX, endY, backX, backY)
      ),
    [dispatch]
  )
  const imgContrast = useCallback(
    (image, id, constrast) => dispatch(addContrast(image, id, constrast)),
    [dispatch]
  )
  // const imgContrast = useCallback((image) => dispatch(addContrast(image)), [
  //   dispatch,
  // ])
  console.log(checkMode)

  const clickImgProcess = () => {
    if (checkMode === 6) {
      imgMosiac(
        imageDate,
        id,
        locationStartX,
        locationStartY,
        locationEndX,
        locationEndY,
        mosaic
      )
    } else if (checkMode === 2) {
      imgBlur(
        imageDate,
        id,
        locationStartX,
        locationStartY,
        locationEndX,
        locationEndY,
        blur
      )
      //블라
    } else if (checkMode === 1) {
      //딜리션
      console.log('checkMode', checkMode)
      imgDeletion(
        imageDate,
        id,
        locationStartX,
        locationStartY,
        locationEndX,
        locationEndY,
        backX,
        backY
      )
    } else if (checkMode === 4) {
      //const
      imgContrast(imageDate, id, constrast)
    }
  }

  const handleSaveClick = () => {
    const link = document.createElement('a')
    link.href = imageStore[id - 1].new_url
    link.download = `${imageStore[id - 1].img.name}`
    link.click()
  }

  return (
    <div className="detail page">
      <div onClick={() => history.push('/home')} className="sub_title">
        <img src="../Polygon.png" className="btn_back" />
        <p className="go_back">Go Back</p>
      </div>
      <div className="title">
        <p>Adjust Image</p>
        <Button
          variant="primary"
          className="DownloadButton"
          onClick={() => clickImgProcess()}
        >
          Save
        </Button>
      </div>
      <div className="content">
        {/* <div className="showImg"></div> */}
        <canvas
          id="jsCanvas"
          onMouseDown={(e) => startLocation(e)}
          onMouseUp={(e) => endLocation(e)}
          className="canvas"
          style={{
            backgroundImage: `url(${imageDate[0].new_url})`,
            width: `${width / 2}px`,
            height: `${height / 2}px`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center center',
          }}
        ></canvas>
        <div className="adjustImg">
          <div className="adjust">
            <p className="adjust_title" onClick={() => setCheckMode(4)}>
              const
            </p>
            {checkMode === 4 ? (
              <div className="adjust_content">
                <input
                  type="range"
                  id="constrastRange"
                  min="0"
                  max="100"
                  value={constrast}
                  step="1"
                  onChange={() => {
                    setConstrast(
                      document.querySelector('#constrastRange').value
                    )
                    setCheckErase(false)
                  }}
                />
              </div>
            ) : (
              <div className="adjust_content"></div>
            )}
            <p onClick={() => setCheckMode(3)}>Erase</p>
            {checkMode === 3 ? (
              <img
                onClick={() => {
                  setCheckErase(!checkErase)
                  drawEraseSection(width, height)
                }}
                src="../border_color.png"
                className="adjust_content erase"
              />
            ) : (
              <div></div>
            )}
            {checkErase ? (
              <>
                <p className="adjust_title" onClick={() => setCheckMode(6)}>
                  mosaic
                </p>
                {checkMode === 6 ? (
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
                ) : (
                  <div className="adjust_content"></div>
                )}
                <p className="adjust_title" onClick={() => setCheckMode(2)}>
                  blur
                </p>
                {checkMode === 2 ? (
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
                  </div>
                ) : (
                  <div></div>
                )}
                <p className="adjust_title" onClick={(e) => endPainting(e)}>
                  delete
                </p>
                {checkMode === 1 ? (
                  <div className="adjust_content">
                    <img
                      onClick={(e) => endPainting(e)}
                      src="../spoid.png"
                      className="adjust_content erase spoid "
                    />
                  </div>
                ) : (
                  <div></div>
                )}
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
