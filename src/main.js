import "./style.css";
import confetti from "https://esm.sh/canvas-confetti@1.6.0";
import { fadeOut, fadeIn } from "./fade";

const startBtn = document.querySelector(".start-button");
const cancelBtn = document.querySelector(".cancel-button");
const gameButtons = document.querySelectorAll(".game-buttons");
const buttonGroup = document.querySelector(".button-group");
const resultsDiv = document.querySelector(".results");
const humanScoreDiv = document.querySelector("#human-score-div");
const roundDiv = document.querySelector("#round-div");
const computerScoreDiv = document.querySelector("#computer-score-div");
const gameContainer = document.querySelector(".game-container");
gameContainer.style.opacity = 0;

const VALID_CHOICES = ["rock", "paper", "scissors"];

let humanScore = 0;
let computerScore = 0;
let isActive = false;
let round = 0;

const getComputerChoice = () => VALID_CHOICES[Math.floor(Math.random() * VALID_CHOICES.length)];

const getHumanChoice = () => {
  return new Promise(resolve => {
    gameButtons.forEach(btn => btn.addEventListener("click", e => resolve(e.target.value), { once: true }));
    cancelBtn.addEventListener("click", e => resolve(e.target.value), { once: true });
  });
};

const handleCancelGame = () => new Promise(resolve => cancelBtn.addEventListener("click", e => resolve(e.target.value), { once: true }));

const playRound = (humanChoice, computerChoice) => {
  let outcomeMsg = "";

  if (humanChoice === computerChoice) outcomeMsg = "Draw, try again";
  else {
    const humanWinMsg = `You win this round.`;
    const computerWinMsg = `Computer wins this round.`;
    const humanWins =
      (humanChoice === "rock" && computerChoice === "scissors") ||
      (humanChoice === "paper" && computerChoice === "rock") ||
      (humanChoice === "scissors" && computerChoice === "paper");

    if (humanWins) {
      humanScoreDiv.textContent = ++humanScore;
      outcomeMsg = humanWinMsg;
    } else {
      computerScoreDiv.textContent = ++computerScore;
      outcomeMsg = computerWinMsg;
    }
  }

  const roundLog = `<div id="innerResultsDiv">
    <p>You chose <span class="heavy">${humanChoice}.</span></p>
    <p>Computer chose <span class="heavy">${computerChoice}.</span></p>
    <h3>${outcomeMsg}</h3>
  </div>`;
  resultsDiv.insertAdjacentHTML("beforeend", roundLog);
};

const whenGameStart = () => {
  humanScore = 0;
  humanScoreDiv.textContent = 0;
  computerScore = 0;
  computerScoreDiv.textContent = 0;
  isActive = true;
  round = 1;
  roundDiv.textContent = 1;
  startBtn.classList.remove("active");
  buttonGroup.classList.add("active");
  cancelBtn.classList.add("active");
  cancelBtn.textContent = "Cancel game";
  fadeIn(gameContainer);
};

const whenGameOver = () => {
  isActive = false;
  startBtn.textContent = "Start";
  buttonGroup.classList.remove("active");
};

const playGame = async () => {
  whenGameStart();
  resultsDiv.insertAdjacentHTML("beforeend", `<div id="innerResultsDiv"><h2>Game started.</h2><h3>Round ${round}</h3><p>Make your choice</p></div>`);

  while (isActive) {
    resultsDiv.scrollTop = resultsDiv.scrollHeight;
    const humanChoice = await getHumanChoice();
    if (humanChoice === "cancel") {
      isActive = false;
      break;
    }
    const computerChoice = getComputerChoice();
    playRound(humanChoice, computerChoice);
    roundDiv.textContent = ++round;
    if (humanScore === 5 || computerScore === 5) isActive = false;
  }

  whenGameOver();

  if (humanScore === 5 || computerScore === 5) {
    const humanIsWinner = humanScore > computerScore;
    const humanWinMsg = "You won!";
    const computerWinMsg = "Computer won. Better luck next time.";

    const gameEndMsg = `<div id="innerResultsDiv">
      <h2>${humanIsWinner ? humanWinMsg : computerWinMsg}</h2>
      <p>Final score: Human: ${humanScore}. Computer: ${computerScore}.</p>
      <p>Game over</p>
      </div>`;
    resultsDiv.insertAdjacentHTML("beforeend", gameEndMsg);
    resultsDiv.scrollTop = resultsDiv.scrollHeight;
    humanIsWinner && confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
  } else {
    resultsDiv.insertAdjacentHTML("beforeend", `<div id="innerResultsDiv"><h3>Game cancelled.</h3></div>`);
    resultsDiv.scrollTop = resultsDiv.scrollHeight;
  }
  cancelBtn.textContent = "Reset";

  const cancel = await handleCancelGame();
  if (cancel === "cancel") {
    startBtn.classList.add("active");
    cancelBtn.classList.remove("active");
    fadeOut(gameContainer);
  }
};

startBtn.addEventListener("click", playGame);
