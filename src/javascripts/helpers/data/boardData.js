import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const boardsInfo = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="Uid"&equalTo="${userId}"`)
    .then((response) => {
      const boards = response.data;
      const board = [];
      if (boards) {
        Object.keys(boards).forEach((boardId) => {
          board.push(boards[boardId]);
        });
      }
      resolve(board);
    }).catch((error) => reject(error));
});

const showBoards = (userId) => {
  let myString = '<div class="myboards">';
  boardsInfo(userId)
    .then((response) => {
      Object.keys(response).forEach((key) => {
        const item = response[key];
        myString += `<div class='board board-${item.id}' id='${item.id}'><div class='board-image'>
        <img class='board-img' src='${item.imageUrl}'/>
        </div>
        <div>${item.name}</div>
        </div>
        `;
      });
      myString += '</div>';
      $('#myBoards').html(`${myString}`);
    });
};

export default { showBoards };
