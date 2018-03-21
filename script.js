const numberClasses = ['NotAnActualClass','one', 'two', 'three','four','five','six','seven','eight', 'nine]']
const board = document.getElementById('board');
var mineBoard = {

  // user inputs
  numberOfMines: () => Number(document.getElementById("userMine").value),
  heightOfBoard: () => Number(document.getElementById("userRow").value), 
  widthOfBoard: () => Number(document.getElementById("userCol").value),

  create: (event) => { //makes the board based on user inputs for row and column.
    mineBoard.timer();
    for (var x = 0; x < mineBoard.widthOfBoard(); x++) {
      var row = document.createElement('div');
      row.className = 'row';
      board.appendChild(row);
      for (var y = 0; y < mineBoard.heightOfBoard(); y++) {
        var cell = document.createElement('div');
        cell.className = 'unclicked cell';
        cell.setAttribute('id',String(x) + String(y));
        row.appendChild(cell);
      }
    }
    mineBoard.placeMines();
    mineBoard.checkNeighbors(event);
    
  },

  placeMines: () => { //Place mines randomly throughout board, hidden until clicked.
    let cellsToPlaceMines = document.getElementsByClassName('cell');
    // Randomly generating nums to place mines
    let i = 0;
    while (i < mineBoard.numberOfMines()) {
      randomCellNum = Number(Math.floor(Math.random() * cellsToPlaceMines.length));
      let newMine = document.createElement('div');
      newMine.setAttribute('id', 'bomb')
      newMine.className = 'unclicked mine';

      let isCellEmpty = cellsToPlaceMines[randomCellNum].hasChildNodes();

      if (isCellEmpty) {
        continue;
      } else {
        cellsToPlaceMines[randomCellNum].appendChild(newMine);
        i += 1;
      }
    }
  },

  checkNeighbors: (event) => {
    let cell = event.target;
    let currentCol = Number(cell.id[0]);
    let currentRow = Number(cell.id[1]);

    let neighbors = [
      [currentCol - 1, currentRow], //up
      [currentCol + 1, currentRow], //down
      [currentCol, currentRow - 1], //left
      [currentCol, currentRow + 1], //right
      [currentCol + 1, currentRow + 1], //diag 
      [currentCol - 1, currentRow - 1], //diag 
      [currentCol + 1, currentRow - 1], //diag
      [currentCol - 1, currentRow + 1], //diag
    ];

    var bombCount=0;

    for (let i = 0; i < neighbors.length; i++) {
      let nextRow = neighbors[i][0];
      let nextCol = neighbors[i][1];
      let currentCell = document.getElementById(String(nextRow) + String(nextCol));
      console.log(currentCell);
      if (currentCell && currentCell.hasChildNodes()) { 
        bombCount++; //cycle through classes array, put a number in the clicked cell based on mines in neighboring cells
      }
    } cell.classList.add(numberClasses[bombCount]);
    mineBoard.fill(currentCol,currentRow,event);
  },

fill: (Col, Row, event) => {
  var queue = [];
  queue.push(Row, Col);
    
  while (typeof queue !== 'undefined' && queue.length !== 0) {
    let Col = Number(queue.shift()); 
    let Row = Number(queue.shift());

    let neighbors = [
      [Col - 1, Row], //up
      [Col + 1, Row], //down
      [Col, Row - 1], //left
      [Col, Row + 1], //right
      [Col + 1, Row + 1], //diag upright
      [Col - 1, Row - 1], //diag downleft
      [Col + 1, Row - 1], //diag downright
      [Col - 1, Row + 1], //diag upleft
    ];
    for (i = 0; i < neighbors.length; i++) {
      let nextRow = neighbors[i][0];
      let nextCol = neighbors[i][1];
      let next = this.grid[nextRow][nextCol];
    }
  }
},




  handleEvent: function(event) {
    let cell = event.target;
    let divs = document.getElementsByClassName('cell');
    if (cell.classList.contains("mine")) {
      cell.classList.remove("unclicked"); //when you click a square, the 'film' will disapear, exposing the block.
      alert('You have exploded');
    } else {
      cell.className = ('cell');
    }

  },

  timer: function() { //timer counting up starting when the board is drawn.
    var minutesLabel = document.getElementById("minutes");
    var secondsLabel = document.getElementById("seconds");
    var totalSeconds = 0;
    setInterval(setTime, 1000);

    function setTime() {
      ++totalSeconds;
      secondsLabel.innerHTML = pad(totalSeconds % 60);
      minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
    }

    function pad(val) {
      var valString = val + "";
      if (valString.length < 2) {
        return "0" + valString;
      } else {
        return valString;
      }
    }
  },
}

board.addEventListener("click", mineBoard, false);
var makeGame = document.getElementById("drawButton");
makeGame.addEventListener("click", mineBoard.create, false);
board.addEventListener("click", mineBoard.checkNeighbors, false);
board.addEventListener("click", mineBoard.fill, false);
