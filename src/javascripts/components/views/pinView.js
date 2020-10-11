const PinStuff = () => {
  const myString = `
  <div class="row">
  <div class="span9 ">
  <i class="fab fa-pinterest"></i><h1>Pins</h1>
  <div id='myPins' class='myPins'>
  </div>
  </div>
</div>
  `;
  return myString;
};

const PinView = (myPins) => {
  const PinSpace = PinStuff();
  $('#pinboard1').html('');
  $('#pinboard1').html(PinSpace);
  $('#myPins').html(`${myPins}`);
};

export default { PinView };
