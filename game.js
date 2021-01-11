var buttonColors = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var gamePattern = [];


//Start game (to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.)
var started = false;
var level = 0;

$(document).keydown(function () {
  if (started === false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


//Create pattern
function nextSequence() {
  userClickedPattern = [];

  level++;

  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}


//User's pattern
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  //check user's answer each time he clicks (eg if level 4, length of pattern = 4, last index of pattern = 3, so only check till last index)
  checkAnswer(userClickedPattern.length-1);
});


//Sound function
function playSound(name) {
  var audio = new Audio ("sounds/" + name + ".mp3");
  audio.play();
}


//Animate function
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout (function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//Check answer (eg if level 4, length of pattern = 4, last index of pattern = 3)
function checkAnswer(currentLevel) {
  //Continue to next level
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
      console.log("success");

      //Check that user has finished their sequence
      if (userClickedPattern.length === gamePattern.length) {
        //Call nextSequence() after a short delay
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
  }
  //Game over things
  else {
    console.log("wrong");

    $("#level-title").text("Game Over, Press Any Key To Restart");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout (function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}


//Restart function
function startOver() {
  started = false;
  level = 0;
  gamePattern = [];
}
