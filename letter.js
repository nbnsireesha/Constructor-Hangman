// dependency for inquirer npm package
var inquirer = require("inquirer");
// dependency for inquirer is-letter package
var isLetter = require('is-letter');
var Word = require("./word.js");
//no of chances the player have
var limit = 13; 
var newWord = new Word();
function Letter(){

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
					limit--;
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
			return;
		}
	}
	
}
var obj1 = new Letter();
obj1.getLetter();