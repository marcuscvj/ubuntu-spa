const template = document.createElement('template')
template.innerHTML = `
<style>
  #game-size {
    margin-bottom: 1em;
  }

  #bricks a:hover {
    text-decoration: initial;
  }

  #bricks img {
    max-width: 25%;
  }
  
  .removed {
    visibility: hidden;
  }

  .custom-select {
    padding: .375rem 15.75rem .375rem .75rem;
  }

  #results {
    margin-top: 1em;
  }

</style>

<div id="bricks">
</div>

<div id="results" class="alert alert-success" role="alert"></div>
`

export default template
