ObjectButton                        = function(_x, _y, _sprite, _func, _width, _height, _label, _anchorX, _anchorY){

    this.exhibitionSelected         = 0;

    this.button                     = game.add.button(_x, _y, _sprite, _func, this, 1, 0);
    this.button.anchor.setTo        (_anchorX, _anchorY);
    this.button.width               = _width;
    this.button.height              = _height;

    this.labelFontSize              = this.button.height*(3/4);
    this.labelStyle                 = { 'fontSize': this.labelFontSize };

    this.label                      = game.add.text(this.button.x, ((_anchorX == 0.5 || _anchorY == 0.5) ? this.button.y + (this.labelFontSize/4) : this.button.y), _label, this.labelStyle);
    this.label.anchor.setTo         (_anchorX, _anchorY);

};
ObjectButton.prototype.constructor  = ObjectButton;