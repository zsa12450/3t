/**
 * 游戏主逻辑
 */

// 格子
var board = new Array();
// 分数
var score = 0;
var hasConflicted = new Array();
var changeModel = false;

$(document).ready(function() {
	$("#programerModel").click(function() {
		changeModel = true;
	});
	$("#numberModel").click(function() {
		changeModel = false;
	});
	newgame();
});

// 开始一个新游戏
function newgame() {
	//初始化格子
	init();
	//在随机两个格子生成数字
	generateOneNumber();
	generateOneNumber();
}

// 初始化
function init() {
	for(var i = 0; i < 4; i++)
		for(var j = 0; j < 4; j++) {

			// 取到每一个小格子
			var gridCell = $('#grid-cell-' + i + "-" + j);

			// 设置每一个小格子的坐标值
			gridCell.css('top', getPosTop(i, j));
			gridCell.css('left', getPosLeft(i, j));
		}

	for(var i = 0; i < 4; i++) {
		// 将格子数组设置成二维数组
		board[i] = new Array();
		hasConflicted[i] = new Array();
		for(var j = 0; j < 4; j++) {
			// 初始化每一个格子的值为0
			board[i][j] = 0;
			hasConflicted[i][j] = false;
		}
	}

	// 更新格子数据进行显示
	updateBoardView();

	score = 0;
	updateScore(score);
}

/**
 * 
 */
function updateBoardView() {

	// 如果当前格子里已经有了数字div那么将它删除掉
	$(".number-cell").remove();
	for(var i = 0; i < 4; i++)
		for(var j = 0; j < 4; j++) {
			// 首先对每一个小格子都应该生成一个数字div
			$("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
			// 获取到当前坐标下的数字div
			var theNumberCell = $('#number-cell-' + i + '-' + j);

			// 判断当前格子是否为0
			if(board[i][j] == 0) {
				//如果为0 设置宽高为0
				theNumberCell.css('width', '0px');
				theNumberCell.css('height', '0px');
				// 将数字格放到显示格中间，在计算出显示格的左上角坐标的基础上加上50
				theNumberCell.css('top', getPosTop(i, j) + 50);
				theNumberCell.css('left', getPosLeft(i, j) + 50);
			} else {
				// 如果不为0那么用数字格将显示格覆盖住
				theNumberCell.css('width', '100px');
				theNumberCell.css('height', '100px');
				theNumberCell.css('top', getPosTop(i, j));
				theNumberCell.css('left', getPosLeft(i, j));
				// 根据当前格子的数字获取背景颜色
				theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
				// 获取前景色
				theNumberCell.css('color', getNumberColor(board[i][j]));
				// 显示当前的值
				if(changeModel) {
					switch(board[i][j]) {
						case 2:
							theNumberCell.text("小白");
							break;
						case 4:
							theNumberCell.text("实习生");
							break;
						case 8:
							theNumberCell.text("程序员");
							break;
						case 16:
							theNumberCell.text("项目经理");
							break;
						case 32:
							theNumberCell.text("架构师");
							break;
						case 64:
							theNumberCell.text("技术经理");
							break;
						case 128:
							theNumberCell.text("高级经理");
							break;
						case 256:
							theNumberCell.text("技术总裁");
							break;
						case 512:
							theNumberCell.text("副总裁");
							break;
						case 1024:
							theNumberCell.text("CTO");
							break;
						case 2048:
							theNumberCell.text("总裁");
							break;
					}
				} else {
					theNumberCell.text(board[i][j]);
				}

			}

			hasConflicted[i][j] = false;
		}
}

function generateOneNumber() {

	if(nospace(board))
		return false;

	//随机一个位置
	var randx = parseInt(Math.floor(Math.random() * 4));
	var randy = parseInt(Math.floor(Math.random() * 4));

	var times = 0;
	while(times < 50) {
		if(board[randx][randy] == 0)
			break;

		randx = parseInt(Math.floor(Math.random() * 4));
		randy = parseInt(Math.floor(Math.random() * 4));

		times++;
	}
	if(times == 50) {
		for(var i = 0; i < 4; i++) {
			for(var j = 0; j < 4; j++) {
				if(board[i][j] == 0) {
					randx = i;
					randy = j;
				}
			}
		}
	}

	//随机数字
	var randNumber = Math.random() < 0.5 ? 2 : 4;

	//在随机位置显示随机数字
	board[randx][randy] = randNumber;
	showNumberWithAnimation(randx, randy, randNumber);

	return true;
}

$(document).keydown(function(event) {
	switch(event.keyCode) {
		case 37: //left
			if(moveLeft()) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isgameover()", 300);
			}
			break;
		case 38: //up
			if(moveUp()) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isgameover()", 300);
			}
			break;
		case 39: //right
			if(moveRight()) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isgameover()", 300);
			}
			break;
		case 40: //down
			if(moveDown()) {
				setTimeout("generateOneNumber()", 210);
				setTimeout("isgameover()", 300);
			}
			break;
		default: //default
			break;
	}
});

function isgameover() {
	if(nospace(board) && nomove(board)) {
		gameover();
	}
}

function gameover() {
	alert("gameover!");
}

function moveLeft() {

	if(!canMoveLeft(board))
		return false;

	//moveLeft
	for(var i = 0; i < 4; i++)
		for(var j = 1; j < 4; j++) {
			if(board[i][j] != 0) {

				for(var k = 0; k < j; k++) {
					if(board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
						//move
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
						//move
						showMoveAnimation(i, j, i, k);
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						// add score
						score += board[i][k];
						updateScore(score);

						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}

	setTimeout("updateBoardView()", 200);
	return true;
}

function moveRight() {
	if(!canMoveRight(board))
		return false;

	//moveRight
	for(var i = 0; i < 4; i++)
		for(var j = 2; j >= 0; j--) {
			if(board[i][j] != 0) {
				for(var k = 3; k > j; k--) {

					if(board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if(board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
						showMoveAnimation(i, j, i, k);
						board[i][k] *= 2;
						board[i][j] = 0;

						score += board[i][k];
						updateScore(score);

						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}

	setTimeout("updateBoardView()", 200);
	return true;
}

function moveUp() {

	if(!canMoveUp(board))
		return false;

	//moveUp
	for(var j = 0; j < 4; j++)
		for(var i = 1; i < 4; i++) {
			if(board[i][j] != 0) {
				for(var k = 0; k < i; k++) {

					if(board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if(board[k][j] == board[i][j] && noBlockVertical(j, k, i, board) && !hasConflicted[k][j]) {
						showMoveAnimation(i, j, k, j);
						board[k][j] *= 2;
						board[i][j] = 0;

						score += board[k][j];
						updateScore(score);

						hasConflicted[k][j] = true;

						continue;
					}
				}
			}
		}

	setTimeout("updateBoardView()", 200);
	return true;
}

function moveDown() {
	if(!canMoveDown(board))
		return false;

	//moveDown
	for(var j = 0; j < 4; j++)
		for(var i = 2; i >= 0; i--) {
			if(board[i][j] != 0) {
				for(var k = 3; k > i; k--) {

					if(board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
						showMoveAnimation(i, j, k, j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					} else if(board[k][j] == board[i][j] && noBlockVertical(j, i, k, board) && !hasConflicted[k][j]) {
						showMoveAnimation(i, j, k, j);
						board[k][j] *= 2;
						board[i][j] = 0;

						score += board[k][j];
						updateScore(score);

						hasConflicted[k][j] = true;

						continue;
					}
				}
			}
		}

	setTimeout("updateBoardView()", 200);
	return true;
}