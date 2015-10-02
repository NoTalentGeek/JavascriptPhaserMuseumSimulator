ObjectPlayer                                                    = function(_exhibitionStartString, _exhibitionObjectArray, _roomObjectArray, _floorObjectArray){

    if(

        typeof _exhibitionStartString                           === 'string' &&
        typeof _exhibitionObjectArray                           === 'object' &&
        typeof _roomObjectArray                                 === 'object' &&
        typeof _floorObjectArray                                === 'object'

    ){

        this.exhibitionCurrentString                            = undefined;                /*The current exhibition of which this player resides in.*/
        this.exhibitionObjectArray                              = _exhibitionObjectArray;
        this.roomObjectArray                                    = _roomObjectArray;
        this.floorObjectArray                                   = _floorObjectArray;
        this.exhibitionTargetStringArray                        = new Array();              /*PENDING: Current target exhibition of which has more priority over other exhibitions.*/
        this.exhibitionVisitedStringArray                       = new Array();              /*List of exhibition that has been visited by this player.*/
        this.tagMixedArray                                      = new Array();              /*PENDING: List of all favorites tags gathered by this player by visiting exhibition.*/
        this.timeCurrentExhibitionNum                           = 0;                        /*PENDING: The amount of time this player spent on the current exhibition. Need to be changed to be calculated in second.*/
        this.timeTotalNum                                       = 0;                        /*PENDING: The current amount of time this player spent on the whole museum visit. Can be achieved by adding all this.timeCurrentExhibition.*/

        this.indexNum                                           = 0;
        this.panelXNum                                          = 0;
        this.panelYNum                                          = 0;
        this.panelWidthNum                                      = 0;
        this.panelHeightNum                                     = 0;
        this.panelObject                                        = undefined;

        /*Set the this.exhibitionCurrent to _exhibitionStart and also add that things to this.exhibitionVisited.*/
        this.ExhibitionMoveString                               (

            _exhibitionStartString,
            this.exhibitionObjectArray,
            this.roomObjectArray,
            this.floorObjectArray

        );

    }
    else{

        console.log                                             ((typeof _exhibitionStartString)    + ' supposed to be a string.' );
        console.log                                             ((typeof _exhibitionObjectArray)    + ' supposed to be an object.');
        console.log                                             ((typeof _roomObjectArray)          + ' supposed to be an object.');
        console.log                                             ((typeof _floorObjectArray)         + ' supposed to be an object.');

    }

};
ObjectPlayer.prototype.constructor                              = ObjectPlayer;

/*AIAutoBool is a function that move this player object automatically to the exahibition.
This function returns true if the player just move to new exhibition and false if the player
    stay in the current exhibition.*/
