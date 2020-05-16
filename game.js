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
	function gameMode1(input) {
		gameMode = 1
		type = gameMode
		$("#playerNameX").text("You")
		$("#playerNameO").text("Bot")
		xPhrase = "You Win"
		oPhrase = "You Lose"
		difficulty = input
		console.log("gameMode Set", difficulty);
	}

	function gameMode2() {
		gameMode = 2
		type = gameMode
		$("#playerNameX").text("Player X")
		$("#playerNameO").text("Player O")
		xPhrase = "X Wins"
		oPhrase = "O Wins"
		console.log("gameMode Set");
	}
/*
(2)Turn Manager:
	Alternates between the two players in the 
	current game
*/
	var playerTurn = 1
	var allowPlace = true
	var type = 0
	var difficulty = 0;
	function moveFunc(id) {
			
			var filler = document.getElementById(id);
			
			if (filler.innerHTML == '' && playerTurn == 1 && allowPlace == true) {
					filler.innerHTML = "X";
					document.getElementById("pieceSound").play()
					document.getElementById("pieceSound").volume = 0.05
					check();
					playerTurn = 2
			} 
			else if (filler.innerHTML == '' && playerTurn == 2 && allowPlace == true && type != 1) {
					filler.innerHTML = "O";
					document.getElementById("pieceSound").play()
					document.getElementById("pieceSound").volume = 0.05
					check();
					playerTurn = 1;
			}
			else if (filler.innerHTML != '') {
					alert("STOP CHEATING!")
			}
			
			if (type == 1 && playerTurn == 2 && allowPlace != false){
					allowPlace = false;
					document.getElementById("pieceSound").play()
					document.getElementById("pieceSound").volume = 0.05
					robotMove()
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
        var board = [];
        for (let i=1; i<10; i++) {
          board.push(document.getElementById("box" + i).innerHTML)
        }
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
            //Uses the conversion table to convert the returned winner into a numerical value
            let result = scores[checkWinner()];

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

        //This function checks the result of the move
        function checkWinner() {
          //Simplifies the checking process by eliminating the need for repeating similair processes
          function isThree(a, b, c) {
            return board[a] == board[b] && board[b] == board[c] && board[a] != ""
          }

          //Sets the default value to Tie
          let winner = "Tie";

          //Checks for a HORIZONTAL victory
          for (let rows = 1; rows < 9; rows += 3) {
            if(isThree(rows-1, rows, rows+1)) {
              winner = board[rows-1];
            }
          }
          
          //Checks for a VERTICAL victory
          for (let columns = 1; columns < 4; columns += 1) {
            if(isThree(columns-1, columns+2,columns+5)) {
              winner = board[columns-1];
            }
          }
          
          //Checks for a RIGHT DIAGONAL victory
          if(isThree(0, 4, 8)) {
            winner = board[0];
          }

          //Checks for a LEFT DIAGONAL victory
          if(isThree(2, 4, 6)) {
            winner = board[2];
          }

          //Returns the winner
          return winner
        }

        //Once the optimal spot is found, the bot makes its move
        document.getElementById("box" + bestMove).innerHTML = "O";
      }
      
      check();
      playerTurn = 1;
      allowPlace = true
    }, 
    //This sets a random time for the bot to wait to simulate thinking and make it feel more human
    Math.floor(Math.random() * 500 + 500))	
	}    

