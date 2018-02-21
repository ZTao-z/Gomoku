// for judgement convenience
// let wrappedBoard = [];
let StepGenerator = (function(){

let StepGenerator = {};

let Constants = {
    ChessBoard:{
        ROW_NUM:15,
        COL_NUM:15,
    },
    Chesspiece:{
        BLACK: 1,
        WHITE: 0,
        EMPTY: 'e',
        BORDER: 'b'
    }
};

let UtilMethods = {
    // wrappedBoard
    isPositionEmpty(board, rowPos, colPos){
        return (board[rowPos][colPos] === Constants.Chesspiece.EMPTY);
    },
    // like this 'b' 'b'
    hasOneStepNeighbour(board, color, rowPos, colPos){
        return (board[rowPos-1][colPos-1] == color) ||
            (board[rowPos-1][colPos] == color) ||
            (board[rowPos-1][colPos+1] == color) ||
            (board[rowPos][colPos-1] == color) ||
            (board[rowPos][colPos+1] == color) ||
            (board[rowPos+1][colPos-1] == color) ||
            (board[rowPos+1][colPos] == color) ||
            (board[rowPos+1][colPos+1] == color);
    },
    // like this 'b' 'e' 'b'
    hasTwoStepNeighbour(board, color, rowPos, colPos){
        return (board[rowPos-2][colPos-2] == color) ||
            (board[rowPos-2][colPos] == color) ||
            (board[rowPos-2][colPos+2] == color) ||
            (board[rowPos][colPos-2] == color) ||
            (board[rowPos][colPos+2] == color) ||
            (board[rowPos+2][colPos-2] == color) ||
            (board[rowPos+2][colPos] == color) ||
            (board[rowPos+2][colPos+2] == color);
    }
}

StepGenerator.Constants = Constants;
StepGenerator.UtilMethods = UtilMethods;

StepGenerator.copyAndWrapBoard = (function(){
    let padding = new Array(Constants.ChessBoard.COL_NUM + 4).fill(
        Constants.Chesspiece.BORDER);
    
    return function(board) {
        let res = [padding, padding];
        for(let row of board){
            res.push([
                Constants.Chesspiece.BORDER, 
                Constants.Chesspiece.BORDER, 
                ...row, 
                Constants.Chesspiece.BORDER,
                Constants.Chesspiece.BORDER
            ]);
        }
        res.push(padding, padding);
        return res;
    };
})();

// return type
// [
//    [rowPos, colPos],
// ]

// range: [0,15)
StepGenerator.generateAllNextPossibleMove = function(wrappedBoard, color){
    let oneStepNeighbours = [],
        twoStepNeighbours = [];
    
    let rowEnd = Constants.ChessBoard.ROW_NUM + 2,
        colEnd = Constants.ChessBoard.COL_NUM + 2;
    
    //console.log(wrappedBoard);
    for(let i = 2; i < rowEnd; i++){
        for(let j = 2; j < colEnd; j++){
            if(UtilMethods.isPositionEmpty(wrappedBoard, i, j)){
                if(UtilMethods.hasOneStepNeighbour(wrappedBoard, color, i, j)){
                    oneStepNeighbours.push([i-2, j-2]);
                }else if(UtilMethods.hasTwoStepNeighbour(wrappedBoard, color, i, j)){
                    twoStepNeighbours.push([i-2, j-2]);
                }
            }
        }
    }
    return [...oneStepNeighbours, ...twoStepNeighbours];
}

return StepGenerator;

})();