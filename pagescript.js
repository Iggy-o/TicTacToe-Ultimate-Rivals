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
	(2) Audio Manager:
		All audio volume and queues are controlled
		through the following functions which are called elsewhere
	*/
		function audioStart(){
			$('#' + "mainMusic")
				.trigger('play')
				.prop('volume', 0.1)
			$('#' + "clickSound")
				.trigger('play')
				.prop('volume', 0.6)
		}