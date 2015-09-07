stateMain = {

    create              : function(){

        game.stage.backgroundColor  = 0x45283C;
        this.objectPlayerArray      = new Array();
        this.isAIArray              = new Array();

        for(var i = 0; i < 18; i ++){

            var name                        = 'NONAME';
            var  objectPlayer               = new ObjectPlayer (5, 5 + (32*i) , 384 , 16, name);
            this.ObjectPlayerName           (i, objectPlayer);
            this.objectPlayerArray.push     (objectPlayer);

        }

        this.systemManagerName                  = new SystemManagerName();
        
        this.objectPanelRoom1                   = new ObjectPanelRoom (394      , 5      , this.systemManagerName.AddName(0, this.systemManagerName.nameRoomArray) , this.systemManagerName.nameExhibitionAfrikanArray      , 'ImagePanel1' , 'ImagePanel2' , 'ImagePanel3' );
        this.objectPanelRoom2                   = new ObjectPanelRoom (394 + 316, 5      , this.systemManagerName.AddName(1, this.systemManagerName.nameRoomArray) , this.systemManagerName.nameExhibitionAmericanArray     , 'ImagePanel4' , 'ImagePanel5' , 'ImagePanel6' );
        this.objectPanelRoom3                   = new ObjectPanelRoom (394      , 5 + 288, this.systemManagerName.AddName(2, this.systemManagerName.nameRoomArray) , this.systemManagerName.nameExhibitionAsianArray        , 'ImagePanel7' , 'ImagePanel8' , 'ImagePanel9' );
        this.objectPanelRoom4                   = new ObjectPanelRoom (394 + 316, 5 + 288, this.systemManagerName.AddName(3, this.systemManagerName.nameRoomArray) , this.systemManagerName.nameExhibitionEuropeanArray     , 'ImagePanel10', 'ImagePanel11', 'ImagePanel12');

    },

    update              : function(){

        for(var i = 0; i < 18; i ++){

            this.objectPlayerArray[i].Update    (0, 16);
            this.ObjectPlayerName               (i, this.objectPlayerArray[i]);

            if(!this.objectPlayerArray[i].player.isAI){

                if(this.isAIArray.length < 2){
                    if     (this.isAIArray.length == 0){ this.isAIArray.push(i); }
                    else if(this.isAIArray.length == 1){ if(this.isAIArray[0] != i){ this.isAIArray.push(i); } }
                }

            }

        }

        if(this.isAIArray.length == 2){

            this.objectPlayerArray[this.isAIArray[1]].player.isAI = false;
            for(var i = 0; i < 18; i ++){

                if(i != this.isAIArray[1]){
                    this.objectPlayerArray[i].player.isAI = true;
                }

            }

            this.isAIArray.length = 0;

        }

    },

    ObjectPlayerName    :function(_index, _objectPlayer){

        var name                             = 'NONAME';
        var isAITemporary                    = _objectPlayer.player.isAI;
            isAITemporary                    = (isAITemporary) ? 'TRUE ' : 'FALSE'; 
        if     (_index < 10  ){ var name     = 'PLAYER00' + _index + ' || ' + isAITemporary; }
        else if(_index < 100 ){ var name     = 'PLAYER0'  + _index + ' || ' + isAITemporary; }
        else if(_index < 1000){ var name     = 'PLAYER'   + _index + ' || ' + isAITemporary; }
        _objectPlayer.player.label.text      = name;

    }

};