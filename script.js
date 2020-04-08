//Made by Ighoise

$(document).ready(function() {

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
				
				function robotMove() {
						
						setTimeout(function(){
								
								if (type == 1 && difficulty == "easy") {
										easyVersion()
								}
								else if (type == 1 && difficulty == "hard") {
										hardVersion()
								}
								else if (type == 1 && difficulty == "insanity") {
										insanityVersion()
								}
								
								
								
								function easyVersion() {
										var emptySquares = []
										for (i=1; i<10; i++) {
														
												if (document.getElementById("box" + i).innerHTML == ''){
														emptySquares.push(i);
												}
										}
										var choice = emptySquares[Math.floor(Math.random() * emptySquares.length)]
										document.getElementById("box" + choice).innerHTML = "O";
								}
								
								
								
								
								
								
								
								
								function hardVersion() {
										var emptySquares = []
										var board = []
										var bestScore = -Infinity
										var bestMove = null
										var scoresSame = true
										
										for (i=1; i<10; i++) {
												//Mapping out the board
												for (j=1; j<10; j++){
												if (document.getElementById("box" + j).innerHTML != ''){
														board.push(document.getElementById("box" + j).innerHTML)
														//console.log(board[0])
												}
												else{board.push(document.getElementById("box" + j).innerHTML)}
												}
												
												//Finding empty areas
												if (document.getElementById("box" + i).innerHTML == ''){
														emptySquares.push(i);
														
														//console.log(emptySquares[0])
														let score = minimax(board, 0, true)
														if (score > bestScore) {
																	bestScore = score
																	bestMove = i
																	/*if (bestScore >= -1) {
																	scoresSame = false
																	}*/
														}
												}
										}
										
										function minimax(board, depth, Maximizing) {
												board[i-1] = 'O'
												var state = checkWinner(board)
												board[i-1] = ''
												
												if (state == 'winner') {
														scoresSame = false
														//console.log("switcheroo")
														return 1
														
												}
												else if(state == 'loser'){
														scoresSame = false
														//console.log("switcheroo")
														return -1
														
												}/*else if(state == 'forfeit'){
														score = Infinity
														bestMove = 5
												}*/
												else{
														return 0
												}
												
										}
										
										function checkWinner(board) {
												var rows = 1
												var columns = 1
												var rightDiagonal = 1
												var leftDiagonal = 3
												while(rows<9) {
														if(board[rows-1] == 'O' & board[rows] == 'O' && board[rows+1] == 'O') {
																//console.log("Horizontal_Attempt")
																return 'winner'
														}
												rows+=3
												}
												
												while(columns<4) {
														if(board[columns-1] == 'O' & board[columns+2] == 'O' && board[columns+5] == 'O') {
																//console.log("Vertical_Attempt")
																return 'winner'
														}
												columns+=1
												}
												
												if(board[rightDiagonal-1] == 'O' & board[rightDiagonal+3] == 'O' && board[rightDiagonal+7] == 'O') {
														//console.log("->Diagonal_Attempt")
														return 'winner'
												}
												if(board[leftDiagonal-1] == 'O' & board[leftDiagonal+1] == 'O' && board[leftDiagonal+3] == 'O') {
														//console.log("<-Diagonal_Attempt")
														return 'winner'
												}
												
												
																
												for(human = 0; human<9; human++){
														//console.log(i, bestMove, bestScore, human)
		
														if(board[human] != 'O' && board[human] != 'X'){
																//console.log(human)
																//console.log(board[human])
																/*console.log(board[0], " -")
																console.log(board[1], " -")
																console.log(board[2], " -")
																console.log(board[3], " -")
																console.log(board[4], " -")
																console.log(board[5], " -")
																console.log(board[6], " -")
																console.log(board[7], " -")
																console.log(board[8], " -")
																console.log("----")*/
																
																board[human] = 'X'
																		rows = 1
																		columns = 1
																		rightDiagonal = 1
																		leftDiagonal = 3
																		/*if(board[rows-1] == 'X' & board[rows+3] == 'X' && board[rows+1] == 'X'){
																				return 'loser'
																		}*/
																		
																		while(rows<9) {
																		if(board[rows-1] == 'X' & board[rows] == 'X' && board[rows+1] == 'X') {
																				
																				/*var chance = ultimateStuck();
																				if(chance == 'hopeless'){
																						return 'forfeit'
																				}*/
																				
																				board[human] = ''
																				return 'loser'
																		}
																		rows+=3
																		}
																		
																		while(columns<4) {
																				if(board[columns-1] == 'X' & board[columns+2] == 'X' && board[columns+5] == 'X') {
																						
																						/*var chance = ultimateStuck()
																						if(chance == 'hopeless'){
																						return 'forfeit'
																						}*/
																						
																						board[human] = ''
																						return 'loser'
																				}
																		columns+=1
																		}
																		
																		if(board[rightDiagonal-1] == 'X' & board[rightDiagonal+3] == 'X' && board[rightDiagonal+7] == 'X') {
																				/*console.log(board[rightDiagonal-1])
																				console.log(board[rightDiagonal+3])
																				console.log(board[rightDiagonal+7])
																				console.log("---r")*/
																				board[human] = ''
																				return 'loser'
																		}/*else{
																				console.log(board[rightDiagonal-1])
																				console.log(board[rightDiagonal+3])
																				console.log(board[rightDiagonal+7])
																				console.log("---")
																		}*/
																		if(board[leftDiagonal-1] == 'X' & board[leftDiagonal+1] == 'X' && board[leftDiagonal+3] == 'X') {
																				//console.log("--->")
																				board[human] = ''
																				return 'loser'
																		}
																		
																		
																		
																		/*function ultimateStuck(){
																				rightDiagonal = 1
																				leftDiagonal = 3
																				if(board[rightDiagonal-1] == 'X' & board[rightDiagonal+3] == 'X' && board[rightDiagonal+7] == 'X') {
																				console.log('oh no')
																				board[human] = ''
																				return 'hopeless'
																				}
																				if(board[leftDiagonal-1] == 'X' & board[leftDiagonal+1] == 'X' && board[leftDiagonal+3] == 'X') {
																						console.log('oh no')
																						board[human] = ''
																						return 'hopeless'
																				}
																				
																				
																				console.log("checking...")
																		}*/
																
																board[human] = ''
														}
														
												}
												
												/*for(human = 0; human<board.length; human++){
														var notTaken = []
														
														if (board[human]==''){
																notTaken.push(human);
														}
														
														for(dangerous = 0; dangerous)
														
												}*/
												
												
										}
										
										if(document.getElementById("box5").innerHTML == ''){
												document.getElementById("box" + 5).innerHTML = 'O'
										}
										else if (scoresSame == true && bestScore == 0){
												var choice = emptySquares[Math.floor(Math.random() * emptySquares.length)]
												document.getElementById("box" + choice).innerHTML = "O";    
										}
										else{
												document.getElementById("box" + bestMove).innerHTML = "O";
												
										}
										
										/*var choice = emptySquares[Math.floor(Math.random() * emptySquares.length)]
										document.getElementById("box" + choice).innerHTML = "O";*/
										
										
										/*var scores = {
														X: 10,
														O: -10,
														draw: 0
												};
												
										var bestScore = -100
										
										for (x=1; x<10; x++) {
												
												scores = minimax(x)
												
												if (scores > bestScore) {
														bestScore = scores
														console.log(bestScore)
														var pick = x
														console.log(pick)
												}
												
												function minimax(placed) {
														let result = checkWinner()
														if (result !== "draw") {
														console.log(checkWinner()+ "Hi")
														return scores[result]
														}
														
												} 
												
												
															
												function checkWinner() {
														var areas = [
																					['', '', ''],
																					['', '', ''],
																					['', '', '']
																				];
																				
														console.log(areas[0])
														
														for (y=1; y<4; y++) {
																for (z=1; z<4; z++) {
																		if (document.getElementById("box" + y*z).innerHTML == "O") {
																				areas[y][z] = "ai"
																				console.log(areas[y][z])
																		} 
																		else if (document.getElementById("box" + y*z).innerHTML == "X") {
																				areas[y][z] = "human"
																		}
																}
														}
														
														for (space = 1; space < emptySquares.length; space++) {
																available = emptysquares[space]
																areas[x] = 'ai'
																
																//console.log("Hi " + areas[1][1] + " Virtual: " + areas)
																
																function equals3(a, b, c) {
																		return a == b && b == c && a != '';
																}
																
																// horizontal
																for (g = 0; g < 3; g++) {
																		if (equals3(areas[g][0], areas[g][1], areas[g][2])) {
																			var winner = areas[g][0];
																		}
																}
																if (winner == "X" || winner == "O") {
																		return winner;
																} 
																else {
																		return "draw"
																}
														}
												}
										} */
										
								//document.getElementById("box" + pick).innerHTML = "O";
								}
								
								
								
								function insanityVersion() {
										
								}
										
								check();
								playerTurn = 1;
								allowPlace = true
								
						}, Math.floor(Math.random() * 1000))
						
				}    
				
//Winning Recognition

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
		
//Match Complete
				
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
								gameOver();
						}, 2000)
				}
				

