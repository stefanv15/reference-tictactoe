# testExamples.md

#############################################
#   U N I T    T E S T    E X A M P L E S   #
#############################################


## 1. Create game command

### CreateGame

  - GIVEN 'Nothing'
  - WHEN  'Create game'
  - THEN  'Game is created' 

## 2. Join game command

### GameJoined

  - GIVEN Someone creates game
  - WHEN  Someone else joins the game
  - THEN  The person who joined the game, is joined and can play

### FullGameJoinAttempted

  - GIVEN Someone has created a game and someone else joins the game
  - WHEN  the 3rd person wants to join
  - THEN  He can't join - FullGameJoinAttempted

## 3. Move place command

### MovePlaced

  - GIVEN Someone creates a game and someone else joins the game
  - WHEN  Someone makes his first move
  - THEN  The move is placed

### IllegalMove

  - GIVEN Someone creates a game and someone else joins the game. When player 1           makes is first move, his move is placed
  - WHEN  Player 2 wants to make his move but the square is occupied
  - THEN  He will get error - IllegalMove

### NotYourMove

  - GIVEN Someone creates a game and someone else joins the game.
  - WHEN  Player 2 wants to make etc. the first move
  - THEN  He will get error - NotYourMove

### GameWon

  - GIVEN Someone creates a game and someone else joins the game. They play the           game until either wins
  - WHEN The winner is making his last move
  - THEN He will win the game - GameWon

### NotDraw

  - GIVEN Someone creates a game and someone else joins the game. They play the           game until either wins.
  - WHEN The winner is making his last move
  - THEN The game should emit game draw if the winner won on last move

### GameDraw

  - GIVEN Someone creates a game and someone else joins the game. They play the           game and no one wins
  - WHEN The either player makes the last move
  - THEN The game will be draw - GameDraw

