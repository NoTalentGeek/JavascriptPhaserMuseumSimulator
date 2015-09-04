stateMain = {

    create              : function(){

        game.stage.backgroundColor          = 0x45283c;
        this.objectPlayer1                  = new ObjectPlayer    (5, 5     , 384    ,    16, 'Mikael Kristya'                    );
        this.objectPlayer2                  = new ObjectPlayer    (5, 5 + 32, 384    ,    16, 'Aaron Matthew'                     );
        this.objectPanelRoom1               = new ObjectPanelRoom (394      , 5      , 'ImagePanel1', 'ImagePanel2', 'ImagePanel3');
        this.objectPanelRoom2               = new ObjectPanelRoom (394 + 316, 5      , 'ImagePanel4', 'ImagePanel5', 'ImagePanel6');
        this.objectPanelRoom3               = new ObjectPanelRoom (394      , 5 + 288, 'ImagePanel7', 'ImagePanel8', 'ImagePanel9');
        this.objectPanelRoom4               = new ObjectPanelRoom (394 + 316, 5 + 288, 'ImagePanel10', 'ImagePanel11', 'ImagePanel12');

        /*
        this.panelRoom1                     = new ObjectPanel   (394                                                                                          , 5                                                                                              , 316, 16 , 'ImagePanel1', 'European History Room'             );
        
        this.panelExhibition1               = new ObjectPanel   (this.panelRoom1.panel.x - (this.panelRoom1.panel.width/2)                                    , this.panelRoom1.panel.y + (this.panelRoom1.panel.height/2)                                     , 158, 16 , 'ImagePanel2', 'British Ornament'                  );
        this.panelTags1                     = new ObjectPanel   (this.panelExhibition1.panel.x - (this.panelExhibition1.panel.width/2)                        , this.panelExhibition1.panel.y + (this.panelExhibition1.panel.height/2)                         , 158, 120, 'ImagePanel3', 'Mysterious\nObedient\nPerfect'     );
        this.panelTags1.panelLabel.y        = this.panelTags1   .panelLabel.y - (this.panelExhibition1.panel.height/2);
        
        this.panelExhibition2               = new ObjectPanel   (this.panelRoom1.panel.x - (this.panelRoom1.panel.width/2) + this.panelExhibition1.panel.width, this.panelRoom1.panel.y + (this.panelRoom1.panel.height/2)                                     , 158, 16 , 'ImagePanel2', 'Dutch Ornament'                    );
        this.panelTags2                     = new ObjectPanel   (this.panelExhibition2.panel.x - (this.panelExhibition2.panel.width/2)                        , this.panelExhibition2.panel.y + (this.panelExhibition2.panel.height/2)                         , 158, 120, 'ImagePanel3', 'Mysterious\nObedient\nPerfect'     );
        this.panelTags2.panelLabel.y        = this.panelTags2   .panelLabel.y - (this.panelExhibition2.panel.height/2);
        
        this.panelExhibition3               = new ObjectPanel   (this.panelRoom1.panel.x - (this.panelRoom1.panel.width/2)                                    , this.panelRoom1.panel.y + (this.panelRoom1.panel.height) + (this.panelTags1.panelLabel.width*2), 158, 16 , 'ImagePanel2', 'Italian Ornament'                  );
        this.panelTags3                     = new ObjectPanel   (this.panelExhibition3.panel.x - (this.panelExhibition3.panel.width/2)                        , this.panelExhibition3.panel.y + (this.panelExhibition3.panel.height/2)                         , 158, 120, 'ImagePanel3', 'Mysterious\nObedient\nPerfect'     );
        this.panelTags3.panelLabel.y        = this.panelTags3   .panelLabel.y - (this.panelExhibition3.panel.height/2);
        
        this.panelExhibition4               = new ObjectPanel   (this.panelRoom1.panel.x - (this.panelRoom1.panel.width/2) + this.panelExhibition1.panel.width, this.panelRoom1.panel.y + (this.panelRoom1.panel.height) + (this.panelTags2.panelLabel.width*2), 158, 16 , 'ImagePanel2', 'Spanish Ornament'                  );
        this.panelTags4                     = new ObjectPanel   (this.panelExhibition4.panel.x - (this.panelExhibition4.panel.width/2)                        , this.panelExhibition4.panel.y + (this.panelExhibition4.panel.height/2)                         , 158, 120, 'ImagePanel3', 'Mysterious\nObedient\nPerfect'     );
        this.panelTags4.panelLabel.y        = this.panelTags4  .panelLabel.y - (this.panelExhibition4.panel.height/2);

        this.panelRoom2                     = new ObjectPanel   (710, 5, 316, 16, 'ImagePanel1', 'Asian History Room');
        */

    },
    update              : function(){

        this.objectPlayer1.Update           (0, 30);
        this.objectPlayer2.Update           (0, 30);

    }

};