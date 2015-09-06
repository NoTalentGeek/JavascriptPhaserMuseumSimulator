stateMain = {

    create              : function(){

        game.stage.backgroundColor          = 0x45283c;

        this.objectPlayerArray              = new Array();
        for(var i = 0; i < 18; i ++){

            var name                        = 'NONAME';
            var objectPlayer                = new ObjectPlayer (5, 5 + (32*i) , 384 , 16, name );
            if     (i < 10  ){ var name     = 'Player00' + i + ' || ' + objectPlayer.player.isAI; }
            else if(i < 100 ){ var name     = 'Player0'  + i + ' || ' + objectPlayer.player.isAI; }
            else if(i < 1000){ var name     = 'Player'   + i + ' || ' + objectPlayer.player.isAI; }
            objectPlayer.player.label.text  = name;
            this.objectPlayerArray.push     (objectPlayer);

        }

        this.objectPanelRoom1               = new ObjectPanelRoom (394      , 5      , 'ImagePanel1' , 'ImagePanel2' , 'ImagePanel3' );
        this.objectPanelRoom2               = new ObjectPanelRoom (394 + 316, 5      , 'ImagePanel4' , 'ImagePanel5' , 'ImagePanel6' );
        this.objectPanelRoom3               = new ObjectPanelRoom (394      , 5 + 288, 'ImagePanel7' , 'ImagePanel8' , 'ImagePanel9' );
        this.objectPanelRoom4               = new ObjectPanelRoom (394 + 316, 5 + 288, 'ImagePanel10', 'ImagePanel11', 'ImagePanel12');

        this.isAIArray                      = new Array();
        this.isAIArrayPrevious              = this.isAIArray;

    },

    update              : function(){

        for(var i = 0; i < 18; i ++){

            this.objectPlayerArray[i].Update(0, 30);            

            if     (i < 10  ){ var name     = 'Player00' + i + ' || ' + this.objectPlayerArray[i].player.isAI; }
            else if(i < 100 ){ var name     = 'Player0'  + i + ' || ' + this.objectPlayerArray[i].player.isAI; }
            else if(i < 1000){ var name     = 'Player'   + i + ' || ' + this.objectPlayerArray[i].player.isAI; }
            this.objectPlayerArray[i].player.label.text  = name;

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
        
    }

};