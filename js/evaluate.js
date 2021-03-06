'use strict';

const judge_standard = {
    //连五
    FIVE: 300000,
    //活四
    FOUR: 10000,
    //活三
    THREE: 1000,
    //活二
    TWO: 100,
    //活一
    ONE: 10,
    //眠四
    BLOCK_FOUR: 1000,
    //眠三
    BLOCK_THREE: 100,
    //眠二
    BLOCK_TWO: 10,
    //眠一
    BLOCK_ONE: 1
};

var ModuleEvaluate = {

    _pointDirection: function( row, col, matrix) {
    
        //公用部分
        var result = new Array(4);
        var count;
        var a = row;
        var b = col;

        //按四个方向划分四个一维数组
        //横线
        var horizon = [];
        for(var i = 0; i < 15; i++)
            horizon[i] = matrix[row][i];

        //竖直线
        var vertical = [];
        for(var i = 0; i < 15; i++)
            vertical[i] = matrix[i][col];

        //右上斜线
        var rightTop = [];
        while(a < 14 && b > 0){ a++; b--; };
        for(var i = 0; a >= 0 && b < 15; i++)
            rightTop[i] = matrix[a--][b++];

        //右下斜线
        a = row;
        b = col;
        var rightDown = [];
        while(a > 0 && b > 0){ a--; b--; };
        for(var i = 0; a < 15 && b < 15; i++)
            rightDown[i] = matrix[a++][b++];

        //统计部分
        //横线
        var horizonCheck = 'b'+horizon.join('')+'b';

        //竖直线
        var verticalCheck = 'b'+vertical.join('')+'b';

        //右上斜线
        var rightTopCheck = 'b'+rightTop.join('')+'b';

        //右下斜线
        var rightDownCheck = 'b'+rightDown.join('')+'b';
        
        return [horizonCheck, verticalCheck, rightTopCheck, rightDownCheck];
    },

    /*
    连五：color+color+color+color+color

    活四：(-1)+color+color+color+color+(-1)

    眠四：(!color)+color+color+color+color+(-1) || 
          color+color+color+(-1)+color || 
          color+color+(-1)+color+color

    活三：(-1)+color+color+color+(-1) ||
          color+color+(-1)+color

    眠三：(!color)+color+color+color+(-1)+(-1) ||
          (!color)+color+color+(-1)+color+(-1) ||
          (!color)+color+(-1)+color+color+(-1) 

    活二：(-1)+(-1)+color+color+(-1)+(-1) || 
          (-1)+color+(-1)+color+(-1) ||
          color+(-1)+(-1)+color

    眠二：(!color)+color+color+(-1)+(-1)+(-1) ||
          (!color)+color+(-1)+color+(-1)+(-1) ||
          (!color)+color+(-1)+(-1)+color+(-1)

    活一：(-1)+color+(-1)

    眠一：(!color)+color+(-1)

    */


    //b代表边界，e代表空位，color代表当前颜色，ncolor代表相反的颜色
    _regExpConstructor: function ( chessColor ){
        var regex = new Array(31);
        var color = parseInt(chessColor);
        var ncolor = color == 1? 0 : 1;

        //连五
        regex[0] = new RegExp(color+''+color+''+color+''+color+''+color, 'g');
        //活四
        regex[1] = new RegExp('e'+color+''+color+''+color+''+color+'e', 'g');
        //眠四
        regex[2] = new RegExp(('('+ncolor+'|b)')+''+color+''+color+''+color+''+color+'e', 'g');
        regex[3] = new RegExp('e'+color+''+color+''+color+''+color+''+('('+ncolor+'|b)'), 'g');
        regex[4] = new RegExp(color+''+color+'e'+color+''+color, 'g');
        regex[5] = new RegExp(color+'e'+color+''+color+''+color, 'g');
        regex[6] = new RegExp(color+''+color+''+color+'e'+color, 'g');
        //活三
        regex[7] = new RegExp('e'+'e'+color+''+color+''+color+'e'+'e', 'g');
        regex[8] = new RegExp(('('+ncolor+'|b)')+'e'+color+''+color+''+color+'e'+'e', 'g');
        regex[9] = new RegExp('e'+'e'+color+''+color+''+color+'e'+('('+ncolor+'|b)'), 'g');
        regex[10] = new RegExp('e'+color+'e'+color+''+color+'e', 'g');
        regex[11] = new RegExp('e'+color+''+color+'e'+color+'e', 'g');
        //眠三
        regex[12] = new RegExp(('('+ncolor+'|b)')+'e'+color+''+color+''+color+'e'+('('+ncolor+'|b)'), 'g');
        regex[13] = new RegExp(('('+ncolor+'|b)')+''+color+''+color+''+color+'e'+'e', 'g');
        regex[14] = new RegExp('e'+'e'+color+''+color+''+color+''+('('+ncolor+'|b)'), 'g');
        regex[15] = new RegExp(('('+ncolor+'|b)')+''+color+''+color+'e'+color+'e', 'g');
        regex[16] = new RegExp('e'+color+'e'+color+''+color+''+('('+ncolor+'|b)'), 'g');
        regex[17] = new RegExp(('('+ncolor+'|b)')+''+color+'e'+color+''+color+'e', 'g');
        regex[18] = new RegExp('e'+color+''+color+'e'+color+''+('('+ncolor+'|b)'), 'g');
        //活二
        regex[19] = new RegExp('e'+'e'+color+color+'e'+'e', 'g');
        regex[20] = new RegExp('e'+color+'e'+color+'e', 'g');
        regex[21] = new RegExp('e'+color+'e'+'e'+color+'e', 'g');
        //眠二
        regex[22] = new RegExp(('('+ncolor+'|b)')+''+color+''+color+'e'+'e'+'e', 'g');
        regex[23] = new RegExp('e'+'e'+'e'+color+''+color+''+('('+ncolor+'|b)'), 'g');
        regex[24] = new RegExp(('('+ncolor+'|b)')+''+color+'e'+color+'e'+'e', 'g');
        regex[25] = new RegExp('e'+'e'+color+'e'+color+''+('('+ncolor+'|b)'), 'g');
        regex[26] = new RegExp(('('+ncolor+'|b)')+''+color+'e'+'e'+color+'e', 'g');
        regex[27] = new RegExp('e'+color+'e'+'e'+color+''+('('+ncolor+'|b)'), 'g');
        //活一
        regex[28] = new RegExp('e'+color+'e', 'g');
        //眠一
        regex[29] = new RegExp(('('+ncolor+'|b)')+''+color+'e', 'g');
        regex[30] = new RegExp('e'+color+('('+ncolor+'|b)'), 'g')

        //console.log(regex);

        return regex;
    },

    _pointCounter: function( strList, regExpList ){
        var count = 0;
        var size = 0; 
        for( var i = 0; i < 4; i++){
            for(var j = 0; j < 31; j++){
                size = strList[i].match(regExpList[j]) == null? 0: strList[i].match(regExpList[j]).length;
                if(j == 0){
                    count += (size) * judge_standard.FIVE;
                }
                else if(j == 1){
                    count += (size) * judge_standard.FOUR;
                }
                else if(j >= 2 && j <= 6){
                    count += (size) * judge_standard.BLOCK_FOUR;
                    if( j >= 4)
                        count += (size) * judge_standard.FOUR / 5;
                }
                else if(j >= 7 && j <= 11){
                    count += (size) * judge_standard.THREE;
                }
                else if(j >= 12 && j <= 18){
                    count += (size) * judge_standard.BLOCK_THREE;
                }
                else if(j >= 19 && j <= 21){
                    count += (size) * judge_standard.TWO;
                }
                else if(j >= 22 && j <= 27){
                    count += (size) * judge_standard.BLOCK_TWO;
                }
                else if(j == 28){
                    count += (size) * judge_standard.ONE;
                }
                else{
                    count += (size) * judge_standard.BLOCK_ONE;
                }
                strList[i].replace(regExpList[j], "-");
            }
        }
        return count;
    },

    pointEvaluate: function( matrix, position, color) {
        if(color == 1){
            return this._pointCounter(this._pointDirection(position[0], position[1], matrix), BLACK_REG);
        }
        else{
            return this._pointCounter(this._pointDirection(position[0], position[1], matrix), WHITE_REG);
        }

    },

    evaluate: function( matrix ){
        var black_value = 0;
        var white_value = 0;
        for(var i = 0; i < 15; i++){
            for(var j = 0; j < 15; j++){
                if(matrix[i][j] == 1){
                    black_value += this._pointCounter(this._pointDirection(i, j, matrix), BLACK_REG);
                }
                else if(matrix[i][j] == 0){
                    white_value += this._pointCounter(this._pointDirection(i, j, matrix), WHITE_REG);
                }
                else{
                    continue;
                }
            }
        }

        return (black_value - white_value);
    }

};

const BLACK_REG = ModuleEvaluate._regExpConstructor(1);
    
const WHITE_REG = ModuleEvaluate._regExpConstructor(0);