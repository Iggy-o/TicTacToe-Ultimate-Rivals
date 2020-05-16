//Ighoise Odigie
//May, 15 2020
//Youtube: https://www.youtube.com/channel/UCud4cJjtCjEwKpynPz-nNaQ?
//Github: https://github.com/Iggy-o
//Preview: https://repl.it/@IghoiseO/TicTacToe

//Part 2: Gameplay
/*
(1)Game Settings
	Saves the Game Difficulty, Gamemode, 
	and determines the player tags beforehand
*/
  //If the user chooses to play singleplayer, the following function is ran
	function gameMode1(input) {
		gameMode = 1;
		type = gameMode;
		$("#playerNameX").text("You");
		$("#playerNameO").text("Bot");
		xPhrase = "You Win";
		oPhrase = "You Lose";
		difficulty = input;
	}

  //If the user chooses to play multiplayer, the following function is ran
	function gameMode2() {
		gameMode = 2;
		type = gameMode;
		$("#playerNameX").text("Player X");
		$("#playerNameO").text("Player O");
		xPhrase = "X Wins";
		oPhrase = "O Wins";
	}
/*
(2)Turn Manager:
	Alternates between the two players in the 
	current game
*/
	let playerTurn = 1
	let allowPlace = true
	function moveFunc(id) {
    let filler = document.getElementById(id);
    if (filler.innerHTML == '' && playerTurn == 1 && allowPlace == true) {
      filler.innerHTML = "X";
      pieceAudio();
      checkWinner(boardMap(), "real");
      playerTurn = 2;
    } 
    else if (filler.innerHTML == '' && playerTurn == 2 && allowPlace == true && type != 1) {
      filler.innerHTML = "O";
      pieceAudio();
      checkWinner(boardMap(), "real");
      playerTurn = 1;
    }
    if (type == 1 && playerTurn == 2 && allowPlace != false){
      allowPlace = false;
      robotMove();
      //The check (and other functions) completed at the end of the robotMove function
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
        easy: 2,
        hard: 5,
        insanity: Infinity
      }

      //The foresight of the AI is changed based on the difficulty level
      let foresight = level[difficulty]

      //The AI function is ran with the aformentioned foresight level
      insanityVersion(foresight)

      //This is the AI function that determines where it should move
      function insanityVersion(foresight) {
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
              Tie: 0
            }
            //This function checks the result of the move and uses the conversion table to convert the returned winner into a numerical value
            let result = scores[checkWinner(board, "virtual")];

            //If the move wins instantly it is automatically chosen
            if (result == 1 && depth == 0) {
              return Infinity
            }
            //Otherwise, the result is returned only if it is not a tie (a.k.a "0")
            else if (result != 0){
              return result
            }

            //Runs if it is the maximizing player's (AI's) turn, its job is to maximize its chances of winning
            if (isMaximizing) {
              //Initializes the bestScore variable as "0"
              let bestScore = 0
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
                  bestScore += score
                }
              }
              //Returns the best score up the recursive chain
              return bestScore
            }
            
            //Runs if it is the minimizing player's (User's) turn, its job is to minimize the AIs chances of winning
            else {	
              //Initializes the bestScore variable as "0"
              let bestScore = 0
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
                  bestScore += score
                }
              }
              //Returns the best score up the recursive chain
              return bestScore
            }
          }
          else{
            return 1
          }
        }
        //Once the optimal spot is found, the bot makes its move
        document.getElementById("box" + bestMove).innerHTML = "O";
      }

      //The following are here because they must be carried out after this function and I cannot implement async await
      pieceAudio();
      allowPlace = true
      checkWinner(boardMap(), "real");
      playerTurn = 1;
      
    }, 
    //This sets a random time for the bot to wait to simulate thinking and make it feel more human
    Math.floor(Math.random() * 500 + 500))	
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
      board.push(document.getElementById("box" + i).innerHTML)
    }
    return board
  }

  //This function is used to check when a player has won and is also used by the AI to determine the optimal move
  function checkWinner(board, state) {
    //Simplifies the checking process by eliminating the need for repeating similiar processes
    function isThree(a, b, c) {
      return board[a] == board[b] && board[b] == board[c] && board[a] != ""
    }

    //Sets the default value to Tie
    let winner = "Tie";

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
    if (state == "real") {
      var anyEmptyCells = false
      //Loops through all cells and if any are empty the variable becomes true
      for (let i=1; i<10; i++) {
        if(document.getElementById("box" + i).innerHTML == '') {
          anyEmptyCells = true
        }
      }
      //If the variabel remains false, then the game is a draw
      if (anyEmptyCells == false  && drawOff != true) {
        playerWon(state, true, "draw", 0)
      }
    }

    function playerWon(state, isDraw, num, num2){
      if (state == "real"){
        allowPlace = false
        var drawOff = true

        if (winner == "X" && isDraw != true) {
          makeColor = "limegreen"
          endSound("win")
          colorIndicate(num, num2);
        } 
        else if (winner == "O" && type == 1 && isDraw != true){
          makeColor = "red"
          endSound("lose")
          colorIndicate(num, num2);
        }
        else if (winner == "O" && type == 2 && isDraw != true){
          makeColor = "limegreen"
          endSound("win")
          colorIndicate(num, num2);
        }
        function colorIndicate(num, num2) { 
					if (isDraw == true) {
            for (let drawBoxes=1; drawBoxes<10; drawBoxes++){
              document.getElementById("box" + drawBoxes).style.color = "grey"
            }
					}
					
					for(let extra=0; extra<3*num2; extra+=num2) {
            document.getElementById("box" + (num+ extra)).style.color = makeColor
          }
					
					//Changing color back to white
					setTimeout(function(){
						for (let drawBoxes=1; drawBoxes<10; drawBoxes++){
              document.getElementById("box" + drawBoxes).style.color = "white"
            }
					}, 1000)
			  }
        matchComplete(winner);
      }
    }

    if (state == "virtual") {
      //If the check is just a virtual check by the AI, it returns the winner
      return winner
    }
  }
/*
(5)Match End Tasks:
	Resets the game when the match ends
*/
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
	
/*
(6)Game Reset:
	Runs through each board tile and resets its 
	value to start a fresh new game
*/
  //Resets the board at the end of a match
	function resetFunc() {
		for (i=1; i<10; i++) {
			$('#box' + i).html('');
		}
		allowPlace = true;
		playerTurn = 1;
	} 

  //Runs if the user chooses to go to the main menu
  function scoreReset() {
    scoreBoardX = 0;
		$("#scoreBoardX").text(scoreBoardX);
		scoreBoardO = 0;
    $("#scoreBoardO").text(scoreBoardO);
  }

/*
(7)Pause Menu:
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
(8)Program Complete
*/
					
	
							
				