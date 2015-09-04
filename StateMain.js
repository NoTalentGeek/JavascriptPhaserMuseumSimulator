stateMain = {

    create              : function(){

        game.stage.backgroundColor          = 0x45283c;

        this.exhibitionSelected             = 0;
        this.exhibitionSelectedPrev         = this.exhibitionSelected;

        this.player                         = new ObjectButton      (5                                    , 5   , 'SsFrame2', function(){}                       , 374                         , 16                       , 'Mikael Kristya'        , 0     , 0  );
        var xPos                            = this.player.button.x + ((this.player.button.width/3)/2);
        var yPos                            = this.player.button.y + this.player.button.height + (this.player.button.height/2);
        this.playerButtonDecrease           = new ObjectButton      (xPos + (this.player.button.width/3)*0, yPos, 'SsFrame1', function(){ this.exhibitionSelected --; } , (this.player.button.width/3), this.player.button.height, '<'                     , 0.5   , 0.5);
        this.playerButtonExhibition         = new ObjectButton      (xPos + (this.player.button.width/3)*1, yPos, 'SsFrame1', function(){}                              , (this.player.button.width/3), this.player.button.height, this.exhibitionSelected , 0.5   , 0.5);
        this.playerButtonIncrease           = new ObjectButton      (xPos + (this.player.button.width/3)*2, yPos, 'SsFrame1', function(){ this.exhibitionSelected ++; } , (this.player.button.width/3), this.player.button.height, '>'                     , 0.5   , 0.5);

    },
    update              : function(){

        if(this.exhibitionSelected                          != this.playerButtonDecrease.exhibitionSelected){

            if(this.playerButtonDecrease.exhibitionSelected >= 30){ this.playerButtonDecrease.exhibitionSelected = 30;}
            if(this.playerButtonDecrease.exhibitionSelected <= 0) { this.playerButtonDecrease.exhibitionSelected = 0; }
            this.exhibitionSelected                         =  this.playerButtonDecrease.exhibitionSelected;
            this.playerButtonIncrease.exhibitionSelected    =  this.playerButtonDecrease.exhibitionSelected;

        }
        if(this.exhibitionSelected                          != this.playerButtonIncrease.exhibitionSelected){

            if(this.playerButtonIncrease.exhibitionSelected >= 30){ this.playerButtonIncrease.exhibitionSelected = 30;}
            if(this.playerButtonIncrease.exhibitionSelected <= 0) { this.playerButtonIncrease.exhibitionSelected = 0; }
            this.exhibitionSelected                         =  this.playerButtonIncrease.exhibitionSelected;
            this.playerButtonDecrease.exhibitionSelected    =  this.playerButtonIncrease.exhibitionSelected;

        }
        this.playerButtonExhibition.label.text              =  this.exhibitionSelected;

    }

};