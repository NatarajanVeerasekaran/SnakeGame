var initialMatixArr = [];
var initialMatrixObj = {};
var lastMovedIndex = -1;

function init() {
    var counter = -1;
    for (var i = 0; i < 15; i++) {
        var tempArr = [];
        for (var j = 0; j < 15; j++) {
            counter++;
            initialMatrixObj[counter] = i + "," + j;
            tempArr.push(0);
        }
        initialMatixArr.push(tempArr);
    }
}

function bindInitialTable() {
    var tbody = document.getElementById("tableBody");
    var counter = -1;
    for (let index = 0; index < 15; index++) {
        var tr = document.createElement("tr");
        for (let index1 = 0; index1 < 15; index1++) {
            counter++;
            var td = document.createElement("td");
            td.id = "td_" + counter;
            // td.innerText = counter;
            tr.append(td);
        }
        tbody.appendChild(tr);
    }
}

function getRow(index) {
    return parseInt(initialMatrixObj[index].split(',')[0]);
}

function getColumn(index) {
    return parseInt(initialMatrixObj[index].split(',')[1]);
}

function updateMatrix(index) {
    var row = getRow(index);
    var column = getColumn(index);
    initialMatixArr[row][column] = 1;
}

function startGame(callback) {
    setTimeout(() => {
        var randomIndex = randomNumber(0, 15 - 1);
        lastMovedIndex = randomIndex;
        updateMatrix(randomIndex);
        document.getElementById("td_" + randomIndex).style.backgroundColor = "darkred";
        callback.call();
    }, 500);
}

function getIndex(row, column) {
    return (row * 15) + column;
}

function getPossibleMoveElements(index) {
    var tempArr = [];
    var row = getRow(index);
    var column = getColumn(index);
    if (row - 1 >= 0) {
        if (initialMatixArr[row - 1][column] != 1) {
            tempArr.push(getIndex(row - 1, column));
        }
    }
    if (row + 1 < 15) {
        if (initialMatixArr[row + 1][column] != 1) {
            tempArr.push(getIndex(row + 1, column));
        }
    }
    if (column - 1 >= 0) {
        if (initialMatixArr[row][column - 1] != 1) {
            tempArr.push(getIndex(row, column - 1));
        }
    }
    if (column + 1 < 15) {
        if (initialMatixArr[row][column + 1] != 1) {
            tempArr.push(getIndex(row, column + 1));
        }
    }
    return tempArr;
}

function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playGame() {
    setTimeout(() => {
        var freeSpaceArr = getPossibleMoveElements(lastMovedIndex);
        if (freeSpaceArr.length == 0) {
            document.getElementById("THead").style.display = "contents";
        } else {
            var randomIndex = randomNumber(0, freeSpaceArr.length - 1);
            lastMovedIndex = freeSpaceArr[randomIndex];
            updateMatrix(lastMovedIndex);
            document.getElementById("td_" + lastMovedIndex).style.backgroundColor = "darkred";
            playGame()
        }
    }, 500);
}

bindInitialTable();
init();
startGame(playGame);