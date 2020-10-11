import boardData from '../../helpers/data/boardData';

const boardStuff = () => {
  const myString = `
  <div id='myBoards'>
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
