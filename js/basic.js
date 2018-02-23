var black_or_white = "black";
var list = document.getElementsByClassName('chess');
var map;
var is_win = false;
var mode = "PvE";
var chessRecord = [];

var playMode = {
    "PvP": {
        "player1": true,
        "player2": false
    },

    "PvE": {
        "computer": false,
        "human": true
    }
};

var playModeController = function(Mode, color) {
    var playingMode;
    color = color == "black" ? 1 : 0;
    if(Mode === "PvP"){
        playingMode = playMode.PvP;
        playingMode.player1 = !playingMode.player1;
        playingMode.player2 = !playingMode.player2;
    }
    if(Mode === "PvE"){
        playingMode = playMode.PvE;
        if(playingMode.human && !playingMode.computer){
            playingMode.human = !playingMode.human;
            playingMode.computer = !playingMode.computer;
            return;
        }
        if(playingMode.computer && !playingMode.human){
            var point = FunctionMaxMin(map, Math.abs(color-1), 4);
            console.log(point);
            playingMode.human = !playingMode.human;
            playingMode.computer = !playingMode.computer;
            robotClick(point);
        }
    }
};

var robotClick = function(point) {
    var p = (point[0]-1)*15 + (point[1]-1);
    var id = "#" + p;
    $(id).click();
};

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
    if(mode == "PvE")
        $("#112").click(); //默认初始下子位置，黑棋
}

var operate = function() {
    //alert($(this).attr("check"));
    var num = parseInt($(this).attr("id"));
    chessRecord.push(num);
    if($(this).attr("check") === "true" || is_win)
        return;
    $(this).attr("check", true);
    
    if(black_or_white == "black"){
        createRecord("black", ModuleWinnerCheck.checkWinner(1, num));
        $("#"+chessRecord[chessRecord.length-2]).removeClass('active');
        $(this).addClass("blackChess").addClass("active");
        black_or_white = "white";
        $("#record").scrollTop(document.getElementById('record').scrollHeight);
        setTimeout('playModeController(mode, "black")', 500); //当前颜色
        return;
    }
    else{
        createRecord("white", ModuleWinnerCheck.checkWinner(0, num));
        $("#"+chessRecord[chessRecord.length-2]).removeClass('active');
        $(this).addClass("whiteChess").addClass("active");
        black_or_white = "black";
        $("#record").scrollTop(document.getElementById('record').scrollHeight);
        setTimeout('playModeController(mode, "white")', 500);
        return;
    }
    
}