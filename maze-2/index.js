const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const timerSelector = document.querySelector("#timer");
const cols = 24; // number of col in the maze
const size = parseInt(canvas.width / cols);
console.log(size);
const worldArr = [];

// deactivate keyinput to avoid scroll
window.addEventListener(
  "keydown",
  function (e) {
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  },
  false
);
var sprite;
sprite = new Image();
sprite.src =
  "https://image.ibb.co/dr1HZy/Pf_RWr3_X_Imgur.png" +
  "?" +
  new Date().getTime();
sprite.setAttribute("crossOrigin", " ");

function timer() {
  let currentTime = 60;
  let timerRef = setInterval(() => {
    currentTime = currentTime - 1;
    timerSelector.innerText = currentTime;
    if (currentTime <= 0) {
      clearInterval(timerRef);
      alert("you loose !!!");
      window.location.href = "../loosepage.html";
    }
  }, 1000);
}

const startBtn = document.getElementById("start");
startBtn.addEventListener("click", timer);

function addCssClass() {
  startBtn.classList.add("go");
}

startBtn.addEventListener("click", addCssClass);

//maze array creation

const maze = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1],
  [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1],
  [1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1],
  [1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
  [1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
  [1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
  [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// Push maze in wolrd array with wall and floor prop
maze.forEach((row, rowIndex) => {
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

//set color for wall test

let wallcolor = "green";

//create object player
const player = {
  x: 340,
  y: 0,
  width: size,
  height: size,
  color: "blue",

  moveUp: function () {
    let blocked = false; // define state blocked

    wall.forEach((element) => {
      if (this.y - size === element.y && this.x === element.x) {
        blocked = true;
      }
    });

    if (!blocked) this.y -= size;
  },

  moveDown: function () {
    let blocked = false;

    wall.forEach((element) => {
      if (this.y + size === element.y && this.x === element.x) {
        blocked = true;
      }
    });

    if (!blocked) this.y += size;

    if (this.y === 580 && this.x === 200) {
      alert("you win !!!");
      window.location.href = "../winpage.html";
    }
  },
  moveLeft: function () {
    let blocked = false;

    wall.forEach((element) => {
      if (this.x - size === element.x && this.y === element.y) {
        blocked = true;
      }
    });

    if (!blocked) this.x -= size;
  },
  moveRight: function () {
    let blocked = false;

    wall.forEach((element) => {
      if (this.x + size === element.x && this.y === element.y) {
        blocked = true;
      }
    });

    if (!blocked) this.x += size;
  },
};

console.log(typeof player);
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
console.log(player);
createMaze();

if (startBtn.classList === "go") {
  window.onkeydown = function (e) {
    const key = e.keyCode;

    switch (key) {
      case 38:
        player.moveUp();
        break;
      case 40:
        player.moveDown();
        break;
      case 37:
        player.moveLeft();
        break;
      case 39:
        player.moveRight();
        break;
    }

    createMaze();
  };
}
