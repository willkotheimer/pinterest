import boardForm from '../forms/addBoard';
import pinsForm from '../forms/addPin';
import PatchPins from '../forms/patchPins';
import boardData from '../../helpers/data/boardData';

const boardsModal = () => {
  $('#boardModal').html(`<!-- The Modal -->
 <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Modal Heading</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <!-- Modal body -->
        <div class="modal-body" id="#board-form">
        ${boardForm.boardForm()}
        </div>
        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>`);
};

const pinsModal = () => {
  $('#pinsModal').html(`<!-- The Modal -->
 <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Add a Pin</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <!-- Modal body -->
        <div class="modal-body" id="#board-form">
        ${pinsForm.pinForm()}
        </div>
        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>`);
};

const pinsModalPatch = () => {
  $('#pinsPatchModal').html(`<!-- The Modal -->
 <div class="modal-dialog">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h4 class="modal-title">Add a Pin</h4>
          <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <!-- Modal body -->
        <div class="modal-body" id="#board-form">
        ${PatchPins.pinPatchForm()}
        </div>
        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>`);
};

const registerPatch = () => {
  $('#pinsPatchModal').on('show.bs.modal', (event) => {
    const firebaseKey = event.relatedTarget.id.split('-')[1];
    console.warn(firebaseKey);
    console.warn('my stuff here:', boardData.boardsInfo(firebaseKey));
    // $('#pinsPatchModal #userId').val(firebaseKey);
    // $('#pinsPatchModal #boardId').val(firebaseKey);
  });
};

export default
{
  boardsModal,
  pinsModal,
  pinsModalPatch,
  registerPatch
};
