/*
外部函数 

evaluate(matrix) //评估函数
generateAllNextPossibleMove(wrapBoard(matrix), color) //落子位置函数

*/

const MIN = -4294967295;
const MAX = 4294967295;


//board 当前棋盘, deep 思考步数
var FunctionMaxMin = function(board, color, deep) {
	var best = MIN;
	var points = generateAllNextPossibleMove(wrapBoard(board), color);
	var bestPoints = [];
	console.log(points);
	for(var i = 0; i < points.length; i++){
		var now_point = points[i];
		board[now_point[0]][now_point[1]] = color; //电脑下子的颜色
		var value = min(board, Math.abs(color-1), deep-1);

		if(value == best){
			bestPoints.push(now_point);
		}
		else if(value > best){
			best = value;
			bestPoints = [];
			bestPoints.push(now_point);
		}
		else{
			console.log('ignore');
		}
		board[now_point[0]][now_point[1]] = 'e'; 
	}
	console.log(bestPoints.length);
	var result = bestPoints[Math.floor(Math.random() * bestPoints.length)];
	return result;
}

//max函数
var max = function(board, color, deep){
	var v = evaluate(board);
	if(deep <= 0)
		return v;

	var best = MIN;
	var points = generateAllNextPossibleMove(wrapBoard(board), color);

	for( var i = 0; i < points.length; i++){
		var p = points[i];
		board[p[0]][p[1]] = color;
		var v = min(board, Math.abs(color-1), deep-1);
		board[p[0]][p[1]] = 'e';
		if(v > best)
			best = v;
	}

	return best;
}

//min函数
var min = function(board, color, deep){
	var v = evaluate(board);
	if(deep <= 0)
		return v;

	var best = MAX;
	var points = generateAllNextPossibleMove(wrapBoard(board), color);

	for( var i = 0; i < points.length; i++){
		var p = points[i];
		board[p[0]][p[1]] = color;
		var v = max(board, Math.abs(color-1), deep-1);
		board[p[0]][p[1]] = 'e';
		if(v < best)
			best = v;
	}

	return best;
}