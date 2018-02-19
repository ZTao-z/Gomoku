//alert("this is ai");
const Constants = {
    ChessBoard:{
        ROW_NUM:15,
        COL_NUM:15
    },
    Chesspiece:{
        BLACK: 1,
        WHITE: 0,
        EMPTY: 'e'
    }
};

// for judgement convenience
let wrappedBoard = [];

function wrapBoard(board){
    let padding = new Array(Constants.ChessBoard.COL_NUM + 4).fill(
        Constants.Chesspiece.EMPTY);
    for(let row of board){
        row.unshift(Constants.Chesspiece.EMPTY, Constants.Chesspiece.EMPTY);
        row.push(Constants.Chesspiece.EMPTY, Constants.Chesspiece.EMPTY);
    }
    return [padding, padding, ...board, padding, padding];
}

// like this 'b' 'b'
function hasOneStepNeighbour(board, color, rowPos, colPos){
    return (board[rowPos-1][colPos-1] == color) ||
        (board[rowPos-1][colPos] == color) ||
        (board[rowPos-1][colPos+1] == color) ||
        (board[rowPos][colPos-1] == color) ||
        (board[rowPos][colPos+1] == color) ||
        (board[rowPos+1][colPos-1] == color) ||
        (board[rowPos+1][colPos] == color) ||
        (board[rowPos+1][colPos+1] == color);
}

// like this 'b' 'e' 'b'
function hasTwoStepNeighbour(board, color, rowPos, colPos){
    return (board[rowPos-2][colPos-2] == color) ||
        (board[rowPos-2][colPos] == color) ||
        (board[rowPos-2][colPos+2] == color) ||
        (board[rowPos][colPos-2] == color) ||
        (board[rowPos][colPos+2] == color) ||
        (board[rowPos+2][colPos-2] == color) ||
        (board[rowPos+2][colPos] == color) ||
        (board[rowPos+2][colPos+2] == color);
}


// return type
// [
//    [rowPos, colPos],
// ]

// range: [0,15)
function generateAllNextPossibleMove(wrappedBoard, color){
    let oneStepNeighbours = [],
        twoStepNeighbours = [];
    
    let rowEnd = Constants.ChessBoard.ROW_NUM + 2,
        colEnd = Constants.ChessBoard.COL_NUM + 2;
    for(let i = 2; i < rowEnd;i++){
        for(let j = 2;j < colEnd;j++){
            if(hasOneStepNeighbour(wrappedBoard, color, i, j)){
                oneStepNeighbours.push([i-2, j-2]);
            }else if(hasTwoStepNeighbour(wrappedBoard, color, i, j)){
                twoStepNeighbours.push([i-2, j-2]);
            }
        }
    }
    return [...oneStepNeighbours, ...twoStepNeighbours];
}