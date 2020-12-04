import * as React from 'react'
import '../style/intro.css'
import { useHistory } from 'react-router-dom'

export default function Intro() {
  const history = useHistory()

  return (
    <div className="home page">
      <div class="mainTitle">
        <p className="emphasis">A</p>
        <p>uto&nbsp;</p>
        <p className="emphasis">B</p>
        <p>ook&nbsp;</p>
        <p className="emphasis">C</p>
        <p>ropper </p>
      </div>
      <div class="subTitle">당신을 위한 하나의 Book Service</div>
      <button onClick={() => history.push('/home')} className="main_btn">
        이미지 올리러 가기
      </button>
      <div class="footer">ⓒCopyright Cauboys</div>
    </div>
  )
}
