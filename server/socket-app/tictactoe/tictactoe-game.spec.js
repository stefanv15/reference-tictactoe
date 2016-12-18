var should = require('should');
var _ = require('lodash');

var TictactoeState = require('./tictactoe-state')(inject({}));

var tictactoe = require('./tictactoe-handler')(inject({
    TictactoeState
}));

var createEvent = {
    type: "GameCreated",
    user: {
        userName: "TheGuy"
    },
    name: "TheFirstGame",
    timeStamp: "2014-12-02T11:29:29"
};

var joinEvent = {
    type: "GameJoined",
    user: {
        userName: "Gummi"
    },
    name: "TheFirstGame",
    timeStamp: "2014-12-02T11:29:29"
};


describe('create game command', function() {


    var given, when, then;

    beforeEach(function(){
        given=undefined;
        when=undefined;
        then=undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function(actualEvents){
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });


    it('should emit game created event', function(){

        given = [];
        when =
        {
            id:"123987",
            type: "CreateGame",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        };
        then = [
            {
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            }
        ];

    })
});


describe('join game command', function () {


    var given, when, then;

    beforeEach(function () {
        given = undefined;
        when = undefined;
        then = undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function (actualEvents) {
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });


    it('should emit game joined event...', function () {

        given = [
        {
            type: "GameCreated",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        }
        ];
        when =
        {
            type: "JoinGame",
            user: {
                userName: "Gummi"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        };
        then = [
            {
                type: "GameJoined",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'O'
            }
        ];

    });

    it('should emit FullGameJoinAttempted event when game full..implement this', function () {
        given = [
            {
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29"
            },
            {
                type: "GameJoined",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'O'
            }
        ];
        when =
            {
                type: "JoinGame",
                user: {
                    userName: "Stebbi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29"
            };
        then = [
            {
                type: "FullGameJoinAttempted",
                user: {
                    userName: "Stebbi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29"
            }
        ];
    });
});

describe('Move place command', function () {


    var given, when, then;

    beforeEach(function () {
        given = undefined;
        when = undefined;
        then = undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function (actualEvents) {
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });


    it('should emit MovePlaced on first game move...', function (){

        given = [
            {
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side: 'X'
            },
            {
                type: "GameJoined",
                user: {
                    userName: "jolasveinn"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'O'
            },
        ];
        when = 
            {
                type: "PlaceMove",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:33:00",
                side:'X'
            };
        then = [
            {
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                 timeStamp: "2014-12-02T11:33:00",
                side:'X'
            }
        ];
    });

  /* it('should emit IllegalMove when square is already occupied...', function (){
        given = [
            {
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side: "X"   
            },
            {
                type: "GameJoined",
                user: {
                    userName: "Jolasveinninn"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                side:"O"
            },
           {
                type: "PlaceMove",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:33:00",
                placeInSqr: "3",
                side:"X"
            },
            {
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:33:00",
                placeInSqr: "3",
                side:"X"
            }
        ];
        when = 
            {
                type: "PlaceMove",
                user: {
                    userName: "Jolasveinninn"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:36:00",
                placeInSqr: "3",
                side:"O"
            }
        then = [
            {
                type: "IllegalMove",
                user: {
                    userName: "Jolasveinninn"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:36:00",
                side:"O"
            }
        ];
    }); */

   /* it('Should emit NotYourMove if attempting to make move out of turn...', function (){

        given = [
            {
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side: "X"   
            },
            {
                type: "GameJoined",
                user: {
                    userName: "Jolasveinninn"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:34",
                side:"O"
            },
        when = 
            {
                type: "PlaceMove",
                user: {
                    userName: "Jolasveinninn"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:32:00",
                side:"O"
            }
        then = [
            {
                type: "NotYourMove",
                user: {
                    userName: "Jolasveinninn"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:32:00",
                side:"O"
            }
        ]; 
    }); */

    /*it('Should emit game won on...', function () {
        given = [
            {
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side: "X"   
            },
            {
                type: "GameJoined",
                user: {
                    userName: "Jolasveinninn"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                side:"O"
            },
           {
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:33:00",
                placeInSqr: "3",
                side:"X"
            },
           {
                type: "MovePlaced",
                user: {
                    userName: "Jolasveinninn"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:35:00",
                placeInSqr: "1",
                side:"O"
            },
           {
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:37:00",
                placeInSqr: "4",
                side:"X"
            },
           {
                type: "MovePlaced",
                user: {
                    userName: "Jolasveinninn"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:39:00",
                placeInSqr: "2",
                side:"O"
            },
        when = 
            {
                type: "PlaceMove",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:41:00",
                placeInSqr: "5"
                side:"X"
            }
        then = [
            {
                type: "GameWon",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:32:00",
                side:"X"
            }
        ]; 
    });*/

    /*it('Should not emit game draw if won on last move...' function () {
        
        given = [
            {
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side: "X"
            },
            {
                type: "GameJoined",
                user: {
                    userName: "Jolasveinninn"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                side:"O"
            },
           {
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:33:00",
                placeInSqr: "0",
                side:"X"
            },
           {
                type: "MovePlaced",
                user: {
                    userName: "Jolasveinninn"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:35:00",
                placeInSqr: "1",
                side:"O"
            },
           {
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:37:00",
                placeInSqr: "3",
                side:"X"
            },
           {
                type: "MovePlaced",
                user: {
                    userName: "Jolasveinninn"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:39:00",
                placeInSqr: "2",
                side:"O"
            },
           {
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:37:00",
                placeInSqr: "7",
                side:"X"
            },
           {
                type: "MovePlaced",
                user: {
                    userName: "Jolasveinninn"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:39:00",
                placeInSqr: "8",
                side:"O"
            },
           {
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:37:00",
                placeInSqr: "5",
                side:"X"
            },
           {
                type: "MovePlaced",
                user: {
                    userName: "Jolasveinninn"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:39:00",
                placeInSqr: "4",
                side:"O"
            },
        when = 
            {
                type: "PlaceMove",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:41:00",
                placeInSqr: "6"
                side:"X"
            }
        then = [
            {
                type: "GameWon",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:32:00",
                side:"X"
            }         
    });*/

    /*it('Should emit game draw when neither wins', function () {

        given = [
            {
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side: "X"   
            },
            {
                type: "GameJoined",
                user: {
                    userName: "Jolasveinninn"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                side:"O"
            },
            {
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:33:00",
                placeInSqr: "3",
                side:"X"
            },
            {
                type: "MovePlaced",
                user: {
                    userName: "Jolasveinninn"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:35:00",
                placeInSqr: "1",
                side:"O"
            },
            {
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:37:00",
                placeInSqr: "4",
                side:"X"
            },
            {
                type: "MovePlaced",
                user: {
                    userName: "Jolasveinninn"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:39:00",
                placeInSqr: "2",
                side:"O"
            },
        when = 
            {
                type: "PlaceMove",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:41:00",
                placeInSqr: "5"
                side:"X"
            }
        then = [
            {
                type: "GameWon",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:32:00",
                side:"X"
            }
        ]; 
    }); */

    /*it('Should not emit game draw if won on last move...' function () {
        given = [
            {
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side: "X"
            },
            {
                type: "GameJoined",
                user: {
                    userName: "Jolasveinninn"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
                side:"O"
            },
            {
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:33:00",
                placeInSqr: "0",
                side:"X"
            },
            {
                type: "MovePlaced",
                user: {
                    userName: "Jolasveinninn"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:35:00",
                placeInSqr: "1",
                side:"O"
            },
            {
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:37:00",
                placeInSqr: "3",
                side:"X"
            },
            {
                type: "MovePlaced",
                user: {
                    userName: "Jolasveinninn"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:39:00",
                placeInSqr: "6",
                side:"O"
            },
            {
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:37:00",
                placeInSqr: "7",
                side:"X"
            },
            {
                type: "MovePlaced",
                user: {
                    userName: "Jolasveinninn"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:39:00",
                placeInSqr: "5",
                side:"O"
            },
            {
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:37:00",
                placeInSqr: "2",
                side:"X"
            },
            {
                type: "MovePlaced",
                user: {
                    userName: "Jolasveinninn"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:39:00",
                placeInSqr: "4",
                side:"O"
            },
        when = 
            {
                type: "PlaceMove",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:41:00",
                placeInSqr: "8"
                side:"X"
            }
        then = [
            {
                type: "GameDraw",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:32:00",
                side:"X"
            }
    });*/
});

