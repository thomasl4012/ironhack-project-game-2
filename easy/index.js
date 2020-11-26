import { maze1 } from "../maze/maze.js";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const timerSelector = document.querySelector("#timer");
const cols = maze1[0].length; // number of col in the maze
const scoreSelector = document.querySelector("#score");
const size = parseInt(canvas.width / cols);

const worldArr = [];
let fired = false;
console.log(maze1);

//set color for wall

let wallcolor = "green";

// deactivate keyinput to avoid scroll when player moves
window.addEventListener(
  "keydown",
  function (e) {
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  },
  false
);

//Timer function
function timer() {
  let currentTime = 30;
  let timerRef = setInterval(() => {
    currentTime = currentTime - 1;
    let scoreFinal = 0;
    timerSelector.innerText = currentTime;
    scoreFinal = currentTime * 10 * 2;
    scoreSelector.innerText = scoreFinal;
    let scoreSave = 0;
    scoreSave = sessionStorage.setItem("score", scoreFinal);

    if (currentTime <= 0) {
      clearInterval(timerRef);
      alert("you loose !!!");
      window.location.href = "../loosepage.html";
    }
    return scoreFinal;
  }, 1000);
}

//const startBtn = document.getElementById("start");
//startBtn.addEventListener("click", timer);

//maze array creation

// Push maze in wolrd array with wall and floor prop
maze1.forEach((row, rowIndex) => {
  row.forEach((col, colIndex) => {
    worldArr.push({
      prop: col === 1 ? "wall" : "floor",
      x: colIndex * size,
      y: rowIndex * size,

      width: size,
      height: size,
    });
  });
});

// Get all floors
const floors = worldArr.filter((element) => element.prop === "floor");
// Get all walls
const wall = worldArr.filter((element) => element.prop === "wall");

//set color for player test
let gradient = ctx.createLinearGradient(0, 23, 32, 170);
gradient.addColorStop(0, "pink");
gradient.addColorStop(1, "blue");

//create object player
const player = {
  // starting position
  x: 340,
  y: 0,
  width: size,
  height: size,
  color: gradient,

  up: function () {
    let blocked = false; // define state blocked

    wall.forEach((element) => {
      if (this.y - size === element.y && this.x === element.x) {
        blocked = true;
      }
    });

    if (!blocked) this.y -= size;
  },

  down: function () {
    let blocked = false;

    wall.forEach((element) => {
      if (this.y + size === element.y && this.x === element.x) {
        blocked = true;
      }
    });

    if (!blocked) this.y += size;

    if (this.y === 580 && this.x === 200) {
      alert(`you win !!!`);
      window.location.href = "../winpage.html";
    }
  },
  left: function () {
    let blocked = false;

    wall.forEach((element) => {
      if (this.x - size === element.x && this.y === element.y) {
        blocked = true;
      }
    });

    if (!blocked) this.x -= size;
  },
  right: function () {
    let blocked = false;

    wall.forEach((element) => {
      if (this.x + size === element.x && this.y === element.y) {
        blocked = true;
      }
    });

    if (!blocked) this.x += size;
  },
};

const createMaze = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = wallcolor;
  wall.forEach((element) => {
    ctx.fillRect(
      element.x - 2,
      element.y - 2,
      element.width - 2,
      element.height - 2
    );
  });

  floors.forEach((element) => {
    ctx.rect(element.x, element.y, element.width, element.height);
  });

  ctx.save();
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x - 2, player.y - 2, player.width - 2, player.height - 2);
  ctx.restore();
};

createMaze();

window.onkeydown = function (e) {
  const key = e.keyCode;

  switch (key) {
    case 38:
      player.up();
      break;
    case 40:
      player.down();
      break;
    case 37:
      player.left();
      break;
    case 39:
      player.right();
      break;
  }
  if (fired === false) {
    fired = true;
    timer();
  }

  createMaze();
};
