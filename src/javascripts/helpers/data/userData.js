import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getUser = (userObj) => {
  axios.get(`${baseUrl}/farmers.json?orderBy="uid"&equalTo="${userObj.uid}"`)
    .then((response) => {
      if (Object.values(response.data).length === 0) {
        // use axios.post
        axios.post(`${baseUrl}/farmers.json`, {
          uid: userObj.uid,
          displayName: userObj.displayName,
          email: userObj.email
        });
        // pass it the URL ${baseUrl}/farmers.json
        // pass it object that'll be posted
      } else {
        console.warn(Object.values(response.data));
      }
    });
};

export default { getUser };