//Screen Manager
						var mainMenu = document.getElementById("mainMenu")
						var front = document.getElementById("frontPage")
						var credits = document.getElementById("creditsPage")
						var gamemode = document.getElementById("multiSinglePlayerPage")
						var gameDifficulty = document.getElementById("modePage")
						var gameBoard= document.getElementById("gameBoard")
						var menu = document.getElementById("menu")
						var exitButton = document.getElementById("exitButton")
						var soundOn = true
						
				function startUp() {
						mainMenu.style.display = "inline-block"
						front.style.display = "none"
						gamemode.style.display = "inline-block"
						document.getElementById("mainMusic").play()
						document.getElementById("mainMusic").volume = 0.1
						document.getElementById("clickSound").play()
						document.getElementById("clickSound").volume = 0.6
				}
				
				function backToLastPage() {
						if (credits.style.display == "inline-block") {
								front.style.display = "inline-block"
								credits.style.display = "none"
						}
						else if (gamemode.style.display == "inline-block"){
								front.style.display = "inline-block"
								gamemode.style.display = "none"
						}
						else if (gameDifficulty.style.display == "inline-block"){
								gamemode.style.display = "inline-block"
								gameDifficulty.style.display = "none"
						}
						document.getElementById("clickSound").play()
				}
				
				function rollCredits() {
						mainMenu.style.display = "inline-block"
						front.style.display = "none"
						credits.style.display = "inline-block"
						document.getElementById("mainMusic").play()
						document.getElementById("mainMusic").volume = 0.1
						document.getElementById("clickSound").play()
						document.getElementById("clickSound").volume = 0.6
				}
				
				function playerPage(x) {
						type = x;
						
						if (type == 1) {
								document.getElementById("playerNameX").innerHTML = "You"
								document.getElementById("playerNameO").innerHTML = "Bot"
								xPhrase = "You Win"
								oPhrase = "You Lose"
								
								mainMenu.style.display = "inline-block"
								gamemode.style.display = "none"
								gameDifficulty.style.display = "inline-block"
						}
						
						if (type == 2) {
								document.getElementById("playerNameX").innerHTML = "Player X"
								document.getElementById("playerNameO").innerHTML = "Player O"
								xPhrase = "X Wins"
								oPhrase = "O Wins"
								
								mainMenu.style.display = "none"
								gamemode.style.display = "none"
								gameBoard.style.display = "inline-block"
						}
						document.getElementById("clickSound").play()
				}
				
				function difficultyPage(y) {
						difficulty = y;
						
						if (difficulty == "insanity" /*|| difficulty == "hard"*/) {
						alert("Locked: Coming Soon")
						}
						else {
						mainMenu.style.display = "none"
						gameDifficulty.style.display = "none"
						gameBoard.style.display = "inline-block"
						}
						document.getElementById("clickSound").play()
				}
				
				function gameOver() { 
						playerTurn = 1;
						allowPlace = true
						gameBoard.style.display = "none"
						menu.style.display = "inline-block"
				}
				
				function pauseGame() {
						if(allowPlace == true){
								gameBoard.style.display = "none"
								menu.style.display = "inline-block"
								exitButton.style.display = "inline-block"
								document.getElementById("gameEndText").innerHTML = "Paused"
								document.getElementById("menuClick").play()
								document.getElementById("menuClick").volume = 0.1
						}
				}
				
				function unpauseGame() {
						gameBoard.style.display = "inline-block"
						menu.style.display = "none"
						exitButton.style.display = "none"
						document.getElementById("menuClick").play()
				}
				
				function resetFunc() {
						for (i=1; i<10; i++) {
								document.getElementById("box" + i).innerHTML = '';
						}
						document.getElementById("clickSound").play()
						gameBoard.style.display = "inline-block"
						menu.style.display = "none"
				}
				
				function mainMenuFunc() {
						for (i=1; i<10; i++) {
								document.getElementById("box" + i).innerHTML = '';
						}
						document.getElementById("clickSound").play()
						scoreBoardX = 0
						scoreBoardO = 0
						document.getElementById("scoreBoardX").innerHTML = 0;
						document.getElementById("scoreBoardO").innerHTML = 0;
						mainMenu.style.display = "inline-block"
						front.style.display = "inline-block"
						menu.style.display = "none"
						exitButton.style.display = "none"
				}
				
				/*function muteGame(){
						console.log("run")
						if (soundOn===true) {
								document.getElementById("mainMusic").volume = 0
								document.getElementById("muteButton").innerHTML = "Mute"
								document.getElementById("winSound").muted = true
								document.getElementById("loseSound").muted = true
								document.getElementById("clickSound").muted = true 
								document.getElementById("pieceSound").muted = true
								document.getElementById("menuClick").muted = true
								soundOn = false;
						}
						else if (soundOn===false) {
								document.getElementById("mainMusic").volume = 0.1
								document.getElementById("muteButton").innerHTML = "Unmute"
								document.getElementById("winSound").muted = false
								document.getElementById("loseSound").muted = false
								document.getElementById("clickSound").muted = false
								document.getElementById("pieceSound").vmuted = false
								document.getElementById("menuClick").muted = false
								soundOn = true;
						}
				}*/
});
				