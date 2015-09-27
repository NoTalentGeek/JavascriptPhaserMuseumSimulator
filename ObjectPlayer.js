//A player object.
ObjectPlayer                            = function(_exhibitionStart){

    if(typeof _exhibitionStart === 'string'){

        this.exhibitionCurrent              = undefined;    //The current exhibition of which this player resides in.
        this.exhibitionTarget               = new Array();  //PENDING: Current target exhibition of which has more priority over other exhibitions.
        this.exhibitionVisited              = new Array();  //List of exhibition that has been visited by this player.
        this.tagsFavorite                   = new Array();  //PENDING: List of all favorites tags gathered by this player by visiting exhibition.
        this.timeCurrentExhibition          = 0;            //PENDING: The amount of time this player spent on the current exhibition. Need to be changed to be calculated in second.
        this.timeTotal                      = 0;            //PENDING: The current amount of time this player spent on the whole museum visit. Can be achieved by adding all this.timeCurrentExhibition.

        this.ExhibitionMove                 (_exhibitionStart);     //Set the this.exhibitionCurrent to _exhibitionStart and also add that things to this.exhibitionVisited.

    }
    else{ console.log                   ((typeof _exhibitionStart) + ' supposed to be a string.'); }

};
ObjectPlayer.prototype.constructor      = ObjectPlayer;

//A function to let player to be automatically moved within exhibitions.
ObjectPlayer.prototype.Auto             = function(_arrayExhibition){

    if(typeof _arrayExhibition === 'object'){

        if(_arrayExhibition.length >= this.exhibitionVisited.length){
            /*This is the increment of time per exhibition.
            However, this thing supposed to be calculated in second and not per frame.*/
            this.timeCurrentExhibition ++;

            //The more time passes the more chance this visitor will go to change to the new exhibition.
            if(Math.random() > 1 - (this.timeCurrentExhibition/100)){

                /*Should have a method to add exhibition target based on the interest here.
                The priority is as follows:
                    First is the exhibition indexs within the target exhibition.
                    Second is the exhibition that is not yet visited.
                    Third is the exhibition that is not the current exhibition but has been visited before.
                PENDING: Right now the function is just to add random number and check with corresponding
                    this.exhibitionCurrent and this.exhibitionVisited.*/
                var index = Math.floor((Math.random()*_arrayExhibition.length) + 0);

                /*So the exhibition index of this.exhibitionVisited of this.exhibitionVisited.length - 1
                    is the current exhibition and we do not want this player to visit the exhibition
                    he/she currently in, hence I remove that from the loop.*/
                while(this.FindIndex(_arrayExhibition, this.exhibitionVisited[this.exhibitionVisited.length - 1]) == index){

                    index = Math.floor((Math.random()*_arrayExhibition.length) + 0);

                }

                //If the current generated index have been visited before.
                if(this.exhibitionVisited.indexOf(_arrayExhibition[index].objectNameAlt) > -1){

                    //If so there is a big chance 75% if which this visitor will try to seek other exhibition.
                    if(Math.random() > 0.75){

                        var loop = 0;
                        while(this.exhibitionVisited.indexOf(_arrayExhibition[index].objectNameAlt) > -1){

                            loop ++;
                            index  =  Math.floor((Math.random()*_arrayExhibition.length) + 0);
                            if(loop == _arrayExhibition.length){ break; }

                        }

                    }

                }            

                this.ExhibitionMove                 (_arrayExhibition[index].objectNameAlt);    //Move the visitor to the new exhibition.
                this.timeCurrentExhibition          = 0;                                        //Reset the timer.
                return true;

            }

        }
        else{ return false; }

    }
    else{

        console.log((typeof _arrayExhibition) + ' supposed to be an object.'); 
        return false;

    }

};

//A function to move player into a new exhibition and at the exhibition into this.exhibitionVisited.
ObjectPlayer.prototype.ExhibitionMove   = function(_exhibitionNameAlt){

    if(typeof _exhibitionNameAlt === 'string'){

        this.exhibitionCurrent              = _exhibitionNameAlt;
        this.exhibitionVisited              .push(_exhibitionNameAlt);
        return this.exhibitionVisited;

    }
    else{

        console.log((typeof _exhibitionNameAlt) + ' supposed to be a string.');
        return undefined;

    }

};

//Find index number of a variable in an array.
ObjectPlayer.prototype.FindIndex        = function(_arrayTarget, _variableValue){

    if(

        (typeof _arrayTarget     === 'object') &&
        (typeof _variableValue   === 'string')

    ){

        for(var i = 0; i < _arrayTarget.length; i ++){
            if(_arrayTarget[i]['nameObjectAlt'] == _variableValue){ return i; }
        }
        return undefined;

    }
    else{

        console.log((typeof _arrayTarget) + ' is not an object.');
        console.log((typeof _variableValue) + ' is not a string.');
        return undefined;

    }

};