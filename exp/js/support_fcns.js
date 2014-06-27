/*global $, document, console, alert, demographics:true, divImageSpace, canvas:true, context:true, divInstructions, divSlider, divSliderInfo, divSliderStuff, divNext, default_slider_value, colourCondition:true, trainTrial, testTrial, showIntro, showDemographics, showInstructions */
/*jshint multistr: true */

// canvas functions
function initializeCanvas() {
  canvas = document.getElementById("drawing");
  canvas.width = divImageSpace.width();
  canvas.height = divImageSpace.height();
  context = canvas.getContext("2d");
}

function initializeSlider(max) {
  // initialize slider if one is being used
  divSlider.slider({
    min: 0,
    max: 100,
    step: 1,
    value: default_slider_value,
    slide: function (event, ui) {
      divSliderInfo.html(ui.value + '%');
    }
  });
}

// clears the whole canvas area
function imageClear() {
  context.fillStyle = '#ffffff'; // work around for Chrome
  context.fillRect(0, 0, canvas.width, canvas.height); // fill in the canvas with white
  canvas.width = canvas.width; // clears the canvas 
}

// hides all DOM elements from the screen and clears the canvas
function hideElements() {
  hideButtons();
  hideCanvas();
  hideSlider();
  hideText();
}

function hideText() {
  // hides all text divs
  $('.text').hide();
}

function hideButtons() {
  // hides all buttons
  $(':button').hide();

  // unbinds all buttons
  $(':button').unbind();
}

function hideCanvas() {
  imageClear();

  // hides the canvas drawing
  divImageSpace.hide();
}

function hideSlider() {
  divSliderStuff.hide();
}

function showInputOptions() {
  // first present the input options for the experiment (for debugging purposes)
  // allows you to set the experimental conditions instead of randomly assigning them above
  var divInputOptions = $('#input-options');
  divInputOptions.show();
  divInputOptions.html('<h3>Experiment options</h3> \
                        <p>Stimuli Colour</p> \
                        <select id="colour"> \
                          <option value="red">Red</option> \
                          <option value="blue">Blue</option> \
                        </select> \
                        <p>What section should we start in?</p> \
                        <select id="section"> \
                          <option value="intro">Introduction</option> \
                          <option value="demographics">Demographics</option> \
                          <option value="instructions">Instructions</option> \
                          <option value="training">Training</option> \
                          <option value="testing">Testing</option> \
                        </select>');

  divNext.show();
  divNext.click(function () {
    // CONDITION
    // process color option here
    colourCondition = $('#colour').val();

    // which section to start with:
    switch ($('#section').val()) {
      case "intro":
        showIntro();
        break;
      case "demographics":
        showDemographics();
        break;
      case "instructions":
        showInstructions();
        break;
      case "training":
        trainTrial();
        break;
      case "testing":
        testTrial();
        break;
    }
  });

}

// save experiment data with ajax
function saveData(args) {
  (function (d) {
    $.post('submit',  {"content": JSON.stringify(d)});
  })(args);
}

function finishExperiment() {
  hideElements();

  divInstructions.html('You have completed the experiment! If you are doing the experiment from Mechanical Turk, please enter the code 92nF72zm0 to complete the HIT.');
  divInstructions.show();
}
