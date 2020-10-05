const home = () => {
  const myString = `
  <div class="row">
  <div class="span9 ">
  <i class="fab fa-pinterest"></i><h1>Pinterest</h1>
  
  </div>
</div>
  `;
  return myString;
};

const showHome = () => {
  $('#pinboard1').html(home());
};

export default { showHome };
