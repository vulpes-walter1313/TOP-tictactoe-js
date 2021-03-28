# TOP-tictactoe-js
Tic Tac Toe project challenge from The Odin Project.

## Modules
**gameBoard** will be the main module that hosts the game and functions. it will have the following functions and properties:

### board
This is an object with key-values equivalent to the players choices.

### displayBoard()
Display board will iterate through all the slots on the `board` and makesure that the elements are displayed in the correct DOM slots

### resetBoard()
Resets board to blank.

### playTurn(player, slotkey)
Takes in a players token and their choice slot and then displays board with their choice added.

## Factory Functions
The following are factories for the game.

### playerFactory(name, token)
A factory is needed to create the players with their chosen tokens.