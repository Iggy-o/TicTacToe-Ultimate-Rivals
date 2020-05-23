//Ighoise Odigie
//May, 15 2020
//Youtube: https://www.youtube.com/channel/UCud4cJjtCjEwKpynPz-nNaQ?
//Github: https://github.com/Iggy-o
//Preview: https://repl.it/@IghoiseO/TicTacToe-Ultimate-Rivals

//Part 2: Gameplay
/*
(1)Game Settings
	Saves the Game Difficulty, Gamemode, and determines the player tags beforehand. 
  Depending on the gamemode that the user chooses (multiplayer/singleplayer) a
  differend function is ran
*/
	function gameMode1(input) {
    //The gamemode is set to singleplayer
		gameMode = 1;
		type = gameMode;
    //The x and o scoreboard text is set
		$("#playerNameX").text("You");
		$("#playerNameO").text("Bot");
    //The victory phrases are altered based on the gamemode
		xPhrase = "You Win";
		oPhrase = "You Lose";
    //The difficulty is set based on what difficulty the user selects
		difficulty = input;
	}

	function gameMode2() {
    //The gamemode is set to single player
		gameMode = 2;
		type = gameMode;
    //The x and o scoreboard text is set
		$("#playerNameX").text("Player X");
		$("#playerNameO").text("Player O");
    //The victory phrases are altered based on 
		xPhrase = "X Wins";
		oPhrase = "O Wins";
	}
/*
(2)Turn Manager:
	Alternates between the two players in the current game and oly allows for placing 
  of X's and O's during their designated turns.
*/
	let playerTurn = 1
	let allowPlace = true
	function moveFunc(id) {
    let filler = document.getElementById(id);
    //Runs when a blank cell is clicked on player 1's turn
    if (filler.innerHTML == '' && playerTurn == 1 && allowPlace == true) {
      //Places an X in the selected cell
      filler.innerHTML = "X";
      //Plays an audio file
      pieceAudio();
      //Checks the current board for a victor
      checkWinner(boardMap(), "real");
      //Switches the turn to the second player (Human player or AI)
      playerTurn = 2;
    } 
    //Runs when a blank cell is clicked during player 2's turn and if the gamemode is multiplayer
    else if (filler.innerHTML == '' && playerTurn == 2 && allowPlace == true && type != 1) {
      //Places an O in the selected cell
      filler.innerHTML = "O";
      //Plays an audio file
      pieceAudio();
      //Check the current board for a victor
      checkWinner(boardMap(), "real");
      //Switches the turn back to the first player
      playerTurn = 1;
    }
    //Runs after player 1's turn when the gamemoede is singleplayer
    if (type == 1 && playerTurn == 2 && allowPlace != false){
      //The human player's ability to place tiles is Temporarily turned off
      allowPlace = false;
      //The AI decides where to play and makes its move
      robotMove();
      //The check (and other functions) are completed at the end of the robotMove function for technical reasons
    }	
	}

