import './style.css';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const BLOCK_SIZE = 20;
const BOARD_WIDTH = 14;
const BOARD_HEIGHT = 30;

const board = initialBoard();

const piece = {
  position: {x:5, y:5},
  shape: [
    [1, 1],
    [1, 1]
  ],
}

canvas.width = BLOCK_SIZE * BOARD_WIDTH;
canvas.height = BLOCK_SIZE * BOARD_HEIGHT;

context.scale(BLOCK_SIZE, BLOCK_SIZE);

// 2. Game loop
function update() {
  draw();
  window.requestAnimationFrame(update)
}

function draw() {
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);

  board.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        context.fillStyle = '#FF0';
        context.fillRect(x, y, 1, 1);
      }
    })
  });

  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        context.fillStyle = '#F00';
        context.fillRect(x + piece.position.x, y + piece.position.y, 1, 1);
      }
    })
  });

}

document.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') {
    piece.position.x--;
    if (checkCollision()) piece.position.x++;
  }
  if (event.key === 'ArrowRight') {
    piece.position.x++;
    if (checkCollision()) piece.position.x--;
  }
  if (event.key === 'ArrowDown') {
    piece.position.y++;
    if (checkCollision()){
      piece.position.y--;
      solidifyPiece();
      removeRows();
    }
  }
})

update();

// 3. Board
function initialBoard() {
  let newBoard = [];
  const cols = [];

  for (let i = 0; i < BOARD_WIDTH; i++) {
    cols.push(0);
  }
  
  for (let i = 0; i < BOARD_HEIGHT; i++) {
    if(i === BOARD_HEIGHT-1){
      newBoard.push([1,1,1,1,1,1,1,1,1,1,0,0,1,1]);
    } else {
      newBoard.push(cols);
    }
  }
  
  return newBoard;
}

// 4. Collision
function checkCollision() {
  return piece.shape.find((row, y) => {
    return row.find((value, x) => {
      
      return (
        value !== 0 
        && board[y + piece.position.y]?.[x + piece.position.x] !== 0
      )

    })
  });
}

//5. Solidificar figura
function solidifyPiece() {
  piece.shape.forEach((row, x) => {
    row.forEach((value, y) => {
      if (value === 1) {
        board[y + piece.position.y][x + piece.position.x] = 1;
      }
    })
  });

  piece.position.x = 0;
  piece.position.y = 0;
}

// 6. Eliminar linea
function removeRows() {
  const rowsToRemove = [];

  board.forEach((row, y) => {
    if(row.every(value => value ===1)){
      rowsToRemove.push(y);
    }
  });

  rowsToRemove.forEach(y => {
    board.splice(y,1);
    const newRows = Array(BOARD_WIDTH).fill(0);
    board.unshift(newRows);
  });
}