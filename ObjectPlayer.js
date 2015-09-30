ObjectPlayer                                        = function(_exhibitionStartString, _exhibitionObjectArray, _roomObjectArray, _floorObjectArray){

    if(

        typeof _exhibitionStartString               === 'string' &&
        typeof _exhibitionObjectArray               === 'object'

    ){

        this.exhibitionCurrentString                = undefined;                /*The current exhibition of which this player resides in.*/
        this.exhibitionObjectArray                  = _exhibitionObjectArray;
        this.roomObjectArray                        = _roomObjectArray;
        this.floorObjectArray                       = _floorObjectArray;
        this.exhibitionTargetStringArray            = new Array();              /*PENDING: Current target exhibition of which has more priority over other exhibitions.*/
        this.exhibitionVisitedStringArray           = new Array();              /*List of exhibition that has been visited by this player.*/
        this.tagMixedArray                          = new Array();              /*PENDING: List of all favorites tags gathered by this player by visiting exhibition.*/
        this.timeCurrentExhibitionNum               = 0;                        /*PENDING: The amount of time this player spent on the current exhibition. Need to be changed to be calculated in second.*/
        this.timeTotalNum                           = 0;                        /*PENDING: The current amount of time this player spent on the whole museum visit. Can be achieved by adding all this.timeCurrentExhibition.*/

        /*Set the this.exhibitionCurrent to _exhibitionStart and also add that things to this.exhibitionVisited.*/
        this.ExhibitionMoveStringArray              (

            _exhibitionStartString,
            this.exhibitionObjectArray,
            this.roomObjectArray,
            this.floorObjectArray

        );

    }
    else{

        console.log                                 ((typeof _exhibitionStartString) + ' supposed to be a string.' );
        console.log                                 ((typeof _exhibitionObjectArray) + ' supposed to be an object.');

    }

};
ObjectPlayer.prototype.constructor                  = ObjectPlayer;

/*AIAutoBool is a function that move this player object automatically to the exahibition.
This function returns true if the player just move to new exhibition and false if the player
    stay in the current exhibition.*/
ObjectPlayer.prototype.AIAutoBool                   = function(){

    /*Verify whether the argument inputted is an object.*/
    if(typeof this.exhibitionObjectArray            === 'object'){

        /*Check wether this player has already visited most exhibitions in the museum.
        I checked the whether the exhibition visited has the same amount of length with total exhibition length.
        It is not necessary for this player to have all exhibitions visited due to there is a chance that this player
            visited same exhibitions twice or more.*/
        if(this.exhibitionObjectArray.length        >= this.exhibitionVisitedStringArray.length){

            /*Increase the amount of time of this player in the current exhibition the visitor visits.
            The more time this player spent time in the exhibition the more chance the visitor will move to the
                new exhibition.
            PENDING: Change the time increment per second add and per frame.*/
            this.timeCurrentExhibitionNum           ++;
            if(Math.random() > (1 - (this.timeCurrentExhibitionNum/100))){

                /*Generate random index number.
                The index number refer to he array list of exhibition objects.
                The index number must not go below 0 and must not go above the length of total exhibition objects.*/
                var indexNum = Math.floor((Math.random()*this.exhibitionObjectArray.length) + 0);

                /*If the index number is the same with the index of the current exhibition then you need to generate
                    new index number until the index is not the same with currently visited exhibition.*/
                while(this.FindIndexNum(this.exhibitionObjectArray, this.exhibitionCurrentString) == indexNum){

                    indexNum = Math.floor((Math.random()*this.exhibitionObjectArray.length) + 0);

                }

                /*If indexNum generates number for exhibition index that has been visited before,
                    this player has a chance of 75% to visit the exhibitions those are not yet visited.
                It is like any visitors in any museums has less chance to visit the exhibition he/she has visited
                    before.
                The code below is to check the availability of index exhibition name in the array of visited exhibitions.
                If the number is above -1 then it means the exhibition at indexNum had been visited before.*/
                if(this.exhibitionVisitedStringArray.indexOf(this.exhibitionObjectArray[indexNum].objectNameAlt) > -1){

                    if(Math.random()    > 0.75){

                        /*Loop counter to prevent near infinite while loop.
                        In case the visitor has visited most of the exhibition it will increase the loop of below while loop,
                            so I add a counter to break the loop in case it is alraedy looped with the same amount of exhibitions in the museum.*/
                        var loopNum     = 0;

                        /*A while loop to generates an index number for exhibition until the index exhibition is an exhibition that
                            this visitor never visited before.*/
                        while(this.exhibitionVisitedStringArray.indexOf(this.exhibitionObjectArray[indexNum].objectNameAlt) > -1){

                            loopNum     ++;
                            indexNum    = Math.floor((Math.random()*this.exhibitionObjectArray.length) + 0);
                            if(loopNum  >= this.exhibitionObjectArray.length){ break; }


                        }
                    }

                }

                /*Move player to the new exhibition.*/
                this.ExhibitionMoveStringArray(

                    this.exhibitionObjectArray[indexNum].objectNameAltString,
                    this.exhibitionObjectArray,
                    this.roomObjectArray,
                    this.floorObjectArray

                );

                /*PENDING: Add time current to total time before reseting it.*/

                this.timeCurrentExhibitionNum   = 0;    /*Reset timer.*/
                return                          true;

            }
            else{ return false; }

        }
        else{ return false; }

    }
    else{

        console.log((typeof this.exhibitionObjectArray) + ' supposed to be an object.'); 
        return false;

    }

};