/*
(3)Algorithm:
	The AI brain is based on the Minimax algorithm, an algorithm which simulates the thousands 
  of different possibilities that can occur per game in milliseconds and makes a decision 
  based on the result of a given move. The level of foresight into the future is controlled 
  depending on the skill level of the player, allowing for the user to face an easier or harder bot
*/
	function robotMove() {
    setTimeout(function(){
      //A predetermined table that sets the difficulty of the AI
      let level = {
        easy: 3,
        hard: 5,
        insanity: Infinity
      }

      //The foresight of the AI is changed based on the difficulty level
      let foresight = level[difficulty]

      //The AI function is ran with the aformentioned foresight level
      artificialIntelligence(foresight);

      //This is the AI function that determines where it should move
      function artificialIntelligence(foresight) {
        //Mapping out the entire board into a duplicate copy
        var board = boardMap()

        //Loops through all empty spots and uses minimax to find a resulting value
        let bestScore = -Infinity;
        for (let i=1; i<10; i++) {
          //Only executes if the current spot is empty
          if (board[i-1] == "") {
            //Temporarily sets the current spot to "O"
            board[i-1] = "O";
            //Runs the minimax function recursively until it reaches a terminating result
            let score = minimax(board, 0, false, foresight)
            //Discards the temporary "O"
            board[i-1] = "";
            //The best move is saved and may only be replaced by a better scoring move
            if (score > bestScore) {
              bestScore = score
              bestMove = i
            }
          }
        }
        
        //This is the recursive function that loops through all possible outcomes and finds the result of any given move
        function minimax(board, depth, isMaximizing, foresight) {
          if (depth != foresight) {
            //Initializes the score conversions
            let scores = {
              X: -1,
              O: 1,
              Tie: 0,
              null: null
            }
            //This function checks the result of the move and uses the conversion table to convert the returned winner into a numerical value
            let result = scores[checkWinner(board, "virtual")];

            //If the move wins instantly it is automatically chosen
            /*if (result == 1 && depth == 0) {
              return Infinity
            }*/
            //Otherwise, the result is returned only if it is not a tie (a.k.a "0")
            if (result != null){
              return result
            }

            //Runs if it is the maximizing player's (AI's) turn, its job is to maximize its chances of winning
            if (isMaximizing) {
              //Initializes the bestScore variable as "0"
              let bestScore = -Infinity
              //Loops through every spot on the board
              for (let j=1; j<10; j++) {
                //Executes if the spot is empty
                if (board[j-1] == "") {
                  //Temporarily sets the current spot to "O"
                  board[j-1] = "O";
                  //Runs the minimax function recursively until it recieves a terminating result
                  let score = minimax(board, depth + 1, false, foresight);
                  //Removes the temporary "O"
                  board[j-1] = "";
                  //The resulting scores from each different future move will be compiled into one variable (bestScore)
                  bestScore = Math.max(score, bestScore)
                  //bestScore += score
                }
              }
              //Returns the best score up the recursive chain
              return bestScore
            }
            
            //Runs if it is the minimizing player's (User's) turn, its job is to minimize the AIs chances of winning
            else {	
              //Initializes the bestScore variable as "0"
              let bestScore = Infinity
              //Loops through every spot on the board
              for (let p=1; p<10; p++) {
                //Executes if spot is empty
                if (board[p-1] == "") {
                  //Temporarily sets the current spot to "X"
                  board[p-1] = "X";
                  //Runs the minimax function recursively until it recieves a terminating result
                  let score = minimax(board, depth + 1, true, foresight);
                  //Removes the temporary "X"
                  board[p-1] = "";
                  //The resulting scores from each different future move will be compiled into one variable (bestScore)
                  bestScore = Math.min(score, bestScore)
                  //bestScore += score
                }
              }
              //Returns the best score up the recursive chain
              return bestScore
            }
          }
          else{
            //If the minimax foresight is cutoff due to AI strength then we choose a random return value
            return (Math.round((Math.random()*2)-1))
          }
        }
        //Once the optimal spot is found, the bot makes its move
        document.getElementById("box" + bestMove).innerHTML = "O";
      }

      //The following are here because they must be carried out after this functions

      //This plays a short audio clip
      pieceAudio();
      //The human player's abilty to place is turned back on
      allowPlace = true;
      //The board is checked for a victor
      checkWinner(boardMap(), "real");
      //The turn is switched back to the human player
      playerTurn = 1;
      
    }, 
    //This sets a random time for the bot to wait to simulate thinking and make the AI feel more human
    Math.floor(Math.random() * 500 + 1000))	
	}    

