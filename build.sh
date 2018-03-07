#!/bin/bash

C_FUNCTIONS_LIST='["_Board_create", "_Board_print", "_Board_destroy", "_Board_maxify", "_Board_init_problem", "_Board_reduce", "_Board_create_from_full_array", "_Board_get_full_tile", "_Board_get_reduced_tile"]'

# -s ASSERTIONS=1                                  \
# -s WASM=1                                        \
emcc -O3                                         \
     -s EXPORTED_FUNCTIONS="${C_FUNCTIONS_LIST}" \
     --memory-init-file 0                        \
     c_board/Board.c                             \
     c_board/simple_solver/Problem.c             \
     -o Board.js

cat Board_api.js Board.js > js/Board.js
