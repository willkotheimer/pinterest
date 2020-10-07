import boardData from '../../helpers/data/boardData';

const boardStuff = () => {
  const myString = `
  <div class="row">
  <div class="span9 ">
  <i class="fab fa-pinterest"></i><h1>Boards</h1>
  <div id='myBoards'>
  </div>
  </div>
</div>
  `;
  return myString;
};

const boardView = (currentUser) => {
  const myBoards = boardData.showBoards(currentUser);
  const boardSpace = boardStuff();
  $('#pinboard1').html(boardSpace);
  $('#myBoards').html(`${myBoards}`);
};

export default { boardView };
