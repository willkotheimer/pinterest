const home = () => {
  const myString = `
  <div class="row">
  <div class="span9 ">
  <i class="fab fa-pinterest"></i><h1>
  <img class="logo-img" 
  src="https://cdn11.bigcommerce.com/s-sq9zkarfah/images/stencil/1280x1280/products/126171/119440/The-Pixies-Lightning-Bolt-Band-Logo-Vinyl-Decal-Sticker__81920.1507851655.jpg?c=2"/></h1>
  
  </div>
</div>
  `;
  return myString;
};

const showHome = () => {
  $('#pinboard1').html(home());
};

export default { showHome };
