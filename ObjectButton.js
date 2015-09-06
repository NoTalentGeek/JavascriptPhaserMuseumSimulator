ObjectButton                        = function(_x, _y, _sprite, _func, _width, _height, _label){

    this.exhibitionSelected         = 0;
    this.isAI                       = true;

    this.button                     = game.add.button(_x, _y, _sprite, _func, this, 1, 0);
    this.button.anchor.setTo        (0.5, 0.5);
    this.button.width               = _width;
    this.button.height              = _height;

    this.labelFontSize              = this.button.height*(3/4);
    this.labelStyle                 = { 'fontSize': this.labelFontSize };

    this.label                      = game.add.text(this.button.x, this.button.y + (this.labelFontSize/4), _label, this.labelStyle);
    this.label.anchor.setTo         (0.5, 0.5);

};
ObjectButton.prototype.constructor  = ObjectButton;