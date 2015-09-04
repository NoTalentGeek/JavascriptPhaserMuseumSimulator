stateMain = {

    create              : function(){

        game.stage.backgroundColor          = 0x45283c;
        this.objectPlayer1                  = new ObjectPlayer(5, 5     , 384, 16, 'Mikael Kristya');
        this.objectPlayer2                  = new ObjectPlayer(5, 5 + 32, 384, 16, 'Aaron Matthew' );

    },
    update              : function(){

        this.objectPlayer1.Update           (0, 30);
        this.objectPlayer2.Update           (0, 30);

    }

};