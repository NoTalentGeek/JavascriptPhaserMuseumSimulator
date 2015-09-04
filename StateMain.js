stateMain = {

    create              : function(){

        game.stage.backgroundColor          = 0x45283c;
        this.objectPlayer1                  = new ObjectPlayer(5, 5, 384, 16);

    },
    update              : function(){

        this.objectPlayer1.Update           (0, 30);

    }

};