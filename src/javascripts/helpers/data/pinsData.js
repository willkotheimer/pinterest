import axios from 'axios';
import apiKeys from '../apiKeys.json';
import boards from '../../components/boards/board';
import pinsView from '../../components/views/pinView';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const PinsInfo = (BoardfirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo="${BoardfirebaseKey}"`)
    .then((response) => {
      const pins = response.data;
      const pinsToReturn = [];
      if (pins) {
        Object.keys(pins).forEach((pin) => {
          pinsToReturn.push(pins[pin]);
        });
      }
      resolve(pinsToReturn);
    }).catch((error) => reject(error));
});

const boardsInfoHelper = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="Uid"&"boardId="${userId}"`)
    .then((response) => {
      const boardsData = response.data;
      const board = [];
      if (boardsData) {
        Object.keys(boardsData).forEach((boardId) => {
          const concatIdName = `${boardsData[boardId].firebaseKey}|${boardsData[boardId].name}`;
          board.push(concatIdName);
        });
      }
      resolve(board);
    }).catch((error) => reject(error));
});

const patchPins = (body, firebaseKey) => {
  axios.patch(`${baseUrl}/pins/${firebaseKey}.json`, body).catch((error) => console.warn(error));
};

const deletePin = (firebaseKey) => axios.delete(`${baseUrl}/pins/${firebaseKey}.json`);

const showPins = (boardId, user) => {
  let myBoards = '';
  boardsInfoHelper(user)
    .then((response) => {
      Object.keys(response).forEach((key) => {
        myBoards += `${response[key]}*`;
      });
    });
  let myString = `<button id='${user}' type='button' class='backToBoards btn btn-warning'><i class='fas fa-chevron-circle-left'></i></button>`;
  PinsInfo(boardId)
    .then((response) => {
      Object.keys(response).forEach((key) => {
        const item = response[key];
        if (item) {
          myString += `<div class='pin pin-${item.pinId.name}'><div class='button-container'><button class='btn btn-danger delete-pin' id='${item.pinId.name}|${boardId}|${user}' 
        data-toggle="tooltip" data-placement="top" title="Delete Pin"><i class="fas fa-minus-circle"></i></button>
        <button type="button" class='edit-pin btn btn-primary' id='${item.pinId.name}*${myBoards}' 
        data-val='${item.Uid}' data-placement="top" title="Edit" data-toggle="modal" data-target="#pinsPatchModal"><i class="far fa-edit"></i></button></div
        <div class='pin-image'>
        <img class='pin-img' src='${item.imageUrl}'/>
        <div><a href='${item.linkUrl}'/>${item.name}</a></div>
        </div>
        </div>
        `;
        }
      });
      myString += `<!-- Button to Open the Modal -->
      <button type="button" class="btn btn-primary add-pin" id="${boardId}|${user}" data-toggle="modal" data-target="#pinsModal">
      <i class="fas fa-plus-circle"></i> Add A Pin
      </button>`;
      $('#myPins').html(`${myString}`);
      /* back button: */
      $('body').on('click', '.backToBoards', (e) => {
        const currentUser = e.currentTarget.id;
        boards.boardView(currentUser);
      });
      /* delete button */
      $('body').on('click', '.delete-pin', (e) => {
        e.stopImmediatePropagation();
        const firebaseKey = e.currentTarget.id;
        const [pinId, bid, userId] = firebaseKey.split('|');
        $(`#pin-${pinId}`).remove();
        deletePin(pinId);
        const myPins = showPins(bid, userId);
        pinsView.PinView(myPins);
      });
    });
};

// Need to fix and test!
const addPins = (data, bid, userId) => axios.post(`${baseUrl}/pins.json`, data)
  .then((response) => {
    const update = { pinId: response.data };
    const promise1 = new Promise((resolve, reject) => {
      const patch = axios.patch(`${baseUrl}/pins/${response.data.name}.json`, update);
      Promise.all([promise1]).then(() => {
        setTimeout(() => {
          const myPins = showPins(bid, userId);
          pinsView.PinView(myPins);
        }, 1500);
      }).then((myPins) => {
        resolve(myPins);
      }).catch((error) => reject(error));
      resolve(patch);
    });
  });
export default { showPins, addPins, patchPins };
