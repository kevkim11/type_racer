
var textParagraph = $("#text-paragraph");
// var paragraphInnerHtml = $.trim(textParagraph.html());

var paragraphStr = $.trim(textParagraph.text());

var strIndex = 0;     // needed for highlight
var stoppedIndex = 0; // needed for highlight-wrong
var wordIndex = 0; // needed for multi-character deletion
var keyDown_inputValue; // used to compare keydown and keyup InputValue
var wpm = $("#score");

$("#type-input").on("keydown", function(event) {
  var lastInput = event.key;
  keyDown_inputValue = $(this).val();
  console.log(`prevInputValue: ${keyDown_inputValue} lastInput: ${lastInput}`);
  console.log(`lastInput.length ${lastInput.length}`);

  // if single character is being delted by clicking "Backspace"
  if (lastInput === "Backspace" && $(this).val()){
    // if there is no red highlight
    if (strIndex === stoppedIndex){
      strIndex -= 1;
      stoppedIndex = strIndex;
    }
    // else there is red highlight
    else {
      stoppedIndex -= 1;
    }
  }
  // if it's a match and the user pressed Spacebar
  else if (lastInput === " " && lastInput === paragraphStr[strIndex] && stoppedIndex === strIndex){
    strIndex += 1;
    stoppedIndex = strIndex;
    wordIndex = strIndex;
    console.log("keydown space");
    // $(this).val('');
  }
  // if it's a match
  else if (lastInput.length === 1 && lastInput === paragraphStr[strIndex] && stoppedIndex === strIndex){
    strIndex += 1;
    stoppedIndex = strIndex;
    console.log("keydown match");
  }
  // if there is a typo
  else if ((lastInput.length === 1 && lastInput !== paragraphStr[strIndex]) || lastInput.length === 1 && stoppedIndex !== strIndex){
    stoppedIndex+=1;
    console.log("keydown error");
  }
  // any other possibilities
  else {
    console.log("false");
  }
  textParagraph.html("<span class='highlight'>" + paragraphStr.slice(0, strIndex) + "</span>" +
    "<span class='highlight-wrong'>" + paragraphStr.slice(strIndex, stoppedIndex) + "</span>" +
    "<span class='highlight-none'>" + paragraphStr.slice(stoppedIndex, paragraphStr.length) + "</span>");
  isWonGame();
  $("#score").text(calculateWPM());
});

// Key up event: used to
// (1) clear textfield when spacebar is clicked and
// (2) Have the correct text highlighted when user deletes multiple characters
$("#type-input").keyup(function (event) {
  var keyUp_lastInput = event.key;
  var keyUp_inputValue = $(this).val();
  console.log(`prevInputValue: ${keyDown_inputValue} keyUp_inputValue: ${keyUp_inputValue} keyUp_lastInput: ${keyUp_lastInput} wordIndex: ${wordIndex}`);
  // console.log(`strIndex: ${strIndex} stoppedIndex: ${stoppedIndex} wordIndex: ${wordIndex}`);
  // console.log("KEY UP SPACEBAR");
  var amountDeleted = keyDown_inputValue.length - keyUp_inputValue.length;
  // if multiple characters are being deleted by clicking "Backspace"
  if(keyUp_lastInput === "Backspace" && amountDeleted > 1){
    // console.log("KEY UP DELETE");
    strIndex = wordIndex + (keyUp_inputValue.length);
    stoppedIndex = wordIndex + (keyUp_inputValue.length);
  } else if(keyUp_lastInput === " " && stoppedIndex === strIndex){
    // && keyUp_lastInput === paragraphStr[strIndex]
    // console.log("KEY UP SPACEBAR");
    $(this).val('');
  }
  textParagraph.html("<span class='highlight'>" + paragraphStr.slice(0, strIndex) + "</span>" +
    "<span class='highlight-wrong'>" + paragraphStr.slice(strIndex, stoppedIndex) + "</span>" +
    "<span class='highlight-none'>" + paragraphStr.slice(stoppedIndex, paragraphStr.length) + "</span>");

});


function isWonGame(){
  if(strIndex === paragraphStr.length){
    $("#game-container").hide();
  }
}

// Timer at the beginning of the game.
// Set the timer at the beginning of the game
let numSec = 3;
var timer = $(".timer");
var setTimer = '2:00';
$(document).ready(function () {
  $('#myModal').modal('show');
  timer.text(numSec);
  var startTimer = setInterval(function() {
    numSec--;
    if(numSec === 0) {
      timer.text(numSec);
      $('#myModal').modal('hide');
      $("#type-input").focus();
      $("#type-input").attr("placeholder", "");
      timer.text('2:00');
      clearInterval(startTimer);
      startGameTimer();
      // numSec = 120;
    } else {
      timer.text(numSec);
    }
  }, 1000);
});

// Game Timer.
// Starts when the game officially starts
var numOfSecPassed = 1;
function startGameTimer(){
  var gameTimer = setInterval(function(){
    numOfSecPassed += 1;
    var myTime = timer.html();
    var ss = myTime.split(":");
    var dt = new Date();

    dt.setHours(0);
    dt.setMinutes(ss[0]);
    dt.setSeconds(ss[1]);

    var dt2 = new Date(dt.valueOf() - 1000);
    var temp = dt2.toTimeString().split(" ");
    var ts = temp[0].split(":");
    timer.html(ts[1][1]+":"+ts[2]);
    // if time runs out
    if(ts[1][1]+":"+ts[2] === "0:00"){
      // GameOver
      // alert("GameOver!");
    }
  }, 1000);
}

// Function to calculate Words Per Minute (WPM)
// According to https://keyboard-racing.com/wpm_cpm_converter.html,
// wpm = 5 * Characters Per Minute (CPM)
function calculateWPM(){
  var cpm = (strIndex/numOfSecPassed)*60;
  return (cpm/5).toFixed();
}