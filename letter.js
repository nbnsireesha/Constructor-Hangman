// dependency for inquirer npm package
var inquirer = require("inquirer");
// dependency for inquirer is-letter package
var isLetter = require('is-letter');
var Word = require("./word.js");
//no of chances the player have
var limit = 13; 
var flag = 0;

var wrongGuessArray = [];
function Letter(){
	var newWord = new Word();
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
				//console.log(answer.letter);
				//console.log(newWord.remainingLetters);
				//console.log(limit);
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
						// else if(newWord.randomWord[i] != answer.letter){
						// 	console.log("INCORRECT!!!");
						// }
						else if(newWord.randomWord[i] == answer.letter && newWord.wordArray[i] != "_ "){
							console.log("you choose one you have already choosen");
							limit++;
						}
					}//end of for
					if(flag == 0 && (wrongGuessArray.join().includes(answer.letter) == false)){
						wrongGuessArray.push(answer.letter);
						//console.log("INCORRECT!!!");
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
						//reset game
					}
					var strwithCom = newWord.wordArray.join();
					var guessedWord = strwithCom.replace( /,/g, "" );
					if(newWord.randomWord == guessedWord){
						console.log("congrates you won");
					}
					self.getLetter();
				}//if
				
			})
		}
		else{
			var obj1 = new Letter();
			obj1.getLetter();
			return;
		}
	}
	
}
var obj1 = new Letter();
obj1.getLetter();