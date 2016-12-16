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

        processEvents(history);

        return {
            gameFull:gameFull,
            gameBoard:gameBoard,
            processEvents: processEvents
        }
    };
};
