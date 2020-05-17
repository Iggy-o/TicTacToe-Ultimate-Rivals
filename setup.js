//Ighoise Odigie
//May, 15 2020
//Youtube: https://www.youtube.com/channel/UCud4cJjtCjEwKpynPz-nNaQ?
//Github: https://github.com/Iggy-o
//Preview: https://repl.it/@IghoiseO/TicTacToe-Ultimate-Rivals


//Preliminary Tasks: Versioning
var versionNumber = "Version 2.1.5"
$("#version").text(versionNumber)

//Part 1: Screens and Audio
/*
(1)Screen Manager:
  The most recent 3 pages are saved and can be switched to based on user input.
  For example, When you click on the back button, this function switches to the 
  previous page using the page stored in the previous page variable
*/
  //Initializes variables for 3 pages, the current page, previous page, and the farthest page
  var farPage;
  var previousPage;
  var currentPage = 'frontPage';

  //This function switches to the page that is called up in the HTML
  function pageManager(newPage) {
    audioStart();
    $('#' + currentPage).hide();
    $('#' + newPage).show();
    farPage = previousPage
    previousPage = currentPage
    currentPage = newPage
  }

  //This function is specifically for the back button, it switches to the previous know page
  function backToLastPage(){
    audioStart();
    $('#' + currentPage).hide();
    $('#' + previousPage).show();
    currentPage = previousPage
    previousPage = farPage
    farPage = null
  }

/*
(2) Audio Manager:
  All audio volume and queues are controlled
  through the following functions which are called elsewhere
*/
  //This function starts the game's main song and plays the button click sounds
  function audioStart(){
    $("#mainMusic")
      .trigger('play')
      .prop('volume', 0.05)
    $("#clickSound")
      .trigger('play')
      .prop('volume', 0.6)
  }

  //Plays audio when a tile (X or O) is placed
  function pieceAudio() {
    $("#pieceSound")
    .trigger('play')
    .prop('volume', 0.05)
  }

  //Plays a sound when a player wins or loses
  function endSound(state){
    if (state == "win") {
      $("#winSound")
        .trigger('play')
        .prop('volume', 0.2)
    }
    else if(state == "lose") {
      $("#loseSound")
        .trigger("play")
        .prop("volume", 0.2)
    }  
  }