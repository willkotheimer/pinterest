import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

/* Gets boards that have the userID attached to them */
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

const deleteBoard = (firebaseKey) => axios.delete(`${baseUrl}/boards/board-${firebaseKey}.json`);
const deleteOrphanedPin = (pinId) => {
  axios.delete(`${baseUrl}/pins/pin-${pinId}.json`);
};
/* Delete Pins that have the deleted boardID attached to them */
const getAllOrphanedPins = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo=${boardId}`)
    .then((response) => {
      const boards = response.data;
      const board = [];
      if (boards) {
        Object.keys(boards).forEach((Id) => {
          board.push(boards[Id]);
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
        myString += `<div id='board-${item.id}' class='board board-${item.id}'>
        <div class='delete-board' id='${item.id}' data-toggle="tooltip" data-placement="top" title="Delete Board"><i class="fas fa-minus-circle"></i></div>
        <div class='board-image'>
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

/* delete button */
$('body').on('click', '.delete-board', (e) => {
  e.stopImmediatePropagation();
  const firebaseKey = e.currentTarget.id;
  deleteBoard(firebaseKey);
  $(`.board-${firebaseKey}`).remove();
  Promise.all([getAllOrphanedPins(firebaseKey)])
    .then((values) => {
      Object.keys(values).forEach((key) => {
        const item = values[key];
        Object.values(item).forEach((item2) => {
          deleteOrphanedPin(item2.id);
        });
      });
    });
});

export default { showBoards };
