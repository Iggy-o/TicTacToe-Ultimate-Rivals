//Made by Ighoise

//Part 1: Screens and Audio
	/*
	(1)Screen Manager:
		The most recent 3 pages are saved and can be 
		switched to based on user input
	*/
		var farPage;
		var previousPage;
		var currentPage = 'frontPage';
		function pageManager(newPage) {
			audioStart();
			$('#' + currentPage).hide();
			$('#' + newPage).show();
			farPage = previousPage
			previousPage = currentPage
			currentPage = newPage
		}
		function backToLastPage(){
			audioStart();
			$('#' + currentPage).hide();
			$('#' + previousPage).show();
			currentPage = previousPage
			previousPage = farPage
			farPage = null
		}

	/*
	(2) Audio Manager
		All audio volume and queues are controlled
		through the following functions which are called elsewhere
	*/
		function audioStart(){
			$('#' + "mainMusic").trigger('play')
			$('#' + "mainMusic").prop('volume', 0.1)
			$('#' + "clickSound").trigger('play')
			$('#' + "clickSound").prop('volume', 0.6)
		}
	
	/*var mainMenu = document.getElementById("mainMenu")
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
			
			if (difficulty == "insanity") {
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
	}*/
