/*
外部函数 

evaluate(matrix) //评估函数
generateAllNextPossibleMove(wrapBoard(matrix), color) //落子位置函数

*/

const MIN = -4294967295;
const MAX = 4294967295;
var alpha = Number.NEGATIVE_INFINITY,
	beta = Number.POSITIVE_INFINITY;

//board 当前棋盘, deep 思考步数
var FunctionMaxMin = function(board, color, deep) {
	var best = MIN;
	//console.log(board);
	var points = StepGenerator.generateAllNextPossibleMove(StepGenerator.copyAndWrapBoard(board), color);
	var bestPoints = [];
	//console.log(points);
	for(var i = 0; i < points.length; i++){
		var now_point = points[i];
		board[now_point[0]][now_point[1]] = color;         //下子的颜色
		var value = min(board, Math.abs(color-1), alpha, beta, deep-1);

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
	if(result == undefined)
		return [];
	return [result[0]+1, result[1]+1]; //此处是为了方便手动下棋，电脑下棋应当把 +1 部分都去掉，直接return result
}

//max函数
var max = function(board, color, alpha, beta, deep){
	var v = ModuleEvaluate.evaluate(board);
	if(deep <= 0 || ModuleWinnerCheck.checkWinnerInAiController(board, color))
		return v;

	var best = MIN;
	var points = StepGenerator.generateAllNextPossibleMove(StepGenerator.copyAndWrapBoard(board), color);

	for( var i = 0; i < points.length; i++){
		var p = points[i];
		board[p[0]][p[1]] = color;
		var v = min(board, Math.abs(color-1), alpha, beta, deep-1);
		board[p[0]][p[1]] = 'e';
		if(v > best)
			best = v;
		if(v > alpha)
			alpha = v;
		if(beta <= alpha)
			break;
	}

	return best;
};

//min函数
var min = function(board, color, alpha, beta, deep){
	var v = ModuleEvaluate.evaluate(board);
	if(deep <= 0 || ModuleWinnerCheck.checkWinnerInAiController(board, color))
		return v;

	var best = MAX;
	var points = StepGenerator.generateAllNextPossibleMove(StepGenerator.copyAndWrapBoard(board), color);

	for( var i = 0; i < points.length; i++){
		var p = points[i];
		board[p[0]][p[1]] = color;
		var v = max(board, Math.abs(color-1), alpha, beta, deep-1);
		board[p[0]][p[1]] = 'e';
		if(v < best)
			best = v;
		if(v < beta)
			beta = v;
		if(beta <= alpha)
			break;
	}

	return best;
};