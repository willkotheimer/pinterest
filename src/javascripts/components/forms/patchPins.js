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
  
  </div>`;
  return myForm;
};

$('body').on('click', '#pinPatchSubmit', (e) => {
  console.warn('in patch pin submit');
  e.preventDefault();
  const pinId = $('#pinsPatchModal #pinId').val();
  const data = {
    boardId: $('#pinsPatchModal #boardId :selected').attr('id')
  };
  console.warn(data, pinId);
  if (Object.values(data).includes(false)) {
    $('#error-message').html('<div class="alert alert-danger" role="alert">Please complete all fields</div>');
  } else {
    $('#error-message').html('');
    pinsData.patchPins(data, pinId)
      .then(() => {
        $('#success-message').html('<div class="alert alert-success" role="alert">Your pin Was Added!</div>');
        setTimeout(() => {
          $('#success-message').html('');
          $('#pinsPatchModal').modal('toggle');
        }, 1500);
      }).catch((error) => console.warn(error));
  }
});

export default { pinPatchForm };
