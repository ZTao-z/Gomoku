/*
外部函数 

evaluate(matrix) //评估函数
generateAllNextPossibleMove(wrapBoard(matrix), color) //落子位置函数

*/

const MIN = Number.NEGATIVE_INFINITY;
const MAX = Number.POSITIVE_INFINITY;

var alpha = Number.NEGATIVE_INFINITY,
	beta = Number.POSITIVE_INFINITY;

var pointCounter = 0;

//board 当前棋盘, deep 思考步数
var FunctionMaxMin = function(board, color, deep) {
	var best = MIN;
	//console.log(board);
	var boardTemp = StepGenerator.copyAndWrapBoard(board);
	var points = StepGenerator.generateAllNextPossibleMove(boardTemp, color);
	var bestPoints = [];
	//console.log(points);
	for(var i = 0; i < points.length; i++){
		var now_point = points[i];
		boardTemp[now_point[0]+2][now_point[1]+2] = color;         //下子的颜色

		var value = min(boardTemp, Math.abs(color-1), alpha, beta, deep-1);

		pointCounter++;

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
		boardTemp[now_point[0]+2][now_point[1]+2] = 'e'; 
	}
	console.log("搜索节点数："+pointCounter);
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
	var points = StepGenerator.generateAllNextPossibleMove(board, color);

	for( var i = 0; i < points.length; i++){

		pointCounter++;

		var p = points[i];
		board[p[0]+2][p[1]+2] = color;
		var v = min(board, Math.abs(color-1), alpha, best > beta? best : beta, deep-1);
		board[p[0]+2][p[1]+2] = 'e';
		if(v > best)
			best = v;
		if(v > alpha)  
			break;
		//alpha：上一层（min层）的当前最小值，v：当前层（mx层）的下一层的最小值
		/*我方在当前位置的下子，应当使对方紧接着的下子所产生的优势不超过对方上一步下子所产生的优势*/
	}

	return best;
};

//min函数
var min = function(board, color, alpha, beta, deep){
	var v = ModuleEvaluate.evaluate(board);
	if(deep <= 0 || ModuleWinnerCheck.checkWinnerInAiController(board, color))
		return v;

	var best = MAX;
	var points = StepGenerator.generateAllNextPossibleMove(board, color);

	for( var i = 0; i < points.length; i++){

		pointCounter++;

		var p = points[i];
		board[p[0]+2][p[1]+2] = color;
		var v = max(board, Math.abs(color-1), best < alpha? best : alpha, beta, deep-1);
		board[p[0]+2][p[1]+2] = 'e';
		if(v < best)
			best = v;
		if(v < beta)
			break;
		//beta：上一层（max层）的当前最大值，v：当前层（min层）的下一层的最大值
		/*对方在当前位置的下子，应当使我方紧接着的下子所产生的优势超过我方上一步下子所产生的优势*/
	}

	return best;
};