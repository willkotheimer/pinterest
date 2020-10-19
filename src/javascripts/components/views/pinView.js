const PinStuff = () => {
  const myString = `
  <div id='myPins' class='myPins'>
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