/*
(4)Win/Lose Detection:
	Detects when a player has won the game or if the
	game ends in a draw
*/
	function check() {
			
			var k = 1
			var l = 3
			var recheck = 1
	
			var piece = "O"
			
			//Checking States of Boxes
			
			function box(num, num2) { 
					var state = document.getElementById("box" + (num+num2)).innerHTML
					return state;
			}
			
			//Indicate A Three in a Row with Color
			
			function colorIndicate(num, num2) { 
					var extra = 0
					
					// Changing color depending on win or loss
					if (piece == "X" && isDraw != true) {
							makeColor = "limegreen"
							document.getElementById("winSound").play()
							document.getElementById("winSound").volume = 0.2
					} 
					else if (piece == "O" && type == 1 && isDraw != true){
							makeColor = "red"
							document.getElementById("loseSound").play()
							document.getElementById("loseSound").volume = 0.2
					}
					else if (piece == "O" && type == 2 && isDraw != true){
							makeColor = "limegreen"
							document.getElementById("winSound").play()
							document.getElementById("winSound").volume = 0.2
					}
					else if (isDraw == true) {
							//console.log("draw")
							var drawBoxes = 1
							while(drawBoxes < 10) {
									var drawChange = document.getElementById("box" + drawBoxes).style.color = "grey"
									drawBoxes += 1
							}
					}
					
					
					
					while(extra < 3*num2) {
							var colorChange = document.getElementById("box" + (num+ extra)).style.color = makeColor
							extra+=num2
					}
					
					
					
					//Changing color back to white
					setTimeout(function(){
							var extra = 0
							while(extra < 3*num2) {
							var colorChange = document.getElementById("box" + (num+ extra)).style.color = "white"
							extra+=num2
							}
							var drawBoxes = 1
							while(drawBoxes < 10) {
									var drawChange = document.getElementById("box" + drawBoxes).style.color = "white"
									drawBoxes += 1
							}
					}, 1000)
			}
			
			
			//Checking for 3 in a row
			
			while(recheck < 3) {
					
					var i = 1
					while(i<9) {
							
							if(box(i, 0) == piece && box(i, 1) == piece && box(i, 2) == piece) {
									allowPlace = false
									colorIndicate(i, 1);
									var drawOff = true
									matchComplete(piece);
							}
							
					i+=3
					}
					
					var j = 1
					while(j<4) {
							
							if(box(j, 0) == piece && box(j, 3) == piece && box(j, 6) == piece) {
									allowPlace = false
									colorIndicate(j, 3);
									var drawOff = true
									matchComplete(piece);
							}
							
					j+=1
					}
					
					if(box(k, 0) == piece && box(k, 4) == piece && box(k, 8) == piece) {
									allowPlace = false
									colorIndicate(k, 4);
									var drawOff = true
									matchComplete(piece);
					}

					if(box(l, 0) == piece && box(l, 2) == piece && box(l, 4) == piece) {
									allowPlace = false
									colorIndicate(l, 2);
									var drawOff = true
									matchComplete(piece);
					}
					piece = "X";
					recheck++
			}
			
			//Checking for Draw
			
			function fullBoard(numbro) {
					var drawCheck = document.getElementById("box" + numbro).innerHTML
					return drawCheck;
			}
			
			
			var a = 1
			var anyEmptyCells = false
			while (a<10) {
					
					if (fullBoard(a) == '') {
							anyEmptyCells = true
					}
					
					a++
			}
			
			if (anyEmptyCells == false  && drawOff != true) {
					allowPlace = false
					var isDraw = true
					colorIndicate("draw", 0);
					matchComplete("draw");
			}
		
	}

/*
(5)Match End Tasks:
	Resets the game when the match ends
*/
	var scoreBoardX = 0
	var scoreBoardO = 0
	function matchComplete(player) {
			
					
					if (player == "X") {
							document.getElementById("gameEndText").innerHTML = xPhrase
							document.getElementById("scoreBoardX").innerHTML = scoreBoardX += 1
					} 
					else if (player == "O") {
							document.getElementById("gameEndText").innerHTML = oPhrase
							document.getElementById("scoreBoardO").innerHTML = scoreBoardO += 1
					}
					else if (player == "draw"){
							document.getElementById("gameEndText").innerHTML = "Draw"
					}
					
			setTimeout(function(){
					resetFunc();
					pageManager('menu');
			}, 2000)
	}
	
/*
(6)Game Reset:
	Runs through each board tile and resets its 
	value to start a fresh new game
*/
	function resetFunc() {
		for (i=1; i<10; i++) {
			$('#' + 'box' + i).html('');
		}
		//scoreBoardX = 0
		//document.getElementById("scoreBoardX").innerHTML = scoreBoardX
		//scoreBoardO = 0
		//document.getElementById("scoreBoardO").innerHTML = scoreBoardO

		allowPlace = true;
		playerTurn = 1;
	} 

/*
(7)Pause Menu:
	Opens the pause menu and alters the settings
*/
	function pauseGame() {
		if (allowPlace != false) {
			$('#exitButton').show()
			$("#gameEndText").text("Paused")
			pageManager('menu');
		}
	}

	function unpauseGame() {
		$('#exitButton').hide()
		backToLastPage();
	}




	
					
	
				
	
		
//Match Complete
					
	
							
				