var Board = function() {
	return {
		hasWinner: 0,
		currentPlayer: 2,
		grid: [
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
		],
		resetGrid: function() {
			for (var i = 0, top = this.grid.length - 1; i <= top; i++) {
				this.grid[i] = [0, 0, 0, 0, 0, 0, 0];
			};
		},
		answer: function(x) {
			if(this.hasWinner == 1){
				this.hasWinner = 0;
				this.resetGrid();
			}
			var grid = this.grid;
			var player = this.currentPlayer == 1 ? 2 : 1;
			this.currentPlayer = player;
			for (var maxRow=grid.length - 1, y=maxRow; y >= 0; y--) {
				if(grid[y][x] == 0) {
					grid[y][x] = player;
					this.checkWinner();
					break;
				}
			}
			this.grid = grid;
		},
		checkWinner: function() {
			var grid = this.grid;
			var max = 4;

			for (var maxRow = grid.length - 1, y = 0; y <= maxRow; y++ ) {
				var row = grid[y];
				for (var maxCol = grid[y].length - 1, x = 0; x <= maxCol; x++ ) {
					var col = grid[y][x];
					if(this.hasWon(x, y, max)){
						this.hasWinner = 1;
						alert("Player " + col + " wins!");
						return;
					}
				}			
			}
		},
		hasWon: function(x, y, max) {
			var grid = this.grid;
			var data = grid[y][x];		
			var maxRow = grid.length - 1;
			var maxCol = grid[0].length - 1;
			
			if(data == 0) return false;
			// check horizontally
			for (var c = 1, i = x; i <= maxCol; i++, c++) { 
				if(data != grid[y][i]) break; 
				if(c == max) return true; 
			}
			// check vertically
			for (var c = 1, i = y; i <= maxRow; i++, c++) {
				if(data != grid[i][x]) break;
				if(c == max) return true; 
			}
			// check horizontally downward right
			for (var c = 1, i = x, j = y; i <= maxCol && j <= maxRow; i++, j++, c++) { 
				if(data != grid[j][i]) break;
				if(c == max) return true;
			}
			// check horizontally downward left
			for (var c = 1, i = x, j = y; i >= 0  && j <= maxRow; i--, j++, c++) {
				if(data != grid[j][i]) break;
				if(c == max) return true;
			}
			return false;
		}
	};
} 

var gdata = {};
var obj = {};
(function(){
	var app = angular.module("connectfour", []);
	app.controller("BoardController", ['$scope', function($scope) {
		$scope.board = new Board();
	}]);
})();