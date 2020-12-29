const buttonColors = ["red", "green", "yellow", "blue"];
let gamePattern = [];
let userClickedPatern = [];
let level = 0;
let started = false;

$(document).keypress(function () {
  if (!started) {
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  let userChosenColor = $(this).attr("id");
  userClickedPatern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPatern.length - 1);
});

function nextSequence() {
  userClickedPatern = [];
  level++;
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $("#level-title").text(`Level ${level}`);
}

function playSound(color) {
  let audio = new Audio(`sounds/${color}.mp3`);
  audio.play();
}

function animatePress(curcol) {
  $("#" + curcol).addClass("pressed");

  setTimeout(function () {
    $("#" + curcol).removeClass("pressed");
  }, 100);
}

function checkAnswer(curLev) {
  if (gamePattern[curLev] === userClickedPatern[curLev]) {
    if (userClickedPatern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    gamePattern = [];
    level = 0;
    started = false;
  }
}
