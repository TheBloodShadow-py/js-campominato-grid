"use strict;";

const domDiff = document.getElementById("domDiff");
const domStart = document.getElementById("domStartGame");
const domGrid = document.getElementById("domGrid");

domStart.addEventListener("click", startGame);

const levels = [10, 9, 7];

function startGame() {
  resetGame();

  let diff = parseInt(domDiff.value);

  if (!levels.includes(diff)) {
    alert("error");
    return;
  }

  domGrid.classList.remove("grid-cols-9", "grid-rows-9", "grid-cols-7", "grid-rows-7", "grid-cols-10", "grid-rows-10");

  domGrid.classList.add(`grid-cols-${diff}`, `grid-rows-${diff}`);

  for (let i = 1; i <= diff * diff; i++) {
    const tempBox = document.createElement("div");
    tempBox.classList.add("box");
    tempBox.innerHTML = [i];
    domGrid.appendChild(tempBox);
  }
  const domBoxes = document.querySelectorAll(".box");
  for (let i = 0; i < domBoxes.length; i++) {
    domBoxes[i].addEventListener("click", selectCell);
  }
}

function resetGame() {
  domGrid.innerHTML = "";
}

function selectCell() {
  this.style.backgroundColor = "rgb(96, 167, 144)";
  console.log(this);
}
