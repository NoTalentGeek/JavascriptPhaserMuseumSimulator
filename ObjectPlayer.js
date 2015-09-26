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

ObjectPlayer.prototype.Auto             = function(_arrayExhibition){

    this.timeCurrentExhibition ++;

    if(Math.random() > 1 - (this.timeCurrentExhibition/100)){

        var index = Math.floor((Math.random()*_arrayExhibition.length) + 0);
        for(var i = 0; i < this.exhibitionVisited.length; i ++){

            var loop = 0;
            while(this.FindIndex(_arrayExhibition, this.exhibitionVisited[i]) == index){

                loop ++;
                index  =  Math.floor((Math.random()*this.exhibitionMax) + 0);
                if(loop == this.exhibitionVisited.length){ break; }

            }

        }
        this.ExhibitionMove                 (_arrayExhibition[index].objectNameAlt);
        this.timeCurrentExhibition          = 0;
        return true;

    }
    else{ return false; }

};

ObjectPlayer.prototype.ExhibitionMove   = function(_exhibition){

    this.exhibitionCurrent              = _exhibition;
    this.exhibitionVisited              .push(_exhibition);

};

ObjectPlayer.prototype.FindIndex        = function(_arrayTarget, _variableValue){

    for(var i = 0; i < _arrayTarget.length; i ++){
        if(_arrayTarget[i]['nameObjectAlt'] == _variableValue){ return i; }
    }
    return undefined;

};