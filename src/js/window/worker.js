onmessage = (event) => {
  let data = event.data.data

  if (data.currentX > 0 && data.currentY > 0) {
    let style = 'top:' + data.currentY + 'px;' + 'left:' + data.currentX + 'px'
    postMessage(JSON.stringify({ style: style }))
    // console.log(style)
  }
  // postMessage(JSON.stringify(event.data))
}
