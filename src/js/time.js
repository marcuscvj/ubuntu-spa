export default function displayCurrentTime (element) {
  let d = new Date()
  element.innerHTML = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()

  setInterval(() => {
    let d = new Date()
    element.innerHTML = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
  }, 1000)
}
