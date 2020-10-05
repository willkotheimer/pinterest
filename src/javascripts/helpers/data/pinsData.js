import axios from 'axios';
import apiKeys from '../apiKeys.json';

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

const showPins = (boardId) => {
  let myString = `<div class="myPins"><button id='${boardId}' type='button' class='backToBoards btn btn-warning'>Back</button>`;
  PinsInfo(boardId)
    .then((response) => {
      Object.keys(response).forEach((key) => {
        const item = response[key];
        myString += `<div class='pin pin-${item.id}' id='${item.id}'>
        <div class='pin-image'>
        <img class='pin-img' src='${item.imageUrl}'/>
        </div>
        <div><a href='${item.linkUrl}'/>${item.name}</a></div>
        </div>
        `;
      });
      myString += '</div>';
      console.warn(myString);
      $('#myPins').html(`${myString}`);
    });
};

export default { showPins };
