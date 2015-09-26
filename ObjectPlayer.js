ObjectPlayer                            = function(_exhibitionStart){

    //PENDING: Please add verifications to the arguments.
    this.exhibitionCurrent              = undefined;
    this.exhibitionTarget               = new Array();
    this.exhibitionVisited              = new Array();
    this.tagsFavorite                   = new Array();
    this.tagsPoint                      = new Array();
    this.timeCurrentExhibition          = 0;
    this.timeTotal                      = 0;

    this.ExhibitionMove                 (_exhibitionStart);

};
ObjectPlayer.prototype.constructor      = ObjectPlayer;
ObjectPlayer.prototype.ExhibitionMove   = function(_exhibition){

    this.exhibitionCurrent              = _exhibition;
    this.exhibitionVisited              .push(_exhibition);

};