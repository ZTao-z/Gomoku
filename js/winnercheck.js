//判断胜负部分

var ModuleWinnerCheck = {

    checkWinner: function(color, num) {
        var col = num % 15;
        var row = (num-col) / 15;
        map[row][col] = color;

        /*测试语句，输出为黑棋与白旗的权值差（black - white）*/
        //console.log(color);
        //console.log(Math.abs(color-1));
        console.log(ModuleEvaluate.evaluate(map));
        /***********************/

        var count = 1;
        is_win = this._checkControl(row, col, color);
        if(is_win)
            return -1;
        else
            return num;
    },

    checkWinnerInAiController: function(matrix, color) {
        for(var i = 0; i < 15; i++){
            for(var j = 0; j < 15; j++){
                if(matrix[i][j] != color)
                    continue;
                if(this._checkControl(i, j, color))
                    return true;
            }
        }
        return false;
    },

    _checkControl: function(row, col, color) {
        if(this._checkWinnerScan(row, col, color, 0) + this._checkWinnerScan(row, col, color, 4) - 1 < 5)
            if(this._checkWinnerScan(row, col, color, 1) + this._checkWinnerScan(row, col, color, 5) - 1 < 5)
                if(this._checkWinnerScan(row, col, color, 2) + this._checkWinnerScan(row, col, color, 6) - 1 < 5)
                    if(this._checkWinnerScan(row, col, color, 3) + this._checkWinnerScan(row, col, color, 7) - 1 < 5)
                        return false;
        return true;
    },

    _checkWinnerScan: function(row, col, color, state) {
        if(row < 0 || row > 14 || col < 0 || col > 14 || map[row][col] != color){
            return 0;
        }
        else if(!is_win && state == 0){
            return 1 + this._checkWinnerScan(row-1, col, color, 0);
        }
        else if(!is_win && state == 1){
            return 1 + this._checkWinnerScan(row-1, col+1, color, 1);
        }
        else if(!is_win && state == 2){
            return 1 + this._checkWinnerScan(row, col+1, color, 2);
        }
        else if(!is_win && state == 3){
            return 1 + this._checkWinnerScan(row+1, col+1, color, 3);
        }
        else if(!is_win && state == 4){
            return 1 + this._checkWinnerScan(row+1, col, color, 4);
        }
        else if(!is_win && state == 5){
            return 1 + this._checkWinnerScan(row+1, col-1, color, 5);
        }
        else if(!is_win && state == 6){
            return 1 + this._checkWinnerScan(row, col-1, color, 6);
        }
        else if(!is_win && state == 7){
            return 1 + this._checkWinnerScan(row-1, col-1, color, 7);
        }
        else{
            return 0;
        }
    }
};