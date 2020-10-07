import axios from 'axios';
import apiKeys from '../apiKeys.json';
import boards from '../../components/boards/board';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const PinsInfo = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="boardId"&equalTo=${Number(boardId)}`)
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

const deletePin = (firebaseKey) => axios.delete(`${baseUrl}/pins/pin-${firebaseKey}.json`);

const showPins = (boardId) => {
  console.warn(`inside show pins-${boardId}`);
  let myString = '<div class="myPins">';
  PinsInfo(boardId)
    .then((response) => {
      Object.keys(response).forEach((key, index) => {
        const item = response[key];
        if (index === 0) myString += `<button id='${item.Uid}' type='button' class='backToBoards btn btn-warning'><i class="fas fa-chevron-circle-left"></i></button>`;
        myString += `<div class='pin pin-${item.id}'><div class='delete-pin' id='${item.id}' data-toggle="tooltip" data-placement="top" title="Delete Pin"><i class="fas fa-minus-circle"></i></div>
        <div class='pin-image'>
        <img class='pin-img' src='${item.imageUrl}'/>
        </div>
        <div><a href='${item.linkUrl}'/>${item.name}</a></div>
        </div>
        `;
      });
      myString += '</div>';
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
        $(`.pin-${firebaseKey}`).remove();
        deletePin(firebaseKey);
      });
    });
};

export default { showPins };
