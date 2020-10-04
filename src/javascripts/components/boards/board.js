const board = () => {
  const myString = `
  <div class="row">
  <div class="span9 ">
  <i class="fab fa-pinterest"></i><h1>Boards</h1>
  
  </div>
</div>
  `;
  return myString;
};

const showBoard = () => {
  $('#pinboard').html(board());
};

export default { showBoard };
