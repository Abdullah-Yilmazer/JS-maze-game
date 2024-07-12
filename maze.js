let mazeContainer = document.getElementById("maze-container");
let sizeInput = document.getElementById("size");
let generateButton = document.getElementById("generate");
let solveButton = document.getElementById("solve");

let size = parseInt(sizeInput.value);
let maze = generateMaze(size);
let playerPosition = { x: 0, y: 0 };
renderMaze(maze);

generateButton.addEventListener("click", () => {
  size = parseInt(sizeInput.value);
  maze = generateMaze(size);
  playerPosition = { x: 0, y: 0 };
  renderMaze(maze);
});

solveButton.addEventListener("click", () => {
  const solution = solveMaze(maze, size);
  animateSolution(solution);
});

document.addEventListener("keydown", movePlayer);

function generateMaze(size) {
  const maze = Array.from({ length: size }, () => Array(size).fill(15)); // 15: all walls (1111 in binary)
  const visited = Array.from({ length: size }, () => Array(size).fill(false));
  const stack = [{ x: 0, y: 0 }];
  visited[0][0] = true;

  while (stack.length) {
    const { x, y } = stack[stack.length - 1];
    const directions = shuffle([
      { x: x - 1, y: y, direction: "left" },
      { x: x + 1, y: y, direction: "right" },
      { x: x, y: y - 1, direction: "up" },
      { x: x, y: y + 1, direction: "down" },
    ]);

    let moved = false;
    for (const { x: nx, y: ny, direction } of directions) {
      if (nx >= 0 && ny >= 0 && nx < size && ny < size && !visited[ny][nx]) {
        visited[ny][nx] = true;
        stack.push({ x: nx, y: ny });
        moved = true;

        // Remove walls
        if (direction === "left") {
          maze[y][x] &= ~1; // Remove left wall of current cell
          maze[ny][nx] &= ~4; // Remove right wall of next cell
        } else if (direction === "right") {
          maze[y][x] &= ~4; // Remove right wall of current cell
          maze[ny][nx] &= ~1; // Remove left wall of next cell
        } else if (direction === "up") {
          maze[y][x] &= ~2; // Remove top wall of current cell
          maze[ny][nx] &= ~8; // Remove bottom wall of next cell
        } else if (direction === "down") {
          maze[y][x] &= ~8; // Remove bottom wall of current cell
          maze[ny][nx] &= ~2; // Remove top wall of next cell
        }
        break;
      }
    }
    if (!moved) {
      stack.pop();
    }
  }

  return maze;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function renderMaze(maze, solution = []) {
  mazeContainer.innerHTML = "";
  mazeContainer.style.gridTemplateColumns = `repeat(${size}, 20px)`;
  mazeContainer.style.gridTemplateRows = `repeat(${size}, 20px)`;

  maze.forEach((row, y) => {
    row.forEach((cell, x) => {
      const div = document.createElement("div");
      div.classList.add("cell");
      if (x === 0 && y === 0) div.classList.add("start");
      if (x === size - 1 && y === size - 1) div.classList.add("end");
      if (x === playerPosition.x && y === playerPosition.y) div.classList.add("player");
      if (solution.some((pos) => pos.x === x && pos.y === y)) div.classList.add("solution");

      if (cell & 1) div.classList.add("left");
      if (cell & 2) div.classList.add("top");
      if (cell & 4) div.classList.add("right");
      if (cell & 8) div.classList.add("bottom");
      mazeContainer.appendChild(div);
    });
  });
}

function movePlayer(event) {
  const key = event.key;
  const { x, y } = playerPosition;

  let newX = x,
    newY = y;

  if ((key === "ArrowUp" || key === "w") && y > 0 && !(maze[y][x] & 2)) newY--;
  else if ((key === "ArrowDown" || key === "s") && y < size - 1 && !(maze[y][x] & 8)) newY++;
  else if ((key === "ArrowLeft" || key === "a") && x > 0 && !(maze[y][x] & 1)) newX--;
  else if ((key === "ArrowRight" || key === "d") && x < size - 1 && !(maze[y][x] & 4)) newX++;

  if (newX !== x || newY !== y) {
    playerPosition = { x: newX, y: newY };
    renderMaze(maze);
  }

  if (playerPosition.x === size - 1 && playerPosition.y === size - 1) {
    alert("Tebrikler! Labirenti çözdünüz.");
  }
}

function solveMaze(maze, size) {
  const directions = [
    { x: 0, y: -1 }, // up
    { x: 1, y: 0 }, // right
    { x: 0, y: 1 }, // down
    { x: -1, y: 0 }, // left
  ];

  const stack = [{ x: 0, y: 0, path: [{ x: 0, y: 0 }] }];
  const visited = Array.from({ length: size }, () => Array(size).fill(false));
  visited[0][0] = true;

  while (stack.length) {
    const { x, y, path } = stack.pop();

    if (x === size - 1 && y === size - 1) {
      return path;
    }

    for (const { x: dx, y: dy } of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx >= 0 && ny >= 0 && nx < size && ny < size && !visited[ny][nx]) {
        const currentCell = maze[y][x];
        const nextCell = maze[ny][nx];

        if (
          (dx === -1 && !(currentCell & 1) && !(nextCell & 4)) ||
          (dx === 1 && !(currentCell & 4) && !(nextCell & 1)) ||
          (dy === -1 && !(currentCell & 2) && !(nextCell & 8)) ||
          (dy === 1 && !(currentCell & 8) && !(nextCell & 2))
        ) {
          visited[ny][nx] = true;
          stack.push({ x: nx, y: ny, path: [...path, { x: nx, y: ny }] });
        }
      }
    }
  }

  return [];
}

function animateSolution(solution) {
  let i = 0;
  function animateStep() {
    if (i < solution.length) {
      const { x, y } = solution[i];
      const cell = mazeContainer.children[y * size + x];
      cell.classList.add("solution");
      i++;
      setTimeout(animateStep, 20);
    }
  }
  animateStep();
}
