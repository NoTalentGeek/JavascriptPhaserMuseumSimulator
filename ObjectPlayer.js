ObjectPlayer                                            = function(_x, _y, _width, _height, _playerName){

    this.exhibitionMax                                  = 16;

    //PENDING: Tags count.
    this.countAGR                                       = 0;
    this.countBRA                                       = 0;
    this.countCAL                                       = 0;
    this.countDEL                                       = 0;
    this.countEAG                                       = 0;
    this.countFAI                                       = 0;
    this.countGEN                                       = 0;
    this.countHAP                                       = 0;
    this.countJOL                                       = 0;
    this.countKIN                                       = 0;
    this.countLIV                                       = 0;
    this.countNIC                                       = 0;
    this.countOBE                                       = 0;
    this.countPRO                                       = 0;
    this.countREL                                       = 0;
    this.countSIL                                       = 0;
    this.countTHA                                       = 0;
    this.countVIC                                       = 0;
    this.countWIT                                       = 0;
    this.countZEA                                       = 0;

    this.exhibitionVisited                              = new Array();  //The amount of exhibition that this player has visited.
    this.exhibitionCurrent                              = 0;            //Current index of exhibition of which player currently in.
    this.exhibitionTarget                               = new Array();  //Target index of three exhibitions those player should visit next.
    this.exhibitionTime                                 = 0;            //Current time player has spent in an exhibition.
    this.isEnd                                          = false;        //Whether this player has finished visiting the museum. 
    this.tagsCollection                                 = new Array();
    this.tagsCollectionBest                             = new Array();  //Three highest tags of exhibition that player has visited.

    this.tagsCollection.push                            (this.countAGR);
    this.tagsCollection.push                            (this.countBRA);
    this.tagsCollection.push                            (this.countCAL);
    this.tagsCollection.push                            (this.countCAL);
    this.tagsCollection.push                            (this.countEAG);
    this.tagsCollection.push                            (this.countFAI);
    this.tagsCollection.push                            (this.countGEN);
    this.tagsCollection.push                            (this.countHAP);
    this.tagsCollection.push                            (this.countJOL);
    this.tagsCollection.push                            (this.countKIN);
    this.tagsCollection.push                            (this.countLIV);
    this.tagsCollection.push                            (this.countNIC);
    this.tagsCollection.push                            (this.countOBE);
    this.tagsCollection.push                            (this.countPRO);
    this.tagsCollection.push                            (this.countREL);
    this.tagsCollection.push                            (this.countSIL);
    this.tagsCollection.push                            (this.countTHA);
    this.tagsCollection.push                            (this.countVIC);
    this.tagsCollection.push                            (this.countWIT);
    this.tagsCollection.push                            (this.countZEA);

    this.exhibitionSelected                             = 0;
    this.exhibitionSelectedPrev                         = this.exhibitionSelected;


    this.roomIndexTargetValue                           = new Array(this.exhibitionMax);
    for(var i = 0; i < this.roomIndexTargetValue.length; i ++){
        this.roomIndexTargetValue[i] = 0;
    }


    this.player                                         = new ObjectButton      (_x + (_width/2)                      , _y + (_height/2) , 'SsButton2', function(){ this.isAI = !this.isAI;     }, _width                      , _height                  , _playerName                         );
    var xPos                                            = _x + ((this.player.button.width/3)/2);
    var yPos                                            = this.player.button.y + this.player.button.height;
    this.playerButtonDecrease                           = new ObjectButton      (xPos + (this.player.button.width/3)*0, yPos             , 'SsButton1', function(){ this.exhibitionSelected --; }, (this.player.button.width/3), this.player.button.height, '<'                                 );
    this.playerButtonExhibition                         = new ObjectButton      (xPos + (this.player.button.width/3)*1, yPos             , 'SsButton1', function(){                             }, (this.player.button.width/3), this.player.button.height, 'GO: ' + this.exhibitionSelected    );
    this.playerButtonIncrease                           = new ObjectButton      (xPos + (this.player.button.width/3)*2, yPos             , 'SsButton1', function(){ this.exhibitionSelected ++; }, (this.player.button.width/3), this.player.button.height, '>'                                 );

};
ObjectPlayer.prototype.constructor                      =  ObjectPlayer;
ObjectPlayer.prototype.Update                           =  function(_minExhibition, _maxExhibition){

    if(this.exhibitionVisited.length == this.exhibitionMax) { this.isEnd = true; }

    if(this.exhibitionSelected                              != this.playerButtonDecrease.exhibitionSelected){

        if(this.playerButtonDecrease.exhibitionSelected     >= _maxExhibition){ this.playerButtonDecrease.exhibitionSelected = _maxExhibition;}
        if(this.playerButtonDecrease.exhibitionSelected     <= _minExhibition){ this.playerButtonDecrease.exhibitionSelected = _minExhibition; }
        this.exhibitionSelected                             =  this.playerButtonDecrease.exhibitionSelected;
        this.playerButtonIncrease.exhibitionSelected        =  this.playerButtonDecrease.exhibitionSelected;

    }
    if(this.exhibitionSelected                              != this.playerButtonIncrease.exhibitionSelected){

        if(this.playerButtonIncrease.exhibitionSelected     >= _maxExhibition){ this.playerButtonIncrease.exhibitionSelected = _maxExhibition;}
        if(this.playerButtonIncrease.exhibitionSelected     <= _minExhibition){ this.playerButtonIncrease.exhibitionSelected = _minExhibition; }
        this.exhibitionSelected                             =  this.playerButtonIncrease.exhibitionSelected;
        this.playerButtonDecrease.exhibitionSelected        =  this.playerButtonIncrease.exhibitionSelected;

    }

    var exhibitionSelectedTemporary                         = this.exhibitionSelected;
    if     (exhibitionSelectedTemporary < 10  )             { exhibitionSelectedTemporary = '00' + exhibitionSelectedTemporary; }
    else if(exhibitionSelectedTemporary < 100 )             { exhibitionSelectedTemporary = '0'  + exhibitionSelectedTemporary; }
    else if(exhibitionSelectedTemporary < 1000)             { exhibitionSelectedTemporary =        exhibitionSelectedTemporary; }
    this.playerButtonExhibition.label.text                  = 'GO: ' + exhibitionSelectedTemporary;

    //console.log(this.exhibitionVisited);

};
ObjectPlayer.prototype.AddTagsCount                     = function(_arrayTags){

    for(var i = 0; i < _arrayTags.length; i ++){

        switch(_arrayTags[i]){

            case('AGR'): this.countAGR ++; break;
            case('BRA'): this.countBRA ++; break;
            case('CAL'): this.countCAL ++; break;
            case('DEL'): this.countCAL ++; break;
            case('EAG'): this.countEAG ++; break;
            case('FAI'): this.countFAI ++; break;
            case('GEN'): this.countGEN ++; break;
            case('HAP'): this.countHAP ++; break;
            case('JOL'): this.countJOL ++; break;
            case('KIN'): this.countKIN ++; break;
            case('LIV'): this.countLIV ++; break;
            case('NIC'): this.countNIC ++; break;
            case('OBE'): this.countOBE ++; break;
            case('PRO'): this.countPRO ++; break;
            case('REL'): this.countREL ++; break;
            case('SIL'): this.countSIL ++; break;
            case('THA'): this.countTHA ++; break;
            case('VIC'): this.countVIC ++; break;
            case('WIT'): this.countWIT ++; break;
            case('ZEA'): this.countZEA ++; break;

        }

    }

    this.tagsCollection.length                          = 0;
    this.tagsCollectionBest.length                      = 0;
    this.tagsCollection.push                            (this.countAGR);
    this.tagsCollection.push                            (this.countBRA);
    this.tagsCollection.push                            (this.countCAL);
    this.tagsCollection.push                            (this.countCAL);
    this.tagsCollection.push                            (this.countEAG);
    this.tagsCollection.push                            (this.countFAI);
    this.tagsCollection.push                            (this.countGEN);
    this.tagsCollection.push                            (this.countHAP);
    this.tagsCollection.push                            (this.countJOL);
    this.tagsCollection.push                            (this.countKIN);
    this.tagsCollection.push                            (this.countLIV);
    this.tagsCollection.push                            (this.countNIC);
    this.tagsCollection.push                            (this.countOBE);
    this.tagsCollection.push                            (this.countPRO);
    this.tagsCollection.push                            (this.countREL);
    this.tagsCollection.push                            (this.countSIL);
    this.tagsCollection.push                            (this.countTHA);
    this.tagsCollection.push                            (this.countVIC);
    this.tagsCollection.push                            (this.countWIT);
    this.tagsCollection.push                            (this.countZEA);

    var firstBest                   = Math.max.apply(Math, this.tagsCollection);
    var indexFirst                  = this.tagsCollection.indexOf(firstBest);
    this.tagsCollectionBest.push    (indexFirst);
    if(indexFirst > -1)             { this.tagsCollection.splice(indexFirst, 1); }

    var secondBest                  = Math.max.apply(Math, this.tagsCollection);
    var indexSecond                 = this.tagsCollection.indexOf(secondBest);
    if(indexFirst <= indexSecond)   { indexSecond ++; }
    this.tagsCollectionBest.push    (indexSecond);
    if(indexSecond > -1)            { this.tagsCollection.splice(indexSecond, 1); }

    var thirdBest                   = Math.max.apply(Math, this.tagsCollection);
    var indexThird                  = this.tagsCollection.indexOf(thirdBest);
    if(indexSecond <= indexThird)   { indexThird ++; }
    this.tagsCollectionBest.push    (indexThird);
    if(indexThird > -1)             { this.tagsCollection.splice(indexThird, 1); }

}
ObjectPlayer.prototype.AutomaticChangeExhibition        = function(){

    //console.log(this.exhibitionTarget);

    if(this.player.isAI){

        if(Math.random() > 1 - this.exhibitionTime/100){

            var exhibitionCurrentTemporary = Math.floor((Math.random()*this.exhibitionMax) + 0);
            for(var i = 0; i < this.exhibitionVisited.length; i ++){

                while(this.exhibitionVisited[i] == exhibitionCurrentTemporary){

                    exhibitionCurrentTemporary  =  Math.floor((Math.random()*this.exhibitionMax) + 0);

                }

            }
            this.exhibitionCurrent              = exhibitionCurrentTemporary;
            this.exhibitionVisited.push         (this.exhibitionCurrent);
            this.exhibitionTime                 = 0;
            return true;

        }
        else{ return false; }

    }
    else{ return false; }

},
ObjectPlayer.prototype.DetermineTargetExhibition        = function(_roomArray){

    var roomIndex                   = new Array(this.exhibitionMax);

    //Get reference to every possible room tags in the game.
    for(var i = 0; i < roomIndex.length; i ++){

        if     (i <= 3){

            if     ((i + 1)%4 == 0){ roomIndex[i] = _roomArray[0].panelTags4Array; }
            else if((i + 1)%3 == 0){ roomIndex[i] = _roomArray[0].panelTags3Array; }
            else if((i + 1)%2 == 0){ roomIndex[i] = _roomArray[0].panelExhibition2.isCrowded; }
            else if((i + 1)%1 == 0){ roomIndex[i] = _roomArray[0].panelTags1Array; }

        }
        else if(i <= 7){

            if     ((i + 1)%4 == 0){ roomIndex[i] = _roomArray[1].panelTags4Array; }
            else if((i + 1)%3 == 0){ roomIndex[i] = _roomArray[1].panelTags3Array; }
            else if((i + 1)%2 == 0){ roomIndex[i] = _roomArray[1].panelExhibition2.isCrowded; }
            else if((i + 1)%1 == 0){ roomIndex[i] = _roomArray[1].panelTags1Array; }

        }
        else if(i <= 11){

            if     ((i + 1)%4 == 0){ roomIndex[i] = _roomArray[2].panelTags4Array; }
            else if((i + 1)%3 == 0){ roomIndex[i] = _roomArray[2].panelTags3Array; }
            else if((i + 1)%2 == 0){ roomIndex[i] = _roomArray[2].panelExhibition2.isCrowded; }
            else if((i + 1)%1 == 0){ roomIndex[i] = _roomArray[2].panelTags1Array; }

        }
        else if(i <= 15){

            if     ((i + 1)%4 == 0){ roomIndex[i] = _roomArray[3].panelTags4Array; }
            else if((i + 1)%3 == 0){ roomIndex[i] = _roomArray[3].panelTags3Array; }
            else if((i + 1)%2 == 0){ roomIndex[i] = _roomArray[3].panelExhibition2.isCrowded; }
            else if((i + 1)%1 == 0){ roomIndex[i] = _roomArray[3].panelTags1Array; }

        }

    }

    var systemManagerName = new SystemManagerName();
    for(var i = 0; i < 3; i ++){

        for(var j = 0; j < roomIndex.length; j ++){

            for(var k = 0; k < 3; k ++){

                if(systemManagerName.tagArray[this.tagsCollectionBest[i]] != 'undefined'){
                    if(systemManagerName.tagArray[this.tagsCollectionBest[i]] == roomIndex[j][k]){ this.roomIndexTargetValue[j] ++; }
                }

            }

            for(var k = 0; k < this.exhibitionVisited.length; k ++){

                if(j != this.exhibitionVisited[k]){ this.roomIndexTargetValue[j] ++;      }
                if(j == this.exhibitionVisited[k]){ this.roomIndexTargetValue[j] -= 1600; }

            }

        }

    }

    var roomIndexCrowded            = new Array(this.exhibitionMax);
    for(var i = 0; i < roomIndexCrowded.length; i ++){

        if     (i <= 3){

            if     ((i + 1)%4 == 0){ roomIndexCrowded[i] = _roomArray[0].panelExhibition4.isCrowded; }
            else if((i + 1)%3 == 0){ roomIndexCrowded[i] = _roomArray[0].panelExhibition3.isCrowded; }
            else if((i + 1)%2 == 0){ roomIndexCrowded[i] = _roomArray[0].panelExhibition2.isCrowded; }
            else if((i + 1)%1 == 0){ roomIndexCrowded[i] = _roomArray[0].panelExhibition1.isCrowded; }

        }
        else if(i <= 7){

            if     ((i + 1)%4 == 0){ roomIndexCrowded[i] = _roomArray[1].panelExhibition4.isCrowded; }
            else if((i + 1)%3 == 0){ roomIndexCrowded[i] = _roomArray[1].panelExhibition3.isCrowded; }
            else if((i + 1)%2 == 0){ roomIndexCrowded[i] = _roomArray[1].panelExhibition2.isCrowded; }
            else if((i + 1)%1 == 0){ roomIndexCrowded[i] = _roomArray[1].panelExhibition1.isCrowded; }

        }
        else if(i <= 11){

            if     ((i + 1)%4 == 0){ roomIndexCrowded[i] = _roomArray[2].panelExhibition4.isCrowded; }
            else if((i + 1)%3 == 0){ roomIndexCrowded[i] = _roomArray[2].panelExhibition3.isCrowded; }
            else if((i + 1)%2 == 0){ roomIndexCrowded[i] = _roomArray[2].panelExhibition2.isCrowded; }
            else if((i + 1)%1 == 0){ roomIndexCrowded[i] = _roomArray[2].panelExhibition1.isCrowded; }

        }
        else if(i <= 15){

            if     ((i + 1)%4 == 0){ roomIndexCrowded[i] = _roomArray[3].panelExhibition4.isCrowded; }
            else if((i + 1)%3 == 0){ roomIndexCrowded[i] = _roomArray[3].panelExhibition3.isCrowded; }
            else if((i + 1)%2 == 0){ roomIndexCrowded[i] = _roomArray[3].panelExhibition2.isCrowded; }
            else if((i + 1)%1 == 0){ roomIndexCrowded[i] = _roomArray[3].panelExhibition1.isCrowded; }

        }

        for(var j = 0; j < this.exhibitionVisited.length; j ++){

            if(i != this.exhibitionVisited[j]){ this.roomIndexTargetValue[i] ++;      }
            if(i == this.exhibitionVisited[j]){ this.roomIndexTargetValue[i] -= 1600; }

        }

        if(roomIndexCrowded[i]){ this.roomIndexTargetValue[i] -= 1600; }

    }

    //console.log(this.roomIndexTargetValue);

    //DEBUG.
    var debug                       = '';
    var firstHighest                = 0;
    var secondHighest               = 0;
    var thirdHighest                = 0;
    this.exhibitionTarget.length    = 0;
    for(var i = 0; i < 16; i ++){

        debug = debug + ' ' + this.roomIndexTargetValue[i];
        if(thirdHighest < this.roomIndexTargetValue[i]){

            thirdHighest = this.roomIndexTargetValue[i];
            if(thirdHighest > secondHighest){

                var temp = thirdHighest;
                thirdHighest = secondHighest;
                secondHighest = temp;
                if(secondHighest > firstHighest){

                    var temp = secondHighest;
                    secondHighest = firstHighest;
                    firstHighest = temp;

                }

            }

        }

    }

    this.exhibitionTarget.push(this.roomIndexTargetValue.indexOf(firstHighest));
    this.exhibitionTarget.push(this.roomIndexTargetValue.indexOf(secondHighest));
    this.exhibitionTarget.push(this.roomIndexTargetValue.indexOf(thirdHighest));
    //console.log(debug + '   ' + this.exhibitionTarget);

}