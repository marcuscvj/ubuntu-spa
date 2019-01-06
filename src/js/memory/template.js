const template = document.createElement('template')
template.innerHTML = `
<style>
  #body img {
    max-width: 25%;
  }
  
  .removed {
    visibility: hidden;
  }
</style>

<div id="bricks">
</div>
`

export default template
