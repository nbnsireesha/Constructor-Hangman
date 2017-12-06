var remainingLetters = "";
var randomWord = "";
function Word(){
	this.wordArray = [];
	var words = ["dog","monkey","cat","cow","horse", "blistex","fight", "orange", "birthday", "dance", "song", "country"];
	this.randomWordGen = function(){
		this.randomWord = words[Math.floor(Math.random() * words.length)];
		this.remainingLetters = this.randomWord.length;
		//debugger
		for (var i = 0; i < this.randomWord.length; i++) {
			this.wordArray[i] = "_ ";
		}
		//console.log(this.randomWord);
		return this.wordArray.join("");
	}
	this.wordWithDah = this.randomWordGen();
	console.log(this.wordWithDah);
}
//
module.exports = Word;

