import firebase from 'firebase/app';
import 'firebase/auth';

const logOutEvent = () => {
  $('#navbar-logout-button').on('click', (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  });
};

export default { logOutEvent };
