stateMain = {

    create              : function(){

        game.stage.backgroundColor          = 0x45283c;
        this.objectPlayer1                  = new ObjectPlayer(5, 5     , 384, 16, 'Mikael Kristya');
        this.objectPlayer2                  = new ObjectPlayer(5, 5 + 32, 384, 16, 'Aaron Matthew' );

        this.frameRoom1                     = game.add.sprite(394, 5, 'ImageFrame1');
        this.frameRoom1.anchor.setTo        (0.5, 0.5);
        this.frameRoom1.width               = 316;
        this.frameRoom1.height              = 16;
        this.frameRoom1.x                   = this.frameRoom1.x + (this.frameRoom1.width/2);
        this.frameRoom1.y                   = this.frameRoom1.y + (this.frameRoom1.height/2);
        this.labelFontSize                  = this.frameRoom1.height*(3/4);
        this.labelStyle                     = { 'fontSize': this.labelFontSize };
        this.frameRoom1Label                = game.add.text(this.frameRoom1.x, this.frameRoom1.y + (this.labelFontSize/4), 'European History Room', this.labelStyle);
        this.frameRoom1Label.anchor.setTo   (0.5, 0.5);

        this.frameRoom2                     = game.add.sprite(710, 5, 'ImageFrame1');
        this.frameRoom2.width               = 316;
        this.frameRoom2.height              = 16;

    },
    update              : function(){

        this.objectPlayer1.Update           (0, 30);
        this.objectPlayer2.Update           (0, 30);

    }

};