import pinsData from '../../helpers/data/pinsData';
// import boards from '../../helpers/data/boardData';

// const pinPatchForm = (user) => {
  // let myString = '';
  // boards.boardsInfo(user)
  //   .then((response) => {
  //     Object.keys(response).forEach((key) => {
  //       const item = response[key];
  //       myString += `<option value="${item.boardId}">${item.name}</option>`;
  //       console.warn(`${item.boardId}">${item.name}`);
  //     });
  //   });
  // const myForm = `<form>
  //   <label for="boardId">Change Board:</label>
  //   <select class="form-control" id="boardId">
  //     ${myString}
  //   </select>
  //   <input type="hidden" for="userId" id="userId" />
  //   <button type="submit" id="pinPatchSubmit" class="btn btn-primary">Submit</button>
  // </form>
//   <div id="error-message"></div>
//   <div id="success-message"></div>
//   </div>`;
//   return myForm;
// };

// $('body').on('click', '#pinPatchSubmit', (e) => {
//   e.preventDefault();
//   const data = {
//     boardId: $('#pinPatchModal #boardId').val() || false,
//   };
//   $('#boardId').val('');
//   if (Object.values(data).includes(false)) {
//     $('#error-message').html('<div class="alert alert-danger" role="alert">Please complete all fields</div>');
//   } else {
//     $('#error-message').html('');
//     pinsData.addPins(data)
//       .then(() => {
//         $('#success-message').html('<div class="alert alert-success" role="alert">Your pin Was Added!</div>');
//         setTimeout(() => {
//           $('#success-message').html('');
//         }, 1500)
//           .then(() => {
//             $('#pinsModal').modal('toggle');
//           });
//       }).catch((error) => console.warn(error));
//   }
// });

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
  
  </div>`;
  return myForm;
};

export default { pinPatchForm };
