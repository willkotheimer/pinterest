const home = () => {
  const myString = `
  <div class="home">
  <div class="row">
  <div class="span9 ">
  <h4>Please login</h4>
  
  </div>
</div>
</div>
  `;
  return myString;
};

const showHome = () => {
  $('#pinboard1').html(home());
};

export default { showHome };
