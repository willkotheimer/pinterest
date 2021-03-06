import pinsData from '../../helpers/data/pinsData';

const pinForm = () => {
  const myForm = `<form>
    <div class="form-group">
      <label for="addName"pin Name</label>
      <input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="pin Name">
    </div>
    <div class="form-group">
      <label for="imageUrl">URL to pin image</label>
      <input type="text" class="form-control" id="imageUrl" placeholder="https://rb.gy/ppzpuz"> 
    </div>
    <div class="form-group">
      <label for="linkUrl">URL to website</label>
      <input type="text" class="form-control" id="linkUrl" placeholder="https://rb.gy/ppzpuz"> 
    </div>
    <input type="hidden" for="userId" id="userId" />
    <input type="hidden" for="boardId" id="boardId" />
    <button type="submit" id="pinSubmit" class="btn btn-primary">Submit</button>
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

$('body').on('click', '#pinSubmit', (e) => {
  e.preventDefault();
  const data = {
    Uid: $('#pinsModal #userId').val() || false,
    imageUrl: $('#pinsModal #imageUrl').val() || false,
    name: $('#pinsModal #name').val() || false,
    boardId: $('#pinsModal #boardId').val() || false,
    linkUrl: $('#pinsModal #linkUrl').val() || false,
  };

  const finish = () => {
    $('#userId').val('');
    $('#name').val('');
    $('#imageUrl').val('');
    $('#boardId').val('');
    $('#linkUrl').val('');
    $('.modal-backdrop').removeClass('show').addClass('hide');
    $('.modal').removeClass('show').addClass('hide');
    $('#pinsModal').hide();
  };
  if (Object.values(data).includes(false)) {
    $('#error-message').html('<div class="alert alert-danger" role="alert">Please complete all fields</div>');
  } else {
    $('#error-message').html('');
    pinsData.addPins(data, data.boardId, data.Uid)
      .then(() => {
        finish();
      }).catch((error) => console.warn(error));
  }
});

export default { pinForm };
