const canvas = document.querySelector(".canvas");

const ctx = canvas.getContext("2d");

const WIDTH = 400;
const cantWidth = WIDTH / 10;
const HEIGHT = 560;
const cantHeight = HEIGHT / 14;
let piece = getPieceCurrent();
const board = getArray();
let game = true;

function gameOver() {
    alert("Game over, click for start")
    game= true;
    for (i in board) {
        for (j in board[i]) {
            board[i][j] = 0;
        }
    }
    piece =getPieceCurrent()
}

function update() {
    draw();
    down();
    setTimeout(() => {
        update()
    }, 500)
}
function down() {
    piece.posY++
    let lastRow = piece.array[piece.array.length - 1]
    for (let j = 0; j < lastRow.length; j++) {
        if (lastRow[j] == 1 && (!board[piece.array.length - 1 + piece.posY] || board[piece.array.length - 1 + piece.posY][j + piece.posX] != 0)) {
            piece.posY--;
            for (i in piece.array) {
                for (j in piece.array[i]) {
                    if (piece.array[i][j] == 1) {
                        board[i * 1 + piece.posY][j * 1 + piece.posX] = 1;
                    }
                }
            }
            piece = getPieceCurrent();
            console.log("hola")
            if(!validatePosPiece()){

                game = false;
                gameOver();
            }
            checkRow();

            break;
        }
    }
}
function checkRow() {

    let i = 0;
    while (i < board.length) {
        let j = 0;
        let check = true;
        while (j < board[i].length && check) {
            if (board[i][j] != 1) {
                check = false;
            }
            else
                j++;
        }
        if (check) {
            console.log(board)
            board.splice(i, 1);
            board.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
            console.log(board)
        }
        else {
            i++;
        }
    }
}
update()
addEventListener("keydown", (e) => {
    if (e.key == "ArrowLeft") {
        piece.posX--;
        if (!validatePosPiece()) {
            piece.posX++;
        }

    }
    else if (e.key == "ArrowRight") {
        piece.posX++;
        if (!validatePosPiece()) {
            piece.posX--;
        }
    }
    else if (e.key == "ArrowDown") {
        down()
    }
    else if (e.key == "ArrowUp") {
        rotatePiece()
        if (!validatePosPiece()) {
            rotatePieceInvert()
        }
    }
    draw(board);
})


function rotatePiece() {
    let array = [];
    for (let i = 0; i < piece.array.length; i++) {
        for (let j = 0; j < piece.array[i].length; j++) {
            if (!array[j])
                array[j] = [];
            array[j][piece.array.length - 1 - i] = piece.array[i][j]
        }
    }
    piece.array = array
    console.log(piece)
}
function rotatePieceInvert() {
    let array = [];
    for (let i = 0; i < piece.array.length; i++) {
        for (let j = 0; j < piece.array[i].length; j++) {
            if (!array[piece.array[i].length - 1 - j])
                array[piece.array[i].length - 1 - j] = [];
            array[piece.array[i].length - 1 - j][piece.array.length - 1 - i] = piece.array[i][j]
        }
    }
    piece.array = array
    console.log(piece)
}
function validatePosPiece() {
    for (let i = 0; i < piece.array.length; i++) {
        for (let j = 0; j < piece.array[i].length; j++) {
            if (piece.array[i][j] == 1 && (!board[i + piece.posY] || board[i + piece.posY][j + piece.posX] != 0)) {
                return false
            }
        }
    }
    return true;
}

function getArray() {
    return [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]
}
function getPieceCurrent() {
    let my_array = [
        [
            [1, 1],
            [0, 1],
        ],
        [
            [1],
            [1],
            [1],

        ],
        [
            [0, 0, 0],
            [1, 0, 0],
            [1, 1, 1],
        ],
        [
            [0, 1, 0],
            [1, 1, 1],
        ],
        [
            [1, 1, 0],
            [0, 1, 1],
        ],
        [
            [0, 1, 0],
            [1, 1, 1],
            [0, 1, 0],
        ],

    ];
    return {
        array: my_array[Math.round(Math.random() * (my_array.length - 1))],
        posX: 4,
        posY: 0,

    }
}
function draw() {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] == 1) {
                ctx.fillStyle = "yellow";
            }
            else {
                ctx.fillStyle = "#000";
            }
            ctx.fillRect(j * cantWidth, i * cantHeight, cantWidth, cantHeight)

        }
    }
    try {
        for (let i = 0; i < piece.array.length; i++) {
            for (let j = 0; j < piece.array[i].length; j++) {
                if (piece.array[i][j] == 1) {
                    ctx.fillStyle = "red";
                    ctx.fillRect(j * cantWidth + piece.posX * cantWidth, i * cantHeight + piece.posY * cantHeight, cantWidth, cantHeight)
                }
            }
        }
    } catch (e) {
        console.log(piece)
    }
}

