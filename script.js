// Create a new color picker instance
// https://iro.js.org/guide.html#getting-started

var colorPicker = new iro.ColorPicker(".colorPicker", {
  // color picker options
  // Option guide: https://iro.js.org/guide.html#color-picker-options
  width: 280,
  color: "rgb(255, 0, 0)",
  borderWidth: 1,
  borderColor: "#fff" });


// handle click events on the swatch

var swatchGrid = document.getElementById('swatch-grid');

swatchGrid.addEventListener('click', function (e) {
  var clickTarget = e.target;
  // read data-color attribute
  if (clickTarget.dataset.color) {
    // update the color picker
    colorPicker.color.set(clickTarget.dataset.color);
  }
});

// update the "selected color" values whenever the color changes
// https://iro.js.org/guide.html#color-picker-events

var values = document.getElementById("values");
colorPicker.on(["color:init", "color:change"], function (color) {
  // Show the current color in different formats
  // Using the selected color: https://iro.js.org/guide.html#selected-color-ap
  values.innerHTML = [
  "hex: " + color.hexString].
  join("<br>");
  document.getElementById("link").value = color.hexString;
});



// trigger copy event on click
$('#copy').on('click', function(event) {
  console.log(event);
  copyToClipboard(event);
});

// event handler
function copyToClipboard(e) {
  // alert('this function was triggered');
  // find target element
  var
    t = e.target, 
    c = t.dataset.copytarget,
    inp = (c ? document.querySelector(c) : null);
  console.log(inp);
  // check if input element exist and if it's selectable
  if (inp && inp.select) {
    // select text
    inp.select();
    try {
      // copy text
      document.execCommand('copy');
      inp.blur();

      // copied animation
      t.classList.add('copied');
      setTimeout(function() {
        t.classList.remove('copied');
      }, 1500);
    } catch (err) {
      //fallback in case exexCommand doesnt work
      alert('please press Ctrl/Cmd+C to copy');
    }

  }

}