/* 
 * BackgroundService
 * Creates a web worker for generating puzzles in the background.
 * (c) 2015 Q42
 * http://q42.com | @q42
 * Written by Martin Kool
 * martin@q42.nl | @mrtnkl
 */
var BackgroundService = new (function() {
	var self = this,
			enabled = (window.Worker && (window.Blob || window.MSApp))? true : false,
			worker = null;

	if (Game.debug)
		console.log('BackgroundService:', enabled);

	function createWorker() {
		worker = new Worker('js/Board.js');

		worker.onmessage = function(e) {
			var puzzle = JSON.parse(e.data);
			onPuzzleGenerated(puzzle);
		}
	}

	function onPuzzleGenerated(puzzle) {
		if (Game.debug)
			console.log('generated puzzle', puzzle);
		Levels.addSize(puzzle.size, puzzle);
	}

	function generatePuzzle(size) {
		if (!enabled) return;
		if (!worker) {
			createWorker();
		}
		worker.postMessage({'size':size});
	}

	function kick() {
		// todo: check levels for which to create...
		if (Levels.needs()) {
			generatePuzzle(Levels.needs());
		}
	}

	this.generatePuzzle = generatePuzzle;
	this.kick = kick;
	this.__defineGetter__('enabled', function() { return enabled; });
})();