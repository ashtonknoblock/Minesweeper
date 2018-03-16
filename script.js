const board = document.getElementById('board');


var mineBoard = {

    // user inputs
    numberOfMines: () => Number(document.getElementById("userMine").value),
    heightOfBoard: () => Number(document.getElementById("userCol").value),
    widthOfBoard: () => Number(document.getElementById("userRow").value),
    // Functions
    create: function (event) { //makes the board based on user inputs for row and column.
        mineBoard.timer();
        for (let i = 0; i < mineBoard.widthOfBoard(); i++) {
            var row = document.createElement('div');
            row.className = 'row';
            board.appendChild(row);
            for (let l = 0; l < mineBoard.heightOfBoard(); l++) {
                var cell = document.createElement('div');
                cell.className = 'unclicked cell';
                cell.setAttribute('id', 'Cell' + i + l);
                row.appendChild(cell);
            };
        };
        mineBoard.placeMines();
        cell.ondblclick = mineBoard.placeFlag;
    },

    placeMines: function () { //Place mines randomly throughout board, hidden until clicked.
        let cellsToPlaceMines = document.getElementsByClassName('cell');
        // Randomly generating nums to place mines
        let i = 0;
        while (i < this.numberOfMines()) {
            randomCellNum = Number(Math.floor(Math.random() * cellsToPlaceMines.length));
            let newMine = document.createElement('div');
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

    placeFlag: function (event) {
        let cell = event.target;
        if (cell.className.contains("cell")) {
            cell.classList.add("flag")
        }
    },

    handleEvent: function (event) { //when you click a square, the 'film' will disapear, exposing the block.
        let cell = event.target;
        let divs = document.getElementsByClassName('cell');
        if (cell.classList.contains("mine")) {
            cell.classList.remove("unclicked");
            alert('You sploded\'');
        } else {
            cell.className = ('cell');
        }
    },
    
     timer: function () { //timer counting up starting when the board is drawn.
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
        };
    }
}

// mineBoard.create();

board.addEventListener("click", mineBoard, false);
var makeGame = document.getElementById("drawButton");
makeGame.addEventListener("click", mineBoard.create, false);





