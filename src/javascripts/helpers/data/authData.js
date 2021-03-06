import firebase from 'firebase/app';
import 'firebase/auth';
import home from '../../components/home/home';
import boards from '../../components/views/boardView';
import userData from './userData';
import pinsData from './pinsData';
import pinsView from '../../components/views/pinView';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // person is logged in
      const currentUser = userData.setCurrentUser(user);
      $('#auth').addClass('hide');
      $('#navbar-logout-button').removeClass('hide');
      boards.boardView(currentUser.uid);

      // Create events to make boards go to pins:
      $('body').on('click', '.board', (e) => {
        const boardClicked = e.currentTarget.id;
        const [boardId, userId] = boardClicked.split('__');
        const myPins = pinsData.showPins(boardId, userId);
        pinsView.PinView(myPins);
      });
    } else {
      // person is not logged in
      $('#navbar-logout-button').addClass('hide');
      $('#auth').removeClass('hide');
      home.showHome();
    }
  });
};

export default { checkLoginStatus };
