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
    isFilled(board, rowPos, colPos){
        return (board[rowPos][colPos] === Constants.Chesspiece.WHITE || 
            board[rowPos][colPos] === Constants.Chesspiece.BLACK);
    },
    // like this 'b' 'b'
    hasOneStepNeighbour(board, rowPos, colPos){
        // Compare to Number.isInteger, isNaN and typeof, i think this is the fastest method
        return UtilMethods.isFilled(board, rowPos-1, colPos-1) ||
            UtilMethods.isFilled(board, rowPos-1, colPos) ||
            UtilMethods.isFilled(board, rowPos-1, colPos+1) ||
            UtilMethods.isFilled(board, rowPos, colPos-1) ||
            UtilMethods.isFilled(board, rowPos, colPos+1) ||
            UtilMethods.isFilled(board, rowPos+1, colPos-1) ||
            UtilMethods.isFilled(board, rowPos+1, colPos) ||
            UtilMethods.isFilled(board, rowPos+1, colPos+1);
    },
    // like this 'b' 'e' 'b'
    hasTwoStepNeighbour(board, rowPos, colPos){
        return UtilMethods.isFilled(board, rowPos-2, colPos-2) ||
            UtilMethods.isFilled(board, rowPos-2, colPos) ||
            UtilMethods.isFilled(board, rowPos-2, colPos+2) ||
            UtilMethods.isFilled(board, rowPos, colPos-2) ||
            UtilMethods.isFilled(board, rowPos, colPos+2) ||
            UtilMethods.isFilled(board, rowPos+2, colPos-2) ||
            UtilMethods.isFilled(board, rowPos+2, colPos) ||
            UtilMethods.isFilled(board, rowPos+2, colPos+2);
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

var pointsFilter = function(new_board, originalList, color){
    var fives = [];
    var fours = [];
    var twothrees = [];
    var threes = [];
    var twos = [];
    var neighbors = [];

    for(var i = 0; i < originalList.length; i++){
        //console.log(originalList[i]);
        new_board[originalList[i][0]][originalList[i][1]] = color;
        var computorScore = ModuleEvaluate.pointEvaluate(new_board, originalList[i], color);
        //console.log(computorScore);
        new_board[originalList[i][0]][originalList[i][1]] = Math.abs(color-1);
        var humanScore = ModuleEvaluate.pointEvaluate(new_board, originalList[i], Math.abs(color-1));
        //console.log(humanScore);
        if(computorScore >= judge_standard.FIVE)
            return [originalList[i]];
        else if(humanScore >= judge_standard.FIVE)
            fives.push(originalList[i]);
        else if(computorScore >= judge_standard.FOUR)
            fours.unshift(originalList[i]);
        else if(humanScore >= judge_standard.FOUR)
            fours.push(originalList[i]);
        else if(computorScore >= 2*judge_standard.THREE)
            twothrees.unshift(originalList[i]);
        else if(humanScore >= 2*judge_standard.THREE)
            twothrees.push(originalList[i]);
        else if(computorScore >= judge_standard.THREE)
            threes.unshift(originalList[i]);
        else if(humanScore >= judge_standard.THREE)
            threes.push(originalList[i]);
        else if(computorScore >= judge_standard.TWO)
            twos.unshift(originalList[i]);
        else if(humanScore >= judge_standard.TWO)
            twos.push(originalList[i]);
        else
            neighbors.push(originalList[i]);

        new_board[originalList[i][0]][originalList[i][1]] = 'e';
    }

    if(fives.length)
        return fives;
    if(fours.length)
        return fours;
    if(twothrees.length)
        return twothrees;
    return [...threes, ...twos, ...neighbors];
};

StepGenerator.generateAllNextPossibleMove = function(wrappedBoard, color){
    let oneStepNeighbours = [],
        twoStepNeighbours = [];
    
    let rowEnd = Constants.ChessBoard.ROW_NUM + 2,
        colEnd = Constants.ChessBoard.COL_NUM + 2;
    
    var new_board = new Array(15);
    for(var i = 0; i < 15; i++)
        new_board[i] = new Array(15);

    //console.log(wrappedBoard);
    for(let i = 2; i < rowEnd; i++){
        for(let j = 2; j < colEnd; j++){
            new_board[i-2][j-2] = wrappedBoard[i][j];
            
            if(UtilMethods.isPositionEmpty(wrappedBoard, i, j)){
                if(UtilMethods.hasOneStepNeighbour(wrappedBoard, i, j)){
                    oneStepNeighbours.push([i-2, j-2]);
                }else if(UtilMethods.hasTwoStepNeighbour(wrappedBoard, i, j)){
                    twoStepNeighbours.push([i-2, j-2]);
                }
            }
        }
    }

    var originalList = [...oneStepNeighbours, ...twoStepNeighbours];
    return pointsFilter(new_board, originalList, color);
}

return StepGenerator;

})();