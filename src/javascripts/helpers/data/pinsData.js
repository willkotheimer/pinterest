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

const addPins = (data) => axios.post(`${baseUrl}/pins.json`, data)
  .then((response) => {
    const update = { pinId: response.data };
    axios.patch(`${baseUrl}/pins/${response.data.name}.json`, update);
  }).catch((error) => console.warn(error));

const deletePin = (firebaseKey) => axios.delete(`${baseUrl}/pins/${firebaseKey}.json`);

const showPins = (boardId, user) => {
  let myString = '<div class="myPins">';
  PinsInfo(boardId)
    .then((response) => {
      Object.keys(response).forEach((key, index) => {
        const item = response[key];
        console.warn('in this pins:', item);
        if (index === 0) myString += `<button id='${item.Uid}' type='button' class='backToBoards btn btn-warning'><i class="fas fa-chevron-circle-left"></i></button>`;
        myString += `<div class='pin pin-${item.pinId.name}'>
        <div class='button-container'><div class='delete-pin' id='${item.pinId.name}|${boardId}|${user}' 
        data-toggle="tooltip" data-placement="top" title="Delete Pin"><i class="fas fa-minus-circle"></i></div>
        <div class='edit-pin' id='edit-${item.pinId.name}' data-toggle="tooltip" data-placement="top" title="Edit"><i class="far fa-edit"></i></div></div>
        <div class='pin-image'>
        <img class='pin-img' src='${item.imageUrl}'/>
        </div>
        <div><a href='${item.linkUrl}'/>${item.name}</a></div>
        </div>
        `;
      });
      myString += `<!-- Button to Open the Modal -->
      <button type="button" class="btn btn-primary" id="${boardId}|${user}" data-toggle="modal" data-target="#pinsModal">
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
      /* patch button */
      $('body').on('click', '.edit-pin', (e) => {
        e.stopImmediatePropagation();
        const firebaseKey = e.currentTarget.id;
        console.warn(`edit pin on board: ${firebaseKey}`);
      });
    });
};

export default { showPins, addPins };
