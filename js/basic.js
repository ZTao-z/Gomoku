var black_or_white = "black";
var list = document.getElementsByClassName('chess');
var map;
var is_win = false;


//生成元素
var createMap = function() {
    map = new Array();
    for( var i = 0; i < 15; i++){
        map[i] = new Array();
        for( var j = 0; j < 15; j++){
            map[i][j] = 'e';
        }
    }
}

var chessPlace = function() {
    for( var i = 0; i < 15; i++) 
        for( var j = 0; j < 15; j++)
            placeChessPos(15+30*j, 15+30*i);
}

var placeChessPos = function(left, top) {
    var chessContainer = document.createElement("div");
    chessContainer.id = (left-15)/30 + (top-15)/30*15 + "";
    chessContainer.style.left = left + "px";
    chessContainer.style.top = top + "px";
    chessContainer.classList.add("chess");
    chessContainer.setAttribute("check", false);
    document.getElementById('chessPositioner').appendChild(chessContainer);
}

var createRecord = function(color, num) {
    var record = document.createElement("li");
    if(num != -1)
        record.textContent = color + "  :  " + ((num-num%15)/15+1) + "," + (num%15+1);
    else
        record.textContent = color + " win!";
    document.getElementById('record').appendChild(record);
}

//操作部分
window.onload = function() {
    chessPlace();
    createMap();
    for( var i = 0; i < list.length; i++){
        list[i].onclick = operate;
    }
    is_win = false;
}

var operate = function() {
    //alert($(this).attr("check"));
    var num = parseInt($(this).attr("id"));
    if($(this).attr("check") === "true" || is_win)
        return;
    $(this).attr("check", true);
    
    if(black_or_white == "black"){
        createRecord("black", checkWinner(1, num));
        $(this).addClass("blackChess");
        black_or_white = "white";
        $("#record").scrollTop(document.getElementById('record').scrollHeight);
        //alert(map);
        return;
    }
    else{
        createRecord("white", checkWinner(0, num));
        $(this).addClass("whiteChess");
        black_or_white = "black";
        $("#record").scrollTop(document.getElementById('record').scrollHeight);
        //alert(map);
        return;
    }  
}


//判断胜负部分
var checkWinner = function(color, num) {
    var col = num%15;
    var row = (num-col)/15;
    map[row][col] = color;

    /*测试语句，输出为黑棋与白旗的权值差（black - white）*/
    console.log(evaluate(map));
    /***********************/

    var count = 1;
    is_win = checkControl(row, col, color);
    if(is_win)
        return -1;
    else
        return num;
}

var checkControl = function(row, col, color) {
    if(checkWinnerScan(row, col, color, 0) + checkWinnerScan(row, col, color, 4) - 1 < 5)
        if(checkWinnerScan(row, col, color, 1) + checkWinnerScan(row, col, color, 5) - 1 < 5)
            if(checkWinnerScan(row, col, color, 2) + checkWinnerScan(row, col, color, 6) - 1 < 5)
                if(checkWinnerScan(row, col, color, 3) + checkWinnerScan(row, col, color, 7) - 1 < 5)
                    return false;
    return true;
}

var checkWinnerScan = function(row, col, color, state) {
    if(row < 0 || row > 14 || col < 0 || col > 14 || map[row][col] != color){
        return 0;
    }
    else if(!is_win && state == 0){
        return 1 + checkWinnerScan(row-1, col, color, 0);
    }
    else if(!is_win && state == 1){
        return 1 + checkWinnerScan(row-1, col+1, color, 1);
    }
    else if(!is_win && state == 2){
        return 1 + checkWinnerScan(row, col+1, color, 2);
    }
    else if(!is_win && state == 3){
        return 1 + checkWinnerScan(row+1, col+1, color, 3);
    }
    else if(!is_win && state == 4){
        return 1 + checkWinnerScan(row+1, col, color, 4);
    }
    else if(!is_win && state == 5){
        return 1 + checkWinnerScan(row+1, col-1, color, 5);
    }
    else if(!is_win && state == 6){
        return 1 + checkWinnerScan(row, col-1, color, 6);
    }
    else if(!is_win && state == 7){
        return 1 + checkWinnerScan(row-1, col-1, color, 7);
    }
    else{
        return 0;
    }
}

