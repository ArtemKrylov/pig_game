"use strict";

const playThePigGame = function () {
  //Variables

  const newGameBtn = document.querySelector(".newGameBtn");
  const holdBtn = document.querySelector(".holdBtn");
  const rollDiceBtn = document.querySelector(".rollDiceBtn");
  const gameContainer = document.querySelector(".game_container");
  let resultScores = document.querySelectorAll(".player_resultScore");
  let currentScores = document.querySelectorAll(".currentScore");
  const diceDisplay = document.querySelector(".diceDisplay");
  const diceDisplayDots = document.querySelectorAll(".diceDisplay_dot");
  let players = document.querySelectorAll(".player");
  let playerNames = document.querySelectorAll(".player_name");
  const winnerTables = document.querySelectorAll(".winner_table");
  let activePlayerIndex = 0;
  let playerResultScores = [0, 0];
  let playerCurrentScores = [0, 0];
  const winScore = 100;

  //Event listeners

  //Roll the dice
  rollDiceBtn.addEventListener("click", () => {
    showDiceDisplay();
    const diceRollResult = rollDice();
    showDiceRollResult(diceRollResult);
    console.log("---------------");
    console.log("Active player index: ", activePlayerIndex);
    console.log("Dice rolled: ", diceRollResult);
    if (diceRollResult === 1) {
      zeroCurrentScore(activePlayerIndex);
      changePlayer();
    } else {
      playerCurrentScores[activePlayerIndex] += diceRollResult;
      currentScores[activePlayerIndex].textContent =
        playerCurrentScores[activePlayerIndex];
    }
  });

  //Start a new game
  newGameBtn.addEventListener("click", () => {
    hideWinner();
    setPlayerNames();
    showButtons();
    console.log("New Game");
    hideDiceDisplay();
    zeroScores(0, 1);
    if (activePlayerIndex) {
      changePlayer();
    }
  });

  //Hold the score - add current score to result score
  holdBtn.addEventListener("click", () => {
    playerResultScores[activePlayerIndex] +=
      playerCurrentScores[activePlayerIndex];
    resultScores[activePlayerIndex].textContent =
      playerResultScores[activePlayerIndex];
    zeroCurrentScore(activePlayerIndex);
    //WIN
    if (playerResultScores[activePlayerIndex] >= winScore) {
      winTheGame(activePlayerIndex);
      return;
    }
    changePlayer();
  });

  //Functions

  function rollDice() {
    return Math.trunc(Math.random() * 6 + 1);
  }

  function showDiceDisplay() {
    if (diceDisplay.classList.contains("hidden")) {
      diceDisplay.classList.remove("hidden");
    }
  }

  function hideDiceDisplay() {
    diceDisplay.classList.add("hidden");
  }

  function changePlayer() {
    players[activePlayerIndex].classList.remove("activePlayer");
    activePlayerIndex = Number(!activePlayerIndex);
    players[activePlayerIndex].classList.add("activePlayer");
  }

  function zeroScores(...playerIndexes) {
    for (let playerIndex of playerIndexes) {
      zeroCurrentScore(playerIndex);
      zeroResultScore(playerIndex);
    }
  }

  function zeroCurrentScore(playerIndex) {
    playerCurrentScores[playerIndex] = 0;
    currentScores[playerIndex].textContent = 0;
  }

  function zeroResultScore(playerIndex) {
    playerResultScores[playerIndex] = 0;
    resultScores[playerIndex].textContent = 0;
  }

  function showDiceRollResult(diceRollResult) {
    hideDiceDots();
    switch (diceRollResult) {
      case 1:
        diceDisplayDots[3].classList.remove("hidden");
        break;
      case 2:
        diceDisplayDots[0].classList.remove("hidden");
        diceDisplayDots[6].classList.remove("hidden");
        break;
      case 3:
        diceDisplayDots[0].classList.remove("hidden");
        diceDisplayDots[3].classList.remove("hidden");
        diceDisplayDots[6].classList.remove("hidden");
        break;
      case 4:
        diceDisplayDots[0].classList.remove("hidden");
        diceDisplayDots[1].classList.remove("hidden");
        diceDisplayDots[5].classList.remove("hidden");
        diceDisplayDots[6].classList.remove("hidden");
        break;
      case 5:
        diceDisplayDots[0].classList.remove("hidden");
        diceDisplayDots[1].classList.remove("hidden");
        diceDisplayDots[3].classList.remove("hidden");
        diceDisplayDots[5].classList.remove("hidden");
        diceDisplayDots[6].classList.remove("hidden");
        break;
      case 6:
        diceDisplayDots[0].classList.remove("hidden");
        diceDisplayDots[1].classList.remove("hidden");
        diceDisplayDots[2].classList.remove("hidden");
        diceDisplayDots[4].classList.remove("hidden");
        diceDisplayDots[5].classList.remove("hidden");
        diceDisplayDots[6].classList.remove("hidden");
        break;
    }
  }

  function hideDiceDots() {
    console.log("Hide dots function");
    for (let diceDisplayDot of diceDisplayDots) {
      diceDisplayDot.classList.add("hidden");
    }
  }

  function showButtons() {
    holdBtn.classList.remove("hidden");
    rollDiceBtn.classList.remove("hidden");
  }

  function hideButtons() {
    holdBtn.classList.add("hidden");
    rollDiceBtn.classList.add("hidden");
  }

  function setPlayerNames() {
    playerNames.forEach((name, i) => {
      name.textContent = `PLAYER ${i + 1}`;
    });
  }

  function winTheGame(activePlayerIndex) {
    console.log("win start");
    showWinnerTable(activePlayerIndex);
    console.log("win end");
    players[activePlayerIndex].classList.add("winner");
    hideButtons();
    hideDiceDisplay();
  }

  function hideWinner() {
    players.forEach((player) => {
      if (player.classList.contains("winner")) {
        player.classList.remove("winner");
      }
    });
    winnerTables.forEach((table) => {
      if (!table.classList.contains("hidden")) {
        table.classList.add("hidden");
      }
    });
  }

  function showWinnerTable(activePlayerIndex) {
    console.log("show winner table");
    winnerTables[activePlayerIndex].classList.remove("hidden");
  }
};

playThePigGame();