ObjectPlayer.prototype.AIAutoString                             = function(_indexNum, _offsetXNum, _offsetYNum){

    /*Check wether this player has already visited most exhibitions in the museum.
    I checked the whether the exhibition visited has the same amount of length with total exhibition length.
    It is not necessary for this player to have all exhibitions visited due to there is a chance that this player
        visited same exhibitions twice or more.*/
    if(this.exhibitionObjectArray.length                        >= this.exhibitionVisitedStringArray.length){

        /*Increase the amount of time of this player in the current exhibition the visitor visits.
        The more time this player spent time in the exhibition the more chance the visitor will move to the
            new exhibition.
        PENDING: Change the time increment per second add and per frame.*/
        this.timeCurrentExhibitionNum                           ++;

        if(Math.random() > (1 - (this.timeCurrentExhibitionNum/100))){

            this.DetermineExhibitionTargetStringArray();

            /*
            <<This is an old method to generate target exhibitions.>>
            <<Generate random index number.
            The index number refer to he array list of exhibition objects.
            The index number must not go below 0 and must not go above the length of total exhibition objects.>>
            var indexNum = Math.floor((Math.random()*this.exhibitionObjectArray.length) + 0);

            <<If the index number is the same with the index of the current exhibition then you need to generate
                new index number until the index is not the same with currently visited exhibition.>>
            while(this.FindIndexNum(this.exhibitionObjectArray, this.exhibitionCurrentString) == indexNum){

                indexNum = Math.floor((Math.random()*this.exhibitionObjectArray.length) + 0);

            }

            <<If indexNum generates number for exhibition index that has been visited before,
                this player has a chance of 75% to visit the exhibitions those are not yet visited.
            It is like any visitors in any museums has less chance to visit the exhibition he/she has visited
                before.
            The code below is to check the availability of index exhibition name in the array of visited exhibitions.
            If the number is above -1 then it means the exhibition at indexNum had been visited before.>>
            if(this.exhibitionVisitedStringArray.indexOf(this.exhibitionObjectArray[indexNum].objectNameAlt) > -1){

                if(Math.random()    > 0.75){

                    <<Loop counter to prevent near infinite while loop.
                    In case the visitor has visited most of the exhibition it will increase the loop of below while loop,
                        so I add a counter to break the loop in case it is alraedy looped with the same amount of exhibitions in the museum.>>
                    var loopNum     = 0;

                    <<A while loop to generates an index number for exhibition until the index exhibition is an exhibition that
                        this visitor never visited before.>>
                    while(this.exhibitionVisitedStringArray.indexOf(this.exhibitionObjectArray[indexNum].objectNameAlt) > -1){

                        loopNum     ++;
                        indexNum    = Math.floor((Math.random()*this.exhibitionObjectArray.length) + 0);
                        if(loopNum  >= this.exhibitionObjectArray.length){ break; }


                    }
                }

            }
            */

            /*Move player to the new exhibition.*/
            var randomIndexNum      = Math.floor((Math.random()*this.exhibitionTargetStringArray.length) + 0);
            var newExhibitionString = this.ExhibitionMoveString(

                this.exhibitionTargetStringArray[randomIndexNum],
                this.exhibitionObjectArray,
                this.roomObjectArray,
                this.floorObjectArray

            );
            this.CreatePanelVoid(_indexNum, _offsetXNum, _offsetYNum);

            /*PENDING: Add time current to total time before reseting it.*/

            this.timeCurrentExhibitionNum   = 0;    /*Reset timer.*/
            return                          newExhibitionString;

        }
        else{ return undefined; }

    }
    else{ return undefined; }

};

/*Ascending comparison function.*/
/*
ObjectPlayer.prototype.CompareTagNum                            = function(_elementMixedArray1, _elementMixedArray2){

    return _elementMixedArray1[1] - _elementMixedArray2[1];

};
*/
/*Descending comparison function.*/
ObjectPlayer.prototype.CompareTagNum                            = function(_elementMixedArray1, _elementMixedArray2){

    return _elementMixedArray2[1] - _elementMixedArray1[1];

};

ObjectPlayer.prototype.CreatePanelVoid                          = function(_indexNum, _offsetXNum, _offsetYNum){

    if(this.panelObject != undefined)                           { this.panelObject.destroy(true);}

    this.indexNum                                               = _indexNum;

    var exhibitionCurrentObject                                 = this.FindObject(this.exhibitionObjectArray, this.exhibitionCurrentString);

    /*These lines of codes below is to determine the width and the height of the panel.
    For object other than floor object you need to compare the width and height based on the parent object.*/
    this.panelXNum                                              = exhibitionCurrentObject.panelXNum;
    this.panelYNum                                              = exhibitionCurrentObject.panelYNum + ((this.indexNum + 1)*this.panelHeightNum) + ((this.indexNum + 1)*_offsetYNum);
    this.panelWidthNum                                          = exhibitionCurrentObject.panelWidthNum;
    this.panelHeightNum                                         = exhibitionCurrentObject.panelHeightNum;

    /*Create the panel image here.*/
    this.panelObject                                            = game.add.sprite(

        this.panelXNum,
        this.panelYNum,
        'ImagePanel5New'

    );

    /*Set the width and the height for the object to meet the variables we have made before.*/
    this.panelObject.width                                      = this.panelWidthNum;
    this.panelObject.height                                     = this.panelHeightNum;
    /*Refer back the panel x and y position to the variables for easy referencing.*/
    this.panelObject.x                                          = exhibitionCurrentObject.panelXNum;
    //this.panelObject.y                                          = exhibitionCurrentObject.panelYNum;

};

