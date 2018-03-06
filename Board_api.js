
function Board(width, height, arg3, difficulty) {

  var c_board = 0,
      length = width * height;

  if (typeof(arg3)==="number") {
    // Make a new board from scratch
    var maxValue = Math.min(arg3, 9);
    var length = width * height;
    c_board = Module._Board_create(width, height);
    if (c_board === 0) {
      return;
    }
    var fail = Module._Board_maxify(c_board, maxValue);
    if (fail) {
      return;
    }
  }
  // else if (typeof(arg3)==='object') {
    // // Reduce a board from the given list
    // var exportValues = new Uint8Array(length);
    // for (var i = 0; i < length; i++) {
      // exportValues = arg3[i];
    // }
    // c_board = Module._Board_create_from_full_array(width, height, exportValues);
  // }
  else {
    return;
  }
  Module._Board_init_problem(c_board, difficulty);

  var fraction_complete = 0.;
  var batch_size = width;
  while (fraction_complete != 1.) {
    fraction_complete = Module._Board_reduce(c_board, width);
    // console.log(fraction_complete * 100, "complete");
  }
  // Module._Board_print(c_board);

  var full = new Array(length);
  var empty = new Array(length);
  for (var i = 0; i < length; i++) {
    full[i] = Module._Board_get_full_tile(c_board, i);
    empty[i] = Module._Board_get_reduced_tile(c_board, i);
  }

  Module._Board_destroy(c_board);
  return {
    full: full,
    empty: empty,
    width: width,
    height: height,
    difficulty: difficulty
  };
}

Board.Difficulty = {
  Easy: 0,
  Hard: 1
}


function generateGridAndSolution(size) {
  console.log("Generating new board. size " + size);
  var d = new Date();
  var board = Board(size, size, size, 0);
  var result = {};
  result.size = size;
  result.full = board.full;
  result.empty = board.empty;
  result.ms = new Date() - d;
  self.postMessage(JSON.stringify(result));
}

onmessage = function(e) {generateGridAndSolution(e.data.size)}
