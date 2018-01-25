var black_or_white = "black";
var list = document.getElementsByClassName('chess');
var map;

window.onload = function() {
    chessPlace();
    createMap();
    for( var i = 0; i < list.length; i++){
        list[i].onclick = operate;
    }
}

var createMap = function() {
    map = new Array();
    for( var i = 0; i < 15; i++){
        map[i] = new Array();
        for( var j = 0; j < 15; j++){
            map[i][j] = -1;
        }
    }
}

var operate = function() {
    //alert($(this).attr("check"));
    var num = parseInt($(this).attr("id"));
    if($(this).attr("check") === "true")
        return;
    $(this).attr("check", true);
    
    if(black_or_white == "black"){
        createRecord("black", num);
        $(this).addClass("blackChess");
        black_or_white = "white";
        $("#record").scrollTop(300);
        return;
    }
    else{
        createRecord("white", num);
        $(this).addClass("whiteChess");
        black_or_white = "black";
        $("#record").scrollTop(300);
        return;
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
