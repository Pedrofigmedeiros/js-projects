// Load the score from localStorage or initialize it
// Algorithm:
// - User chooses one button (rock, paper or scissors)
// - Computer randomly selects one number that is correlated to rock, paper or scissors
// - Compare the results
// - Display the result and the score into a popup
// - Update the score
// -->

const score = JSON.parse(localStorage.getItem('score'));

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (isAutoPlaying === false) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 500);
    isAutoPlaying = true;
    document.querySelector('.js-auto-button').innerHTML = 'Stop Playing';
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.js-auto-button').innerHTML = 'Auto Play';
  }
}

document.querySelector('.js-auto-button')
  .addEventListener('click', () => {
    autoPlay();
});

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p') {
    playGame('paper')
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'a') {
    autoPlay();
  } else if (event.key === 'Backspace') {
    resetScore();
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }

  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You lose.";
    }
    
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else if (computerMove === "scissors") {
      result = "You win.";
    }
  }

  if (result === "Tie.") {
    score.ties++;
  } else if (result === "You lose.") {
    score.losses++;
  } else if (result === "You win.") {
    score.wins++;
  }

  // Save the updated score to localStorage
  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.js-moves')
    .innerHTML = `You choose<img src="images/${playerMove}-emoji.png" class="move-icon">
        <img src="images/${computerMove}-emoji.png" class="move-icon">
        Computer choosed`

  document.querySelector('.js-result')
  .innerHTML = result;

  updateScoreElement();
}

function updateScoreElement () {
  document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}. Losses: ${score.losses}. Ties: ${score.ties}.`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  if (randomNumber < 1 / 3) {
    return "rock";
  } else if (randomNumber < 2 / 3) {
    return "paper";
  } else {
    return "scissors";
  }
}

document.querySelector('.js-reset-button')
  .addEventListener('click', () => {
    alertReset();
    //resetScore();
  });

function alertReset(){
  const html = `
    <p class="js-confirm-message">Are you sure you want to reset the score?</p>
    <button class="js-yes-button">Yes</button>
    <button class="js-no-button">No</button>
    `;
    document.querySelector('.js-confirmation-message').innerHTML = html;

    document.querySelector('.js-yes-button')
      .addEventListener('click', () => {
        resetScore();
        document.querySelector('.js-confirmation-message').innerHTML = '';
      });
    
    document.querySelector('.js-no-button')
      .addEventListener('click', () => {
      document.querySelector('.js-confirmation-message').innerHTML = '';
      });
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();
}

// user press the button
// computer displays a message and two buttons (confirm or deny)
// if the person chooses confirm ---> reset the score
// else ----> close the message