/*A function to move this player to new exhibition.*/
ObjectPlayer.prototype.ExhibitionMoveStringArray    = function(_exhibitionNameAltString, _exhibitionObjectArray, _roomObjectArray, _floorObjectArray){

    /*Verification of argument inputted.*/
    if(

        typeof _exhibitionNameAltString             === 'string' &&
        typeof _exhibitionObjectArray               === 'object' &&
        typeof _roomObjectArray                     === 'object' &&
        typeof _floorObjectArray                    === 'object'

    ){

        /*Add calculation for the current exhibition array before the this player is moved into new exhibition.*/
        if(this.exhibitionCurrentString             != undefined){

            var exhibitionCurrentObject             = this.FindObject(_exhibitionObjectArray  , this.exhibitionCurrentString);
            var roomCurrentObject                   = this.FindObject(_roomObjectArray        , exhibitionCurrentObject   .objectParentNameAltString);
            var floorCurrentObject                  = this.FindObject(_floorObjectArray       , roomCurrentObject         .objectParentNameAltString);
            exhibitionCurrentObject                 .visitorCurrentNum --;
            roomCurrentObject                       .visitorCurrentNum --;
            floorCurrentObject                      .visitorCurrentNum --;

        }

        this.exhibitionCurrentString                = _exhibitionNameAltString;         /*Change the current eexhibition.*/
        this.exhibitionVisitedStringArray           .push(_exhibitionNameAltString);    /*Push the name of the newly visited exhibition to the array of visited exhibition.*/
        
        /*PENDING: Add a code to check whether the visited exhibition is in the museum.*/

        /*Adding one additional visitor to a new exhibition.*/
        var exhibitionCurrentObject                 = this.FindObject(_exhibitionObjectArray  , this.exhibitionCurrentString);
        var roomCurrentObject                       = this.FindObject(_roomObjectArray        , exhibitionCurrentObject   .objectParentNameAltString);
        var floorCurrentObject                      = this.FindObject(_floorObjectArray       , roomCurrentObject         .objectParentNameAltString);
        exhibitionCurrentObject                     .visitorCurrentNum  ++;
        roomCurrentObject                           .visitorCurrentNum  ++;
        floorCurrentObject                          .visitorCurrentNum  ++;
        exhibitionCurrentObject                     .visitorTotalNum    ++;
        roomCurrentObject                           .visitorTotalNum    ++;
        floorCurrentObject                          .visitorTotalNum    ++;

        for(var i = 0; i < exhibitionCurrentObject.tagStringArray.length; i ++){

            /*Add the tags from exhibition to the this.tagMixedArray.*/
            var tagMixedArray                       = new Array(2);
            tagMixedArray[0]                        = exhibitionCurrentObject.tagStringArray[i];

            var isNewBool                           = true;
            var indexNum                            = undefined;

            for(var j = 0; j < this.tagMixedArray.length; j ++){

                if(tagMixedArray[0] == this.tagMixedArray[j][0]){

                    isNewBool                       = false;
                    indexNum                        = j;
                    break;

                }

            }

            if(isNewBool){

                tagMixedArray[1]                    = 1;
                this.tagMixedArray                  .push(tagMixedArray);

            }
            else if (!isNewBool){ this.tagMixedArray[indexNum][1] = this.tagMixedArray[indexNum][1] + 1; }

        }
        console.log(this.tagMixedArray[0][1]);

        return                                      this.exhibitionVisited;             /*Return the array of visited exhbition.*/

    }
    else{

        console.log     ((typeof _exhibitionNameAltString)  + ' supposed to be a string.');
        console.log     ((typeof _exhibitionObjectArray)    + ' supposed to be a object.');
        console.log     ((typeof _roomObjectArray)          + ' supposed to be a object.');
        console.log     ((typeof _floorObjectArray)         + ' supposed to be a object.');
        return          undefined;

    }

};

/*A function to find the exhibition in an array of object exhibition, based on exhibition's
    name alt.*/
ObjectPlayer.prototype.FindIndexNum                 = function(_exhibitionObjectArray, _exhibitionNameAltString){

    if(

        (typeof _exhibitionObjectArray              === 'object') &&
        (typeof _exhibitionNameAltString            === 'string')

    ){

        /*Loop through the array.*/
        for(var i = 0; i < _exhibitionObjectArray.length; i ++){

            /*Check the variable name of nameObjectAlt one by one per array element.
            i is the index number when the variable name equals with the variable value.*/
            if(_exhibitionObjectArray[i]['objectNameAltString'] == _exhibitionNameAltString){ return i; }

        }
        return undefined;

    }
    else{

        console.log((typeof _exhibitionObjectArray)     + ' is not an object.');
        console.log((typeof _exhibitionNameAltString)   + ' is not a string.');
        return undefined;

    }

};
/*Using the function to find object index, I created another function to return the object instead of the index.*/
ObjectPlayer.prototype.FindObject                   = function(_exhibitionNameObjectArray, _exhibitionNameAltString){

    if(

        (typeof _exhibitionNameObjectArray          === 'object') &&
        (typeof _exhibitionNameAltString            === 'string')

    ){ return _exhibitionNameObjectArray[this.FindIndexNum(_exhibitionNameObjectArray, _exhibitionNameAltString)]; }
    else{

        console.log((typeof _exhibitionNameObjectArray)     + ' is not an object.');
        console.log((typeof _exhibitionNameAltString)       + ' is not a string.');
        return undefined;

    }

};