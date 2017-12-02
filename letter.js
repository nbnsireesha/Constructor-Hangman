// dependency for inquirer npm package
var inquirer = require("inquirer");
// dependency for inquirer is-letter package
var isLetter = require('is-letter');
var Word = require("./word.js");
//no of chances the player have
var limit = 13; 
function Letter(){

	this.getLetter = function(){
		var newWord = new Word();
		if(newWord.remainingLetters > 0 ){
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
				console.log(answer.letter);
				console.log(newWord.remainingLetters);
				//console.log(limit);
				if(newWord.remainingLetters > 0 && limit >= 1){
					for (var i = 0; i < newWord.randomWord.length; i++) {
						debugger
						if(newWord.randomWord[i] == answer.letter){

							newWord.wordArray[i] = answer.letter;
							console.log(newWord.wordArray.join());
							
						}
					}//end of for
				}//if
				Letter();
			})
		}
		else{

		}
	}
	
}
var obj1 = new Letter();
obj1.getLetter();