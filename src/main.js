import "./style.css";
const startBtn = document.querySelector(".start-button");
const valid_choices = ["rock", "paper", "scissors"];
const max_rounds = 5;

let humanScore = 0;
let computerScore = 0;
let isActive = false;

const getComputerChoice = () => valid_choices[Math.floor(Math.random() * valid_choices.length)];

const getHumanChoice = () => {
  let choice = prompt("Rock, paper or scissors?");
  if (choice === null) return "cancel";
  choice = choice.trim().toLowerCase();
  if (choice === "") return "empty";
  return valid_choices.includes(choice) ? choice : "invalid";
};

const playRound = (humanChoice, computerChoice) => {
  console.log(`You chose "${humanChoice}". Computer chose "${computerChoice}".`);

  if (humanChoice === computerChoice) {
    console.log("Draw, try again");
    return;
  }

  const humanWins =
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper");

  if (humanWins) {
    humanScore++;
    console.log(`You win this round. Scores:\nHuman: ${humanScore}\nComputer: ${computerScore}`);
  } else {
    computerScore++;
    console.log(`Computer wins this round. Scores:\nHuman: ${humanScore}\nComputer: ${computerScore}`);
  }
};

const playGame = () => {
  humanScore = 0;
  computerScore = 0;
  isActive = true;

  while (humanScore + computerScore < max_rounds) {
    const humanChoice = getHumanChoice();
    if (humanChoice === "cancel") {
      console.log("Game cancelled.");
      isActive = false;
      return;
    }
    if (humanChoice === "empty" || humanChoice === "invalid") {
      console.log("Invalid input. Try again.");
      continue;
    }
    const computerChoice = getComputerChoice();
    playRound(humanChoice, computerChoice);
  }

  const totalRounds = humanScore + computerScore;
  console.log(`After ${totalRounds} rounds played:`);
  humanScore > computerScore
    ? console.log(`You win, ${humanScore} to ${computerScore}.`)
    : console.log(`Computer wins, ${computerScore} to ${humanScore}-`);
  isActive = false;
};

startBtn.addEventListener("click", () => (!isActive ? playGame() : console.log("Game in progress.")));
