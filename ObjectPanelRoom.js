ObjectPanelRoom 						= function(_x, _y, _sprite1, _sprite2, _sprite3){

	this.panelRoom                      = new ObjectPanel   (_x                                                                                           , _y                                                                                             , 316, 16 , _sprite1, 'European History Room'             );
        
    this.panelExhibition1               = new ObjectPanel   (this.panelRoom.panel.x - (this.panelRoom.panel.width/2)                                      , this.panelRoom.panel.y + (this.panelRoom.panel.height/2)                                       , 158, 16 , _sprite2, 'British Ornament'                  );
    this.panelTags1                     = new ObjectPanel   (this.panelExhibition1.panel.x - (this.panelExhibition1.panel.width/2)                        , this.panelExhibition1.panel.y + (this.panelExhibition1.panel.height/2)                         , 158, 120, _sprite3, 'Mysterious\nObedient\nPerfect'     );
    this.panelTags1.panelLabel.y        = this.panelTags1   .panelLabel.y - (this.panelExhibition1.panel.height/2);
    
    this.panelExhibition2               = new ObjectPanel   (this.panelRoom.panel.x - (this.panelRoom.panel.width/2) + this.panelExhibition1.panel.width  , this.panelRoom.panel.y + (this.panelRoom.panel.height/2)                                       , 158, 16 , _sprite2, 'Dutch Ornament'                    );
    this.panelTags2                     = new ObjectPanel   (this.panelExhibition2.panel.x - (this.panelExhibition2.panel.width/2)                        , this.panelExhibition2.panel.y + (this.panelExhibition2.panel.height/2)                         , 158, 120, _sprite3, 'Mysterious\nObedient\nPerfect'     );
    this.panelTags2.panelLabel.y        = this.panelTags2   .panelLabel.y - (this.panelExhibition2.panel.height/2);
    
    this.panelExhibition3               = new ObjectPanel   (this.panelRoom.panel.x - (this.panelRoom.panel.width/2)                                      , this.panelRoom.panel.y + (this.panelRoom.panel.height) + (this.panelTags1.panelLabel.width*2)  , 158, 16 , _sprite2, 'Italian Ornament'                  );
    this.panelTags3                     = new ObjectPanel   (this.panelExhibition3.panel.x - (this.panelExhibition3.panel.width/2)                        , this.panelExhibition3.panel.y + (this.panelExhibition3.panel.height/2)                         , 158, 120, _sprite3, 'Mysterious\nObedient\nPerfect'     );
    this.panelTags3.panelLabel.y        = this.panelTags3   .panelLabel.y - (this.panelExhibition3.panel.height/2);
    
    this.panelExhibition4               = new ObjectPanel   (this.panelRoom.panel.x - (this.panelRoom.panel.width/2) + this.panelExhibition1.panel.width  , this.panelRoom.panel.y + (this.panelRoom.panel.height) + (this.panelTags2.panelLabel.width*2)  , 158, 16 , _sprite2, 'Spanish Ornament'                  );
    this.panelTags4                     = new ObjectPanel   (this.panelExhibition4.panel.x - (this.panelExhibition4.panel.width/2)                        , this.panelExhibition4.panel.y + (this.panelExhibition4.panel.height/2)                         , 158, 120, _sprite3, 'Mysterious\nObedient\nPerfect'     );
    this.panelTags4.panelLabel.y        = this.panelTags4  .panelLabel.y - (this.panelExhibition4.panel.height/2);

};
ObjectPanelRoom.prototype.constructor 	= ObjectPanelRoom;