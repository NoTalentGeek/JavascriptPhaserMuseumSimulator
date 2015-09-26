/*The holy shit hard coded version of previous milestone.
Definetely not a good practice.*/
ObjectPanelRoom 						= function(_x, _y, _roomName, _exhibitionNameArray, _sprite1, _sprite2, _sprite3){

    this.roomName                       = _roomName;
    this.exhibitionName                 = _exhibitionNameArray;

    this.systemManagerName              = new SystemManagerName();

	this.panelRoom                      = new ObjectPanel   (_x                                                                                           , _y                                                                                                                              , 316, 16 , _sprite1, this.roomName             );
        
    this.panelExhibition1               = new ObjectPanel   (this.panelRoom.panel.x - (this.panelRoom.panel.width/2)                                      , this.panelRoom.panel.y + (this.panelRoom.panel.height/2)                                                                        , 158, 16 , _sprite2, this.exhibitionName[0]    );
    this.panelTags1Array                = this.systemManagerName.AddRandomTags();
    this.panelTags1String               = '';
    for(var i = 0; i < this.panelTags1Array.length; i ++){

        if(i == this.panelTags1Array.length - 1){ this.panelTags1String = this.panelTags1String + this.panelTags1Array[i];        }
        else                                    { this.panelTags1String = this.panelTags1String + this.panelTags1Array[i] + '\n'; }

    }
    this.panelTags1                     = new ObjectPanel   (this.panelExhibition1.panel.x - (this.panelExhibition1.panel.width/2)                        , this.panelExhibition1.panel.y + (this.panelExhibition1.panel.height/2)                                                          , 158, 120, _sprite3, this.panelTags1String     );
    this.panelTags1.panelLabel.y        = this.panelTags1   .panelLabel.y - (this.panelExhibition1.panel.height/2);
    
    this.panelExhibition2               = new ObjectPanel   (this.panelRoom.panel.x - (this.panelRoom.panel.width/2) + this.panelExhibition1.panel.width  , this.panelRoom.panel.y + (this.panelRoom.panel.height/2)                                                                        , 158, 16 , _sprite2, this.exhibitionName[1]    );
    this.panelTags2Array                = this.systemManagerName.AddRandomTags();
    this.panelTags2String               = '';
    for(var i = 0; i < this.panelTags2Array.length; i ++){

        if(i == this.panelTags2Array.length - 1){ this.panelTags2String = this.panelTags2String + this.panelTags2Array[i];        }
        else                                    { this.panelTags2String = this.panelTags2String + this.panelTags2Array[i] + '\n'; }

    }
    this.panelTags2                     = new ObjectPanel   (this.panelExhibition2.panel.x - (this.panelExhibition2.panel.width/2)                        , this.panelExhibition2.panel.y + (this.panelExhibition2.panel.height/2)                                                          , 158, 120, _sprite3, this.panelTags2String     );
    this.panelTags2.panelLabel.y        = this.panelTags2   .panelLabel.y - (this.panelExhibition2.panel.height/2);
    
    this.panelExhibition3               = new ObjectPanel   (this.panelRoom.panel.x - (this.panelRoom.panel.width/2)                                      , this.panelRoom.panel.y + this.panelRoom.panel.height + (this.panelExhibition1.panel.height/2) + this.panelTags1.panel.height    , 158, 16 , _sprite2, this.exhibitionName[2]    );
    this.panelTags3Array                = this.systemManagerName.AddRandomTags();
    this.panelTags3String               = '';
    for(var i = 0; i < this.panelTags3Array.length; i ++){

        if(i == this.panelTags3Array.length - 1){ this.panelTags3String = this.panelTags3String + this.panelTags3Array[i];        }
        else                                    { this.panelTags3String = this.panelTags3String + this.panelTags3Array[i] + '\n'; }

    }
    this.panelTags3                     = new ObjectPanel   (this.panelExhibition3.panel.x - (this.panelExhibition3.panel.width/2)                        , this.panelExhibition3.panel.y + (this.panelExhibition3.panel.height/2)                                                          , 158, 120, _sprite3, this.panelTags3String     );
    this.panelTags3.panelLabel.y        = this.panelTags3   .panelLabel.y - (this.panelExhibition3.panel.height/2);
    
    this.panelExhibition4               = new ObjectPanel   (this.panelRoom.panel.x - (this.panelRoom.panel.width/2) + this.panelExhibition1.panel.width  , this.panelRoom.panel.y + this.panelRoom.panel.height + (this.panelExhibition2.panel.height/2) + this.panelTags2.panel.height    , 158, 16 , _sprite2, this.exhibitionName[3]    );
    this.panelTags4Array                = this.systemManagerName.AddRandomTags();
    this.panelTags4String               = '';
    for(var i = 0; i < this.panelTags4Array.length; i ++){

        if(i == this.panelTags4Array.length - 1){ this.panelTags4String = this.panelTags4String + this.panelTags4Array[i];        }
        else                                    { this.panelTags4String = this.panelTags4String + this.panelTags4Array[i] + '\n'; }

    }
    this.panelTags4                     = new ObjectPanel   (this.panelExhibition4.panel.x - (this.panelExhibition4.panel.width/2)                        , this.panelExhibition4.panel.y + (this.panelExhibition4.panel.height/2)                                                          , 158, 120, _sprite3, this.panelTags4String     );
    this.panelTags4.panelLabel.y        = this.panelTags4  .panelLabel.y - (this.panelExhibition4.panel.height/2);

};
ObjectPanelRoom.prototype.constructor 	= ObjectPanelRoom;
ObjectPanelRoom.prototype.Update        = function(_roomIndex, _playerArray){

    this.panelRoom.visitor          = 0;
    this.panelExhibition1.visitor   = 0;
    this.panelExhibition2.visitor   = 0;
    this.panelExhibition3.visitor   = 0;
    this.panelExhibition4.visitor   = 0;

    for(var i = 0; i < _playerArray.length; i ++){

        if(_roomIndex == 1){

            if(_playerArray[i].exhibitionCurrent == 0) { this.panelExhibition1.visitor ++; }
            if(_playerArray[i].exhibitionCurrent == 1) { this.panelExhibition2.visitor ++; }
            if(_playerArray[i].exhibitionCurrent == 2) { this.panelExhibition3.visitor ++; }
            if(_playerArray[i].exhibitionCurrent == 3) { this.panelExhibition4.visitor ++; }

            if(this.panelExhibition1.visitor >= 3){ this.panelExhibition1.isCrowded = true; }
            else                                  { this.panelExhibition1.isCrowded = false }
            if(this.panelExhibition2.visitor >= 3){ this.panelExhibition2.isCrowded = true; }
            else                                  { this.panelExhibition2.isCrowded = false }
            if(this.panelExhibition3.visitor >= 3){ this.panelExhibition3.isCrowded = true; }
            else                                  { this.panelExhibition3.isCrowded = false }
            if(this.panelExhibition4.visitor >= 3){ this.panelExhibition4.isCrowded = true; }
            else                                  { this.panelExhibition4.isCrowded = false }

        }
        if(_roomIndex == 2){

            if(_playerArray[i].exhibitionCurrent == 4) { this.panelExhibition1.visitor ++; }
            if(_playerArray[i].exhibitionCurrent == 5) { this.panelExhibition2.visitor ++; }
            if(_playerArray[i].exhibitionCurrent == 6) { this.panelExhibition3.visitor ++; }
            if(_playerArray[i].exhibitionCurrent == 7) { this.panelExhibition4.visitor ++; }

            if(this.panelExhibition1.visitor >= 3){ this.panelExhibition1.isCrowded = true; }
            else                                  { this.panelExhibition1.isCrowded = false }
            if(this.panelExhibition2.visitor >= 3){ this.panelExhibition2.isCrowded = true; }
            else                                  { this.panelExhibition2.isCrowded = false }
            if(this.panelExhibition3.visitor >= 3){ this.panelExhibition3.isCrowded = true; }
            else                                  { this.panelExhibition3.isCrowded = false }
            if(this.panelExhibition4.visitor >= 3){ this.panelExhibition4.isCrowded = true; }
            else                                  { this.panelExhibition4.isCrowded = false }

        }
        if(_roomIndex == 3){

            if(_playerArray[i].exhibitionCurrent == 8) { this.panelExhibition1.visitor ++; }
            if(_playerArray[i].exhibitionCurrent == 9) { this.panelExhibition2.visitor ++; }
            if(_playerArray[i].exhibitionCurrent == 10){ this.panelExhibition3.visitor ++; }
            if(_playerArray[i].exhibitionCurrent == 11){ this.panelExhibition4.visitor ++; }

            if(this.panelExhibition1.visitor >= 3){ this.panelExhibition1.isCrowded = true; }
            else                                  { this.panelExhibition1.isCrowded = false }
            if(this.panelExhibition2.visitor >= 3){ this.panelExhibition2.isCrowded = true; }
            else                                  { this.panelExhibition2.isCrowded = false }
            if(this.panelExhibition3.visitor >= 3){ this.panelExhibition3.isCrowded = true; }
            else                                  { this.panelExhibition3.isCrowded = false }
            if(this.panelExhibition4.visitor >= 3){ this.panelExhibition4.isCrowded = true; }
            else                                  { this.panelExhibition4.isCrowded = false }

        }
        if(_roomIndex == 4){

            if(_playerArray[i].exhibitionCurrent == 12){ this.panelExhibition1.visitor ++; }
            if(_playerArray[i].exhibitionCurrent == 13){ this.panelExhibition2.visitor ++; }
            if(_playerArray[i].exhibitionCurrent == 14){ this.panelExhibition3.visitor ++; }
            if(_playerArray[i].exhibitionCurrent == 15){ this.panelExhibition4.visitor ++; }

            if(this.panelExhibition1.visitor >= 3){ this.panelExhibition1.isCrowded = true; }
            else                                  { this.panelExhibition1.isCrowded = false }
            if(this.panelExhibition2.visitor >= 3){ this.panelExhibition2.isCrowded = true; }
            else                                  { this.panelExhibition2.isCrowded = false }
            if(this.panelExhibition3.visitor >= 3){ this.panelExhibition3.isCrowded = true; }
            else                                  { this.panelExhibition3.isCrowded = false }
            if(this.panelExhibition4.visitor >= 3){ this.panelExhibition4.isCrowded = true; }
            else                                  { this.panelExhibition4.isCrowded = false }

        }

    }
    this.panelRoom.visitor                = this.panelExhibition1.visitor + this.panelExhibition2.visitor + this.panelExhibition3.visitor + this.panelExhibition4.visitor;
    this.panelRoom       .panelLabel.text = this.roomName                       + ' || ' + this.panelRoom.visitor;
    var isCrowdedTemporaryExhibition1     = (this.panelExhibition1.isCrowded) ? 'TRU' : 'FAL';
    var isCrowdedTemporaryExhibition2     = (this.panelExhibition2.isCrowded) ? 'TRU' : 'FAL';
    var isCrowdedTemporaryExhibition3     = (this.panelExhibition3.isCrowded) ? 'TRU' : 'FAL';
    var isCrowdedTemporaryExhibition4     = (this.panelExhibition4.isCrowded) ? 'TRU' : 'FAL';
    this.panelExhibition1.panelLabel.text = this.exhibitionName[_roomIndex - 1] + ' || ' + this.panelExhibition1.visitor + ' || ' + isCrowdedTemporaryExhibition1;
    this.panelExhibition2.panelLabel.text = this.exhibitionName[_roomIndex - 1] + ' || ' + this.panelExhibition2.visitor + ' || ' + isCrowdedTemporaryExhibition2;
    this.panelExhibition3.panelLabel.text = this.exhibitionName[_roomIndex - 1] + ' || ' + this.panelExhibition3.visitor + ' || ' + isCrowdedTemporaryExhibition3;
    this.panelExhibition4.panelLabel.text = this.exhibitionName[_roomIndex - 1] + ' || ' + this.panelExhibition4.visitor + ' || ' + isCrowdedTemporaryExhibition4;

};