ObjectPlayer.prototype.DetermineExhibitionTargetStringArray     = function(){

    /*Need to empty the array whenever this player is looking for another exhibitions.*/
    this.exhibitionTargetStringArray = [];

    /*Stage one sort.
    Stage one sort is to remove the currently visited exhibition from the target exhibition index.
    So that the player have no chance on visiting the exhibition that he/she  currently visits.*/
    for(var i = 0; i < this.exhibitionObjectArray.length; i ++){

        /*Compare the current exihibition with the object exhibitiob array.
        After that remove the object exhibition that is the current exhibition and put the rest
            of the exhibition in the target exhibition array string.*/
        if(this.exhibitionCurrentString != this.exhibitionObjectArray[i].objectNameAltString){

            this.exhibitionTargetStringArray.push(this.exhibitionObjectArray[i].objectNameAltString);

        }

    }
    //console.log('Stage one: ' + this.exhibitionTargetStringArray.length);

    /*Stage two sort.
    Stage two sort is to make the exhibition that has been visited before has 90% chance to make into target exhibition.
    For example the visitor is now in the Exhibition C as he/she used to visits Exhibition A and Exhibition B before,
        the system now will let Exhibition A and Exhibition B to have 10% chance to be not removed from the target
        exhibition array.*/
    for(var i = 0; i < this.exhibitionVisitedStringArray.length; i ++){

        for(var j = 0; j < this.exhibitionTargetStringArray.length; j ++){

            /*Compare the target exhibitions with all visited exhibition.
            If it matches then the corresponding exhibition has 90% chance to be deleted
                from target exhibition array.*/
            if(this.exhibitionVisitedStringArray[i] == this.exhibitionTargetStringArray[j]){

                if(Math.random() < 0.90){ this.exhibitionTargetStringArray.splice(j, 1); }

                /*After each splice make sure to have the exhibition target length to be 3.
                If not 3 elements in the target exhibition array, then return the last 3 elements
                    of target exhibition array ever exist.*/
                if(this.exhibitionTargetStringArray.length == 3){ return this.exhibitionTargetStringArray; }

            }

        }

    }
    //console.log('Stage two: ' + this.exhibitionTargetStringArray.length);

    /*Stage three sort.
    So now this application compare the the most visited tags from this player profile (take three most visited tags)
        and compared to the exhibition tag.
    Each exhibition has 3 tags so,
        if nothing match the exhibition is excluded from from the target exhibition array,
        if one tag is match the exhibition has 66% chance of being removed from the target exhibition array,
        if two tags are match the exhibition has 33% chance of being removed from the target exhibition array,
        if three tags are match the exhibition will stay in the target exhibition array.*/
    var tempTagStringArray = new Array(3);
    for(var i = 0; i < tempTagStringArray.length; i ++){ tempTagStringArray[i] = this.tagMixedArray[i][0]; }
    for(var i = 0; i < this.exhibitionTargetStringArray.length; i ++){

        var exhibitionTargetObject      = this.FindObject(this.exhibitionObjectArray, this.exhibitionTargetStringArray[i]);
        var tagSameCountNum             = 0;
        for(var j = 0; j < exhibitionTargetObject.tagStringArray.length; j ++){

            for(var k = 0; k < tempTagStringArray.length; k ++){

                if(exhibitionTargetObject.tagStringArray[j] == tempTagStringArray[k]){ tagSameCountNum ++; }

            }

        }
        
        if      (tagSameCountNum == 0)          { this.exhibitionTargetStringArray.splice(i, 1); }
        else if (tagSameCountNum == 1)          { if(Math.random() < 0.66){ this.exhibitionTargetStringArray.splice(i, 1); } }
        else if (tagSameCountNum == 2)          { if(Math.random() < 0.33){ this.exhibitionTargetStringArray.splice(i, 1); } }
        else if (tagSameCountNum == 3)          {  }

        /*After each splice make sure to have the exhibition target length to be 3.
        If not 3 elements in the target exhibition array, then return the last 3 elements
            of target exhibition array ever exist.*/
        if(this.exhibitionTargetStringArray.length == 3){ return this.exhibitionTargetStringArray; }

    }
    //console.log('Stage three: ' + this.exhibitionTargetStringArray.length);

    /*Stage four sort.
    The fourth sort is to make the exhibition target that are not in the same floor of which player's
        current exhibition to have 50% chance of stay.*/
    var exhibitionCurrentObject         = this.FindObject(this.exhibitionObjectArray, this.exhibitionCurrentString);
    var exhibitionFloorString           = exhibitionCurrentObject.objectFloorString;
    for(var i = 0; i < this.exhibitionTargetStringArray.length; i ++){

        var exhibitionTargetObject      =  this.FindObject(this.exhibitionObjectArray, this.exhibitionTargetStringArray[i]);
        var exhibitionTargetFloorString =  exhibitionTargetObject.objectFloorString;
        if(exhibitionTargetFloorString  != exhibitionFloorString){ if(Math.random() < 0.50){ this.exhibitionTargetStringArray.splice(i, 1); } }

        /*After each splice make sure to have the exhibition target length to be 3.
        If not 3 elements in the target exhibition array, then return the last 3 elements
            of target exhibition array ever exist.*/
        if(this.exhibitionTargetStringArray.length == 3){ return this.exhibitionTargetStringArray; }

    }
    //console.log('Stage four: ' + this.exhibitionTargetStringArray.length);

    /*Stage five sort.
    The fifth sort is to make the exhibition target that are not in the same room of which player's
        current exhibition to have 50% chance of stay.*/
    var exhibitionCurrentObject         = this.FindObject(this.exhibitionObjectArray, this.exhibitionCurrentString);
    var exhibitionRoomString            = exhibitionCurrentObject.objectFloorString;
    for(var i = 0; i < this.exhibitionTargetStringArray.length; i ++){

        var exhibitionTargetObject      =  this.FindObject(this.exhibitionObjectArray, this.exhibitionTargetStringArray[i]);
        var exhibitionTargetRoomString  =  exhibitionTargetObject.objectRoomString;
        if(exhibitionTargetRoomString   != exhibitionRoomString){ if(Math.random() < 0.50){ this.exhibitionTargetStringArray.splice(i, 1); } }

        /*After each splice make sure to have the exhibition target length to be 3.
        If not 3 elements in the target exhibition array, then return the last 3 elements
            of target exhibition array ever exist.*/
        if(this.exhibitionTargetStringArray.length == 3){ return this.exhibitionTargetStringArray; }

    }
    //console.log('Stage five: ' + this.exhibitionTargetStringArray.length);

    /*In case in the end of final sort the target exhibition array have length more than 3, make it just have 3 elements.*/
    this.exhibitionTargetStringArray.splice(3, this.exhibitionObjectArray.length);

    return this.exhibitionTargetStringArray;

};

