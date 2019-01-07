const template = document.createElement('template')
template.innerHTML = `
<style>
  #game-size {
    margin-bottom: 1em;
  }

  #bricks a:hover {
    text-decoration: initial;
  }

  #body img {
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

<form id="game-size" class="form-inline">
  <select class="custom-select my-1 mr-sm-2">
    <option selected>Choose game size</option>
    <option value="1">2x2</option>
    <option value="2">4x2</option>
    <option value="3">4x4</option>
    <option value="4">4x8</option>
  </select>

  <button type="submit" class="btn btn-primary my-1">Change</button>
</form>

<div id="bricks">
</div>

<div id="results" class="alert alert-success" role="alert"></div>
`

export default template
