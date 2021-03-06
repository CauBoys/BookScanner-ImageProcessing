let spoid = false
export const drawEraseSection = (width, height) => {
  const canvas = document.getElementById('jsCanvas')
  const ctx = canvas.getContext('2d')
  const saveBtn = document.getElementById('jsSave')
  let initialX = 0
  let initialY = 0

  const INITIAL_COLOR = 'rgba(255,255,255,0.5)'
  const CANVAS_SIZE = 600

  canvas.width = width / 2
  canvas.height = height / 2
  ctx.lineWidth = 2.5

  let painting = false
  let filling = false

  function stopPainting() {
    painting = false
  }

  function startPainting(event) {
    initialX = event.offsetX
    initialY = event.offsetY
    painting = true
    // console.log('initialX', initialX)
    // console.log('initialY', initialY)
  }

  function endPainting(event) {
    console.log(event.offsetX, event.offsetY)
  }

  function onMouseMove(event) {
    const x = event.offsetX
    const y = event.offsetY
    ctx.strokeStyle = INITIAL_COLOR
    ctx.fillStyle = INITIAL_COLOR
    if (!painting) {
      ctx.beginPath()
      ctx.moveTo(x, y)
    } else {
      console.log('initialX', initialX, '에서')
      console.log('initialY', initialY)
      console.log('x', x)
      console.log('y', y)
      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
      ctx.fillRect(initialX, initialY, x - initialX, y - initialY)
    }
  }

  function handleCM(event) {
    event.preventDefault()
  }

  if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mousedown', startPainting)
    canvas.addEventListener('mouseup', stopPainting)
    canvas.addEventListener('mouseleave', stopPainting)
    canvas.addEventListener('contextmenu', handleCM)
  }
  // if (spoid) {
  //   canvas.addEventListener('mousedown', endPainting)
  // }

  if (saveBtn) {
    saveBtn.addEventListener('click', handleSaveClick)
  }
}

export const handleSaveClick = () => {
  const canvas = document.getElementById('jsCanvas')
  const image = canvas.toDataURL()
  const link = document.createElement('a')
}

export const endPainting = (event) => {
  spoid = true
}
