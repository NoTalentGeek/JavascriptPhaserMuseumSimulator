stateMain = {

    create              : function(){

        game.stage.backgroundColor          = 0x45283c;

        this.objectPlayerArray              = new Array();
        for(var i = 0; i < 18; i ++){

            var objectPlayer                = new ObjectPlayer    (5, 5 + (32*i)     , 384    ,    16, 'Mikael Kristya'              );
            this.objectPlayerArray.push(objectPlayer);

        }

        this.objectPanelRoom1               = new ObjectPanelRoom (394      , 5      , 'ImagePanel1' , 'ImagePanel2' , 'ImagePanel3' );
        this.objectPanelRoom2               = new ObjectPanelRoom (394 + 316, 5      , 'ImagePanel4' , 'ImagePanel5' , 'ImagePanel6' );
        this.objectPanelRoom3               = new ObjectPanelRoom (394      , 5 + 288, 'ImagePanel7' , 'ImagePanel8' , 'ImagePanel9' );
        this.objectPanelRoom4               = new ObjectPanelRoom (394 + 316, 5 + 288, 'ImagePanel10', 'ImagePanel11', 'ImagePanel12');

    },
    update              : function(){

        for(var i = 0; i < 18; i ++){

            this.objectPlayerArray[i].Update(0, 30);

        }

    }

};