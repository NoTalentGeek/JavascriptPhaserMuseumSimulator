ObjectPlayer                        = function(_exhibitionStart){

    //PENDING: Please add verifications to the arguments.
    this.exhibitionCurrent          = _exhibitionStart;
    this.exhibitionTarget           = new Array();
    this.exhibitionVisited          = new Array();
    this.tagsFavorite               = new Array();
    this.tagsPoint                  = new Array();
    this.timeCurrentExhibition      = 0;
    this.timeTotal                  = 0;

};
ObjectPlayer.prototype.constructor  = ObjectPlayer;