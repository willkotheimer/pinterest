# pinterest

# Week 14 - MILESTONE Project -Pinterest
This was a project that allowed us to build a version of Pinterest to build api skills to CREATE, READ, UPDATE, and DELETE  data, as well as the firebase login.

## Motivation
The motivation of the assignment was to build a more fully realized application, using firebase as a login and api, and hosting, and to use axios and postman to utilize the endpoints of the firebase api. The idea of the organization of the app was separate concerns, between data and views.

## Build status
MVP complete. But has a certain bug in places. After submitting a form, the bootstrap backdrop is still staying on screen and the page is not updating. Still working on this, but the workaround is currently to press F5 to see the changes.

## Tools
Vanilla Javascript ES6, Jquery, HTML5, CSS3, axios and postman for api fetching, firebase for authentication, api endpoints and file database.

## Screenshots



## URL

[https://pinterest-32a4e.web.app/](https://pinterest-32a4e.web.app/)

## Features
This site features a way to add and delete boards, and add, delete, and update Pins.

## Code Example
```
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
```
## Github owner

[Will Kotheimer](https://github.com/willkotheimer/pinterest)

