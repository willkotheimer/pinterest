import firebase from 'firebase/app';
import 'firebase/auth';
import home from '../../components/home/home';
import boards from '../../components/boards/board';
import userData from './userData';
import boardData from './boardData';

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // person is logged in
      const currentUser = userData.setCurrentUser(user);
      $('#auth').addClass('hide');
      $('#navbar-logout-button').removeClass('hide');
      const myBoards = boardData.showBoards(currentUser.uid);
      boards.boardView(myBoards);
    } else {
      // person is not logged in
      $('#navbar-logout-button').addClass('hide');
      $('#auth').removeClass('hide');
      home.showHome();
    }
  });
};

export default { checkLoginStatus };
