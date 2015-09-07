ObjectPlayer                        = function(_x, _y, _width, _height, _playerName){

    this.exhibitionAmountVisited    = 0;            //The amount of exhibition that this player has visited.
    this.exhibitionCurrent          = 0;            //Current index of exhibition of which player currently in.
    this.exhibitionTarget           = new Array();  //Target index of three exhibitions those player should visit next.
    this.exhibitionTime             = 0;            //Current time player has spent in an exhibition.
    this.isEnd                      = false;        //Whether this player has finished visiting the museum. 
    this.tagsCollection             = new Array();  //Three highest tags of exhibition that player has visited.

    this.exhibitionSelected         = 0;
    this.exhibitionSelectedPrev     = this.exhibitionSelected;

    this.player                     = new ObjectButton      (_x + (_width/2)                      , _y + (_height/2) , 'SsButton2', function(){ this.isAI = !this.isAI;     }, _width                      , _height                  , _playerName                                    );
    var xPos                        = _x + ((this.player.button.width/3)/2);
    var yPos                        = this.player.button.y + this.player.button.height;
    this.playerButtonDecrease       = new ObjectButton      (xPos + (this.player.button.width/3)*0, yPos             , 'SsButton1', function(){ this.exhibitionSelected --; }, (this.player.button.width/3), this.player.button.height, '<'                                            );
    this.playerButtonExhibition     = new ObjectButton      (xPos + (this.player.button.width/3)*1, yPos             , 'SsButton1', function(){                             }, (this.player.button.width/3), this.player.button.height, 'GO: ' + this.exhibitionSelected               );
    this.playerButtonIncrease       = new ObjectButton      (xPos + (this.player.button.width/3)*2, yPos             , 'SsButton1', function(){ this.exhibitionSelected ++; }, (this.player.button.width/3), this.player.button.height, '>'                                            );

};
ObjectPlayer.prototype.constructor  =  ObjectPlayer;
ObjectPlayer.prototype.Update       =  function(_minExhibition, _maxExhibition){

    if(this.exhibitionSelected                          != this.playerButtonDecrease.exhibitionSelected){

        if(this.playerButtonDecrease.exhibitionSelected >= _maxExhibition){ this.playerButtonDecrease.exhibitionSelected = _maxExhibition;}
        if(this.playerButtonDecrease.exhibitionSelected <= _minExhibition){ this.playerButtonDecrease.exhibitionSelected = _minExhibition; }
        this.exhibitionSelected                         =  this.playerButtonDecrease.exhibitionSelected;
        this.playerButtonIncrease.exhibitionSelected    =  this.playerButtonDecrease.exhibitionSelected;

    }
    if(this.exhibitionSelected                          != this.playerButtonIncrease.exhibitionSelected){

        if(this.playerButtonIncrease.exhibitionSelected >= _maxExhibition){ this.playerButtonIncrease.exhibitionSelected = _maxExhibition;}
        if(this.playerButtonIncrease.exhibitionSelected <= _minExhibition){ this.playerButtonIncrease.exhibitionSelected = _minExhibition; }
        this.exhibitionSelected                         =  this.playerButtonIncrease.exhibitionSelected;
        this.playerButtonDecrease.exhibitionSelected    =  this.playerButtonIncrease.exhibitionSelected;

    }

    var exhibitionSelectedTemporary                     = this.exhibitionSelected;
    if     (exhibitionSelectedTemporary < 10  )         { exhibitionSelectedTemporary = '00' + exhibitionSelectedTemporary; }
    else if(exhibitionSelectedTemporary < 100 )         { exhibitionSelectedTemporary = '0'  + exhibitionSelectedTemporary; }
    else if(exhibitionSelectedTemporary < 1000)         { exhibitionSelectedTemporary =        exhibitionSelectedTemporary; }
    this.playerButtonExhibition.label.text              =  'GO: ' + exhibitionSelectedTemporary;

};