/*
(4)Win/Lose Detection:
	Detects when a player has won the game or if the
	game ends in a draw
*/
  //This function maps out a copy of the current board and is used a lot elsewhere
  function boardMap(){
    var board = [];
    for (let i=1; i<10; i++) {
      board.push(document.getElementById("box" + i).innerHTML);
    }
    return board
  }

  //This function is used to check when a player has won and is also used by the AI to determine the optimal move
  function checkWinner(board, state) {
    //This simplifies the checking process by eliminating the need for repeating similiar processes
    function isThree(a, b, c) {
      return board[a] == board[b] && board[b] == board[c] && board[a] != ""
    }

    //Sets the default value to Tie
    let winner = null;

    //Initializes drawOff(prevents draw from being called when a win occurs simultaneously)
    let drawOff = false;

    //Checks for a HORIZONTAL victory
    for (let rows = 1; rows < 9; rows += 3) {
      if(isThree(rows-1, rows, rows+1)) {
        winner = board[rows-1];
        playerWon(state, false, rows, 1);
      }
    }
    
    //Checks for a VERTICAL victory
    for (let columns = 1; columns < 4; columns += 1) {
      if(isThree(columns-1, columns+2,columns+5)) {
        winner = board[columns-1];
        playerWon(state, false, columns, 3);
      }
    }
    
    //Checks for a RIGHT DIAGONAL victory
    if(isThree(0, 4, 8)) {
      winner = board[0];
      playerWon(state, false, 1, 4);
    }

    //Checks for a LEFT DIAGONAL victory
    if(isThree(2, 4, 6)) {
      winner = board[2];
      playerWon(state, false, 3, 2);
    }
    
    //Checks for draw
    //Loops through all cells and if any are empty the variable becomes true
    var anyEmptyCells = false;
    for (let i=1; i<10; i++) {
      if(board[i-1] == '') {
        anyEmptyCells = true;
      }
    }
    //If the variable remains false, then the game is a draw
    if (anyEmptyCells == false  && drawOff != true) {
      winner = "Tie";
      playerWon(state, true, "draw", 0);
    }
    
    //If a win is detected a list of activities must be completed
    function playerWon(state, isDraw, start, increment){
      //If a player has won and the board is also full, the draw should be not considered
      drawOff = true;
      if (state == "real"){
        //If somebody has won, there should be no draws and players should not be allowed to place anymore
        allowPlace = false;
        
        //If the AI has won then play the losing audio and the color indication red
        if(winner == "O" && type == 1) {
          makeColor = "red";
          endSound("lose");
        }
        //Otherwise it should always play the winning audio and color indicate with green
        else if (winner == "X"||winner == "O"){
          makeColor = "limegreen";
          endSound("win");
        }
        //Responsible for indicating the winner and the winning pieces with color
        colorIndicate(start, increment);
        function colorIndicate(num, num2) { 
          //Changes the color of the pieces depending on the winner (or if it is a draw)
					if (isDraw == true) {
            for (let i=1; i<10; i++){
              document.getElementById("box" + i).style.color = "grey";
            }
					}
          else {
            for(let i=0; i<3*num2; i+=num2) {
              document.getElementById("box" + (num+ i)).style.color = makeColor;
            }
          }
					//Changing color back to white
					setTimeout(function(){
						for (let i=1; i<10; i++){
              document.getElementById("box" + i).style.color = "white";
            }
					}, 1000)
			  }

        //Runs a function that deals with the match end tasks
        matchComplete(winner);
      }
    }

    //If the check is just a virtual check by the AI, it returns the winner
    if (state == "virtual") {
      return winner
    }
  }

	
	
/*
(5)Game Reset:
  Completes a variety of Match end tasks to ensure a smooth 
  transition into the next match
*/
  //Increments the scoreboard by 1 depending on the winning player andconfigures the pause menu to become a game end menu
  let scoreBoardX = 0;
	let scoreBoardO = 0;
	function matchComplete(player) {
    if (player == "X") {
      $("#gameEndText").text(xPhrase);
      $("#scoreBoardX").text(scoreBoardX += 1);
    } 
    else if (player == "O") {
      $("#gameEndText").text(oPhrase);
      $("#scoreBoardO").text(scoreBoardO += 1);
    }
    else if (player == "Tie"){
      $("#gameEndText").text("Draw");
    }
    setTimeout(function(){
      pageManager('menu');
      resetFunc();
    }, 2000)
	}

  //Runs through each board tile and resets its value to start a fresh new game
	function resetFunc() {
		for (i=1; i<10; i++) {
			$('#box' + i).html('');
		}
		allowPlace = true;
		playerTurn = 1;
	} 

  //Runs if the user chooses to go to the main menu and resets the scoreboard
  function scoreReset() {
    scoreBoardX = 0;
		$("#scoreBoardX").text(scoreBoardX);
		scoreBoardO = 0;
    $("#scoreBoardO").text(scoreBoardO);
  }

/*
(6)Pause Menu:
	Opens the pause menu and alters the settings
*/
  //Brings up the pause menu when the user clicks the pause button
	function pauseGame() {
		if (allowPlace != false) {
			$('#exitButton').show();
			$("#gameEndText").text("Paused");
			pageManager('menu');
		}
	}

  //Responsible for unpausing the game and hiding the pause menu
	function unpauseGame() {
		$('#exitButton').hide();
		backToLastPage();
	}
  
/*
(7)Program Complete
*/