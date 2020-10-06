import firebase from 'firebase/app';
import 'firebase/auth';
import home from '../../components/home/home';
import boards from '../../components/boards/board';
import userData from './userData';
import boardData from './boardData';
import pinsData from './pinsData';
import pinsView from '../../components/views/pinView';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // person is logged in
      const currentUser = userData.setCurrentUser(user);
      $('#auth').addClass('hide');
      $('#navbar-logout-button').removeClass('hide');
      const myBoards = boardData.showBoards(currentUser.uid);
      boards.boardView(myBoards);

      // Create events to make boards go to pins:
      $('body').on('click', '.board', (e) => {
        const boardClicked = e.currentTarget.id;
        const myPins = pinsData.showPins(boardClicked);
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
