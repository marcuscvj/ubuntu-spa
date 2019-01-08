export default function displayCurrentTime (element) {
  setInterval(() => {
    let d = new Date()
    element.innerHTML = checkTime(d.getHours()) + ':' + checkTime(d.getMinutes()) + ':' + checkTime(d.getSeconds())
  }, 1000)
}

function checkTime (i) {
  if (i < 10) {
    i = '0' + i
  }

  return i
}
