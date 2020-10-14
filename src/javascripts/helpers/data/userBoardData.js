import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const boardIdsByUser = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/userBoards.json?orderBy="Uid"&equalTo="${userId}"`)
    .then((response) => {
      const userBoards = response.data;
      const boards = [];
      if (userBoards) {
        Object.values(userBoards).forEach((board) => {
          boards.push(Number(board.boardId));
        });
        resolve(boards);
      }
    }).catch((error) => reject(error));
});

export default { boardIdsByUser };
