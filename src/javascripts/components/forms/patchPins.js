import pinsData from '../../helpers/data/pinsData';

const pinPatchForm = () => {
  const myForm = ` <form>
  <label for="boardId">Change Board:</label>
  <select class="form-control" id="boardId">
    
  </select>
  <input type="hidden" for="userId" id="pinId" />
  <button type="submit" id="pinPatchSubmit" class="btn btn-primary">Submit</button>
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

$('body').on('click', '#pinPatchSubmit', (e) => {
  e.preventDefault();
  const pinId = $('#pinsPatchModal #pinId').val();
  const data = {
    boardId: $('#pinsPatchModal #boardId :selected').attr('id')
  };
  if (Object.values(data).includes(false)) {
    $('#error-message').html('<div class="alert alert-danger" role="alert">Please complete all fields</div>');
  } else {
    $('#error-message').html('');
    pinsData.patchPins(data, pinId);
    $(`#${pinId}`).remove();
    $('.modal-backdrop').removeClass('show').addClass('hide');
    $('.modal').removeClass('show').addClass('hide');
    $('#pinsPatchModal').hide();
  }
});

export default { pinPatchForm };