/*A function to move this player to new exhibition.*/
ObjectPlayer.prototype.ExhibitionMoveString                     = function(_exhibitionNameAltString, _exhibitionObjectArray, _roomObjectArray, _floorObjectArray){

    /*Verification of argument inputted.*/
    if(

        typeof _exhibitionNameAltString                         === 'string' &&
        typeof _exhibitionObjectArray                           === 'object' &&
        typeof _roomObjectArray                                 === 'object' &&
        typeof _floorObjectArray                                === 'object'

    ){

        /*Add calculation for the current exhibition array before the this player is moved into new exhibition.*/
        if(this.exhibitionCurrentString                         != undefined){

            var exhibitionCurrentObject                         = this.FindObject(_exhibitionObjectArray  , this.exhibitionCurrentString);
            var roomCurrentObject                               = this.FindObject(_roomObjectArray        , exhibitionCurrentObject   .objectParentNameAltString);
            var floorCurrentObject                              = this.FindObject(_floorObjectArray       , roomCurrentObject         .objectParentNameAltString);
            exhibitionCurrentObject                             .visitorCurrentNum --;
            roomCurrentObject                                   .visitorCurrentNum --;
            floorCurrentObject                                  .visitorCurrentNum --;

        }

        this.exhibitionCurrentString                            = _exhibitionNameAltString;         /*Change the current eexhibition.*/
        this.exhibitionVisitedStringArray                       .push(_exhibitionNameAltString);    /*Push the name of the newly visited exhibition to the array of visited exhibition.*/
        
        /*PENDING: Add a code to check whether the visited exhibition is in the museum.*/

        /*Adding one additional visitor to a new exhibition.*/
        var exhibitionCurrentObject                             = this.FindObject(_exhibitionObjectArray  , this.exhibitionCurrentString);
        var roomCurrentObject                                   = this.FindObject(_roomObjectArray        , exhibitionCurrentObject   .objectParentNameAltString);
        var floorCurrentObject                                  = this.FindObject(_floorObjectArray       , roomCurrentObject         .objectParentNameAltString);
        exhibitionCurrentObject                                 .visitorCurrentNum  ++;
        roomCurrentObject                                       .visitorCurrentNum  ++;
        floorCurrentObject                                      .visitorCurrentNum  ++;
        exhibitionCurrentObject                                 .visitorTotalNum    ++;
        roomCurrentObject                                       .visitorTotalNum    ++;
        floorCurrentObject                                      .visitorTotalNum    ++;

        /*These codes below is to add tags into player array.
        And then it gives value for every tags inside the array.*/
        for(var i = 0; i < exhibitionCurrentObject.tagStringArray.length; i ++){

            /*Add the tags from exhibition to the this.tagMixedArray.*/
            var tagMixedArray                                   = new Array(2);
            tagMixedArray[0]                                    = exhibitionCurrentObject.tagStringArray[i];

            var isNewBool                                       = true;         /*Whether the tag is new to the array or there is already existing one.*/
            var indexNum                                        = undefined;    /*If there is the corresponding tag already in the array return its index with this variable, otherwise it keeps undefined.*/

            /*Check inside this.tagMixedArray to see if the newly received tags
                are inside the array already.
            The checking is one per tag.*/
            for(var j = 0; j < this.tagMixedArray.length; j ++){

                /*If one or more tags is found within the this.tagMixedArray,
                    then set isNewBool to false and set the indexNum for future access.*/
                if(tagMixedArray[0] == this.tagMixedArray[j][0]){

                    isNewBool                                   = false;
                    indexNum                                    = j;
                    break;

                }

            }

            /*If the tag is new to the this.tagMixedArray, then add 1 to the second array element and
                push the string value of tag name and number value of tag value to the this.tagMixedArray.*/
            if(isNewBool){

                tagMixedArray[1]                                = 1;
                this.tagMixedArray                              .push(tagMixedArray);

            }
            /*If the tag already exist in this.tagMixedArray then using the indexNum to increase the visiting value with additional
                one value.*/
            else if (!isNewBool){ this.tagMixedArray[indexNum][1] = this.tagMixedArray[indexNum][1] + 1; }

        }
        this.SortArray(this.tagMixedArray, this.CompareTagNum);

        return this.exhibitionCurrentString; /*Return the array of visited exhbition.*/

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
ObjectPlayer.prototype.FindIndexNum                             = function(_exhibitionObjectArray, _exhibitionNameAltString){

    if(

        (typeof _exhibitionObjectArray                          === 'object') &&
        (typeof _exhibitionNameAltString                        === 'string')

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
ObjectPlayer.prototype.FindObject                               = function(_exhibitionNameObjectArray, _exhibitionNameAltString){

    if(

        (typeof _exhibitionNameObjectArray                      === 'object') &&
        (typeof _exhibitionNameAltString                        === 'string')

    ){ return _exhibitionNameObjectArray[this.FindIndexNum(_exhibitionNameObjectArray, _exhibitionNameAltString)]; }
    else{

        console.log((typeof _exhibitionNameObjectArray)         + ' is not an object.');
        console.log((typeof _exhibitionNameAltString)           + ' is not a string.');
        return undefined;

    }

};

/*Generic sorting array function.*/
ObjectPlayer.prototype.SortArray                                = function(_targetArray, _compareFunction){

    if(

        typeof _targetArray     !== 'object' &&
        typeof _compareFunction !== 'function'

    ){ return 'undefined'; }

    _targetArray.sort(_compareFunction);
    return _targetArray;

};