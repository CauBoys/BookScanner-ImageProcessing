const canvas = document.getElementById('jsCanvas')
const ctx = canvas.getContext('2d')
const colors = document.getElementsByClassName('jsColor')
const range = document.getElementById('jsRange')
const mode = document.getElementById('jsMode')
const saveBtn = document.getElementById('jsSave')
let initialX = 0
let initialY = 0

const INITIAL_COLOR = 'rgba(255,255,255,0.5)'
const CANVAS_SIZE = 600

canvas.width = CANVAS_SIZE
canvas.height = CANVAS_SIZE

ctx.fillStyle = 'white'
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
ctx.strokeStyle = INITIAL_COLOR
ctx.fillStyle = INITIAL_COLOR
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
}

function onMouseMove(event) {
  const x = event.offsetX
  const y = event.offsetY

  if (!painting) {
    ctx.beginPath()
    ctx.moveTo(x, y)
  } else {
    // ctx.lineTo(x, y);
    // ctx.stroke();
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    ctx.fillRect(initialX, initialY, x - initialX, y - initialY)
    console.log('initialX', initialX)
    console.log('initialY', initialY)
    console.log(x)
    console.log(y)
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor
  ctx.strokeStyle = color
  ctx.fillStyle = color
}

function handleRangeChange(event) {
  const size = event.target.value
  ctx.lineWidth = size
}

function handleModeClick() {
  if (filling === true) {
    filling = false
    mode.innerText = 'Fill'
  } else {
    filling = true
    mode.innerText = 'Paint'
  }
}

function handleCanvasClick() {
  if (filling) {
    // ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    // ctx.fillRect (10, 10, 50, 50);
  }
}

function handleCM(event) {
  event.preventDefault()
}

function handleSaveClick() {
  const image = canvas.toDataURL()
  const link = document.createElement('a')
  link.href = image
  link.download = 'PaintJS[🎨]'
  link.click()
}

if (canvas) {
  canvas.addEventListener('mousemove', onMouseMove)
  canvas.addEventListener('mousedown', startPainting)
  canvas.addEventListener('mouseup', stopPainting)
  canvas.addEventListener('mouseleave', stopPainting)
  canvas.addEventListener('click', handleCanvasClick)
  canvas.addEventListener('contextmenu', handleCM)
}

Array.from(colors).forEach((color) =>
  color.addEventListener('click', handleColorClick)
)

if (range) {
  range.addEventListener('input', handleRangeChange)
}

if (mode) {
  mode.addEventListener('click', handleModeClick)
}

if (saveBtn) {
  saveBtn.addEventListener('click', handleSaveClick)
}
