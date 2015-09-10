ObjectPanel                         = function(_x, _y, _width, _height, _sprite, _panelName){

    this.visitor                    = 0;

    this.panel                      = game.add.sprite(_x, _y, _sprite);
    this.panel.anchor.setTo         (0.5, 0.5);
    this.panel.width                = _width;
    this.panel.height               = _height;
    this.panel.x                    = this.panel.x + (this.panel.width/2);
    this.panel.y                    = this.panel.y + (this.panel.height/2);
    this.labelFontSize              = 12;
    //this.labelFontSize            = this.panel.height*(3/4);
    this.labelStyle                 = { 'fontSize': this.labelFontSize };
    this.panelLabel                 = game.add.text(this.panel.x, this.panel.y + (this.labelFontSize/4), _panelName, this.labelStyle);
    this.panelLabel.anchor.setTo    (0.5, 0.5);

};
ObjectPanel.prototype.constructor   = ObjectPanel;