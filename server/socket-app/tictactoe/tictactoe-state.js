var _ = require('lodash');

module.exports = function (injected) {

    return function (history) {

        var gamefull=false;
        var gameboard = [];

        function processEvent(event) {
            if(event.type==="GameJoined"){
                gamefull = true;
            }
            if(event.type==="MovePlaced"){
                gameboard = ['X'];
            }
        }

        function processEvents(history){
            _.each(history, processEvent);
        }

        function gameFull(){
            return gamefull;
        }

        function gameBoard(){
            return gameboard;
        }

        /*function checkSqr(placeInSqr){
            for(var i = 0; i < gameBoard.size; i++){
                if(gameBoard[i] == 'X' || gameBoard[i] == 'O'){
                    return occupiedSqr(placeInSqr);
                }
            }
        }

        function occupiedSqr(placeInSqr){
            return gameBoard(placeInSqr) != null;
        }*/

        processEvents(history);

        return {
            gameFull:gameFull,
            //checkSqr:checkSqr,
            //occupiedSqr:occupiedSqr,
            gameBoard:gameBoard,
            processEvents: processEvents
        }
    }
};