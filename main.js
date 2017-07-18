var questionsB = require("./questionsBasic.json");
var questionsC = require("./questionsCloze.json");
var ClozeCard = require("./ClozeCard.js");
var BasicCard = require("./BasicCard.js");
var inquirer = require("inquirer");

var arrayBasic = [];
var arrayCloze = [];

var count = 0;
var score = 0;

function userChoice() {
	inquirer.prompt([
		{
			type: "list",
			name: "answer",
			message: "Please choose: [BASIC] or [CLOZE] for flashcard quiz.",
			choices: ["BASIC", "CLOZE"]
		}
	]).then(function (chose) {
		if (chose.answer === "BASIC") {
			questionsB.forEach(function(pick) {
				arrayBasic.push(BasicCard(pick.front, pick.back));
			});
			basicQuiz();
		} 

		else if (chose.answer === "CLOZE") {
			questionsC.forEach(function(pick) {
				arrayCloze.push(ClozeCard(pick.text, pick.cloze));
			});
			clozeQuiz();
		}
	})
}

function basicQuiz() {
	if (count < arrayBasic.length) {
		inquirer.prompt([
			{
				type: "input",
				name: "answer",
				message: arrayBasic[count].front,
			}
		]).then(function(answers) {
			if (answers.answer.toLowerCase() === arrayBasic[count].back.toLowerCase()) {
				console.log("Good Job!")
				score++;
			} 

			else {
				console.log("Nope! The right answer is " + arrayBasic[count].back)
			}
			count++;
			basicQuiz();
		})
	}

	else {
		redoQuiz();
	}
}

function clozeQuiz() {
	if (count < arrayCloze.length) {
		inquirer.prompt([
			{
				type: "input",
				name: "answer",
				message: arrayCloze[count].partial
			}
		]).then(function(answers) {
			if (answers.answer.toLowerCase() === arrayCloze[count].cloze.toLowerCase()) {
				console.log("Good Job!");
				score++;
			}

			else {
				console.log("Nope! The right answer is " + arrayCloze[count.cloze]);
			}
			count++;
			clozeQuiz();
		})
	}

	else {
		redoQuiz(); 
	}
}

function redoQuiz() {
	var totalScore = "You got " + score + " correct."

	console.log(totalScore);
	inquirer.prompt([
		{
			type: "confirm",
			name: "confirm",
			message: "Wanna play again?",
		}
	]).then(function(answers) {
		if (answers.confirm) {
			count = 0;
			score = 0;
			userChoice()
		}

		else {
			console.log("GG")
		}
	});
}

userChoice();