// dependency for inquirer npm package
var inquirer = require("inquirer");
// dependency for inquirer is-letter package
var isLetter = require('is-letter');
var Word = require("./word.js");
var winCount = 0;
function Letter(){
	var newWord = new Word();
	var wrongGuessArray = [];
	var limit = 13;
	var flag = 0;
	
	var self = this;
 
	this.getLetter = function(){
		if(newWord.remainingLetters > 0 && limit >= 1 ){
			inquirer.prompt([
			  {

			  	name: "letter",
			  	message: "Guess letter:",
			  	validate: function(value){
			  		if(isLetter(value)){
			  			return true;
			  		}
			  		else{
			  			return false;
			  		}
			  	}
			  }
			]).then(function(answer){
				if(newWord.remainingLetters > 0 && limit >= 1){
					for (var i = 0; i < newWord.randomWord.length; i++) {
						debugger
						if(newWord.randomWord[i] == answer.letter && newWord.wordArray[i] == "_ "){

							newWord.wordArray[i] = answer.letter;
							console.log(newWord.wordArray.join().replace( /,/g, "" ));
							console.log("CORRECT!!!");
							flag = 1;
							newWord.remainingLetters--;
							
						}
						else if(newWord.randomWord[i] == answer.letter && newWord.wordArray[i] != "_ "){
							console.log("you choose one you have already choosen");
							limit++;
						}
					}//end of for
					if(flag == 0 && (wrongGuessArray.join().includes(answer.letter) == false)){
						wrongGuessArray.push(answer.letter);
						//console.log(wrongGuessArray.join().replace( /,/g, "" ));
					}
					if(flag == 0){
						console.log("INCORRECT!!!");
					}
					limit--;
					flag = 0;
					if(limit == 1){
						console.log("its your last chance of guessing");
					}
					if(limit == 0){
						console.log("you are out of lifes try again");
					}
					var strwithCom = newWord.wordArray.join();
					var guessedWord = strwithCom.replace( /,/g, "" );
					if(newWord.randomWord == guessedWord){
						console.log("congrates you won");
						winCount++;
						console.log("YOUR TOTAL WINS:" +winCount);
					}
					self.getLetter();
				}//if
				
			})
		}
		else{
			inquirer.prompt([
			  {
			  	name: "confirm",
			  	type: "confirm",
			  	message: "would you like to play again?"
			  }
			]).then(function(answer){
				if(answer.confirm === true){
					var obj1 = new Letter();
					obj1.getLetter();
				}
				else{
					return;
				}
			});		
		}
	}	
}
var obj1 = new Letter();
obj1.getLetter();