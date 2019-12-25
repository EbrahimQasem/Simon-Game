
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];


var started = false;
var level = 0;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+ level);
    nextSequence();
    started = true;
  }
});

//handle clicked buttons
$(".btn").click(function(){
  //assigne id of clicked button to var
  var userChosenColor = $(this).attr("id");
  //push id to array above
  userClickedPattern.push(userChosenColor);
  //play the sound of chosen color
  playSound(userChosenColor);
  animatePress(userChosenColor);

  //2. call checkAnswer
  checkAnswer(userClickedPattern.length - 1);

});

//random Sequence
function nextSequence(){
  level = level + 1;
  $("#level-title").text("Level "+ level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  //flash the chosen color
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeIn(100);
  //play the sound of chosen color
  playSound(randomChosenColor);
  userClickedPattern = [];
}

//function to play sound user/random
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//function to animate pressed
function animatePress(currentColor){
  //using setTimeout to animate
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);

  //another way to animate
  // $("#"+currentColor).addClass("pressed").delay(100).queue(function(next){
  //   $(this).removeClass("pressed").dequeue();
  // });
}

//function to check user answer
function checkAnswer(currentLevel){

  if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
    console.log("success");
    if(userClickedPattern.length == gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
