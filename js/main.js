"use strict;";

const domDiff = document.getElementById("domDiff");
const domStart = document.getElementById("domStartGame");
const domGrid = document.getElementById("domGrid");
const domScore = document.getElementById("domScore");
const domPreventClick = document.getElementById("domPreventClick");

domStart.addEventListener("click", startGame);

const levels = [10, 9, 7];

function startGame() {
  resetGame();

  let diff = parseInt(domDiff.value);

  if (!levels.includes(diff)) {
    alert("error");
    return;
  }

  domGrid.classList.add(`grid-cols-${diff}`, `grid-rows-${diff}`);

  const cellsAmount = parseInt(diff * diff);

  let bombs = getBombs(16, cellsAmount);

  for (let i = 1; i <= cellsAmount; i++) {
    const tempBox = document.createElement("div");
    tempBox.classList.add("box");
    tempBox.textContent = [i];
    domGrid.appendChild(tempBox);
  }

  console.log("bombs list:", bombs);

  domGrid.addEventListener("click", (event) => {
    const tempCell = event.target;

    if (!tempCell.classList.contains("box")) {
      return;
    } else if (bombs.includes(parseInt(tempCell.textContent))) {
      gameOver(bombs, cellsAmount);
      bombs = [];
      return;
    }
    if (tempCell.style.backgroundColor === "rgb(96, 167, 144)") {
      return;
    } else {
      tempCell.style.backgroundColor = "rgb(96, 167, 144)";
      domScore.textContent = parseInt(domScore.textContent) + 1;
    }
  });
}

function getBombs(bombsAmount, cellsAmount) {
  const bombs = [];
  while (bombs.length < bombsAmount) {
    const tempNumb = Math.floor(Math.random() * cellsAmount) + 1;
    if (!bombs.includes(tempNumb)) {
      bombs.push(tempNumb);
    }
  }
  return bombs;
}

function resetGame() {
  domGrid.classList.remove("grid-cols-9", "grid-rows-9", "grid-cols-7", "grid-rows-7", "grid-cols-10", "grid-rows-10");
  domGrid.innerHTML = "";
}

function gameOver(bombs, cellsAmount) {
  domPreventClick.classList.remove("hidden");
  const boxesAll = document.querySelectorAll(".box");

  for (let i = 0; i < cellsAmount; i++) {
    if (bombs.includes(parseInt(boxesAll[i].textContent))) {
      const tempBox = boxesAll[i];
      tempBox.classList.add("bg-red-500");
    }
  }

  domStart.disabled = true;

  setTimeout(() => {
    resetGame();
    domGrid.innerHTML = "Game over! You picked the wrong cell...";
    domStart.disabled = false;
    domPreventClick.classList.add("hidden");
    domScore.textContent = 0;
  }, 3500);
}
