import boardData from '../../helpers/data/boardData';
import boards from '../views/boardView';

const boardForm = () => {
  const myForm = `<form>
    <div class="form-group">
      <label for="addName"Board Name</label>
      <input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Board Name">
    </div>
    <div class="form-group">
      <label for="imageUrl">URL to board image</label>
      <input type="text" class="form-control" id="imageUrl" placeholder="https://rb.gy/ppzpuz"> 
    </div>
    <input type="hidden" for="userid" id="boardUserId" />
    <button type="submit" id="Boardsubmit" class="btn btn-primary">Submit</button>
  </form>
  <div id="error-message"></div>
  <div id="success-message"></div>
  <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
  
  </div>`;
  return myForm;
};

$('body').on('click', '#Boardsubmit', (e) => {
  e.preventDefault();
  setTimeout(() => {
    const data = {
      Uid: $('#boardUserId').val() || false,
      imageUrl: $('#imageUrl').val() || false,
      name: $('#name').val() || false,
      numberOfPins: 0
    };
    const finish = (uid) => {
      console.warn('finished');
      $('.modal-backdrop').removeClass('show').addClass('hide');
      $('.modal').removeClass('show').addClass('hide');
      $('#boardModal').hide();
      setTimeout(() => {
        boards.boardView(uid);
      }, 1500);
    };
    if (Object.values(data).includes(false)) {
      $('#error-message').html('<div class="alert alert-danger" role="alert">Please complete all fields</div>');
    } else {
      $('#error-message').html('');
      boardData.addBoard(data)
        .then(() => {
          $('#success-message').html('<div class="alert alert-success" role="alert">Your board Was Added!</div>');
          setTimeout(() => {
            $('#success-message').html('');
          }, 1500)
            .then(finish(data.Uid));
        }).catch((error) => console.warn(error));
    }
  }, 3000);
});

export default { boardForm };
