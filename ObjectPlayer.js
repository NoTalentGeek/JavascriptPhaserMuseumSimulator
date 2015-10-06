ObjectPlayer                                                    = function(

    _exhibitionStartString  ,
    _floorObjectArray       ,
    _roomObjectArray        ,
    _exhibitionObjectArray  ,
    _playerObjectArray      ,
    _panelIndexNum          ,
    _offsetYNum
    
){

    if(

        typeof _exhibitionStartString                           === 'string' &&
        typeof _floorObjectArray                                === 'object' &&
        typeof _roomObjectArray                                 === 'object' &&
        typeof _exhibitionObjectArray                           === 'object' &&
        typeof _playerObjectArray                               === 'object' &&
        typeof _panelIndexNum                                   === 'number' &&
        typeof _offsetYNum                                      === 'number'

    ){

        this.floorObjectArray                                   = _floorObjectArray;        /*Initiate reference to the main floor object array.*/
        this.roomObjectArray                                    = _roomObjectArray;         /*Initiate reference to the main room object array.*/
        this.exhibitionObjectArray                              = _exhibitionObjectArray;   /*Initiate reference to the main exhibition bject array.*/
        this.playerObjectArray                                  = _playerObjectArray;       /*Initiate reference to the main player object array.*/
        this.siblingObjectArray                                 = new Array();              /*Empty array to be used later on to store which object share teh same parent with this player.*/

        this.exhibitionCurrentString                            = undefined;                /*The current exhibition of which this player resides in.*/
        this.exhibitionTargetStringArray                        = new Array();              /*Current target exhibition of which has more priority over other exhibitions.*/
        this.exhibitionVisitedStringArray                       = new Array();              /*List of exhibition that has been visited by this player.*/
        this.tagMixedArray                                      = new Array();              /*List of all favorites tags gathered by this player by visiting exhibition.*/
        
        this.timeCurrentExhibitionNum                           = 0;                        /*PENDING: The amount of time this player spent on the current exhibition. Need to be changed to be calculated in second.*/
        this.timeTotalNum                                       = 0;                        /*PENDING: The current amount of time this player spent on the whole museum visit. Can be achieved by adding all this.timeCurrentExhibition.*/

        this.panelHoverBool                                     = false;                    /*Wether a mouse pointer is above this player object.*/
        this.panelIndexNum                                      = _panelIndexNum;           /*The index number of this player object among other player object (must be unique).*/
        this.panelObject                                        = undefined;                /*The panel object for this object player.*/
        this.panelLabelObject                                   = undefined;                /*The panel label object for this object player (contains test instead of sprite).*/
        this.panelCardObject                                    = undefined;                /*The panel object for this object player.*/
        this.panelCardLabelObject                               = undefined;                /*The panel label object for this object player (contains test instead of sprite).*/
        this.panelXNum                                          = 0;                        /*Variable to hold the value of x position from panel object.*/
        this.panelYNum                                          = 0;                        /*Variable to hold the value of y position from panel object.*/
        this.panelWidthNum                                      = 0;                        /*Variable to hold the value of width from panel object.*/
        this.panelHeightNum                                     = 0;                        /*Variable to hold the value of height from panel object.*/
        this.panelCardXNum                                      = 0;                        /*Variable to hold the value of x position from panel card object.*/
        this.panelCardYNum                                      = 0;                        /*Variable to hold the value of y position from panel card object.*/
        this.panelCardWidthNum                                  = 0;                        /*Variable to hold the value of width from panel card object.*/
        this.panelCardHeightNum                                 = 0;                        /*Variable to hold the value of height from panel card object.*/
        this.panelSpriteString                                  = 'ImagePanelNew4';         /*Hold the string reference to sprite panel for panel label.*/
        this.offsetYNum                                         = _offsetYNum;              /*Offset y for each stacked player's panel object.*/
        this.fontSizeLabelNum                                   = 32;                       /*Font size for panel label.*/
        this.fontSizeCardLabelNum                               = 32;                       /*Font size for panel card label.*/

        /*Initial setup for the this.exhibitionCurrent to _exhibitionStart and also add that things to this.exhibitionVisited.*/
        this.ExhibitionMoveString                               (

            _exhibitionStartString,
            this.floorObjectArray,
            this.roomObjectArray,
            this.exhibitionObjectArray,
            this.offsetYNum

        );

    }
    else{

        console.log                                             ((typeof _exhibitionStartString)    + ' is not a string.' );
        console.log                                             ((typeof _floorObjectArray)         + ' is not an object.');
        console.log                                             ((typeof _roomObjectArray)          + ' is not an object.');
        console.log                                             ((typeof _exhibitionObjectArray)    + ' is not an object.');
        console.log                                             ((typeof _playerObjectArray)        + ' is not an object.');
        console.log                                             ((typeof _panelIndexNum)            + ' is not an number.');
        console.log                                             ((typeof _offsetYNum)               + ' is not an number.');

    }

};
ObjectPlayer.prototype.constructor                              = ObjectPlayer;

/*Add or remove this player from the parent object.*/
ObjectPlayer.prototype.AddRemoveChildObjectArray                = function(_isAdd){

    if(typeof _isAdd === 'boolean'){

        /*Make reference to the current exhibition visited.*/
        var exhibitionCurrentObject                             = this.FindObject(this.exhibitionObjectArray, this.exhibitionCurrentString);
        /*Add this player to the child of the exhibition object.*/
        if      (_isAdd )                                       { exhibitionCurrentObject.childObjectArray.push(this); }
        /*Remove this player from the child of the exhibition object.*/
        else if (!_isAdd)                                       {

            var indexNum                                        = exhibitionCurrentObject.childObjectArray.indexOf(this);
                                                                  exhibitionCurrentObject.childObjectArray.splice(indexNum, 1);

        }

        return exhibitionCurrentObject.childObjectArray;

    }
    else{

        console.log                                             ((typeof _isAdd) + ' is not a boolean.');
        return undefined;

    }

}

/*AIAutoBool is a function that move this player object automatically to the exahibition.
This function returns true if the player just move to new exhibition and false if the player
    stay in the current exhibition.*/
ObjectPlayer.prototype.AIAutoString                             = function(){

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
            while(this.FindIndexNameAltNum(this.exhibitionObjectArray, this.exhibitionCurrentString) == indexNum){

                indexNum = Math.floor((Math.random()*this.exhibitionObjectArray.length) + 0);

            }

            <<If indexNum generates number for exhibition index that has been visited before,
                this player has a chance of 75% to visit the exhibitions those are not yet visited.
            It is like any visitors in any museums has less chance to visit the exhibition he/she has visited
                before.
            The code below is to check the availability of index exhibition name in the array of visited exhibitions.
            If the number is above -1 then it means the exhibition at indexNum had been visited before.>>
            if(this.exhibitionVisitedStringArray.indexOf(this.exhibitionObjectArray[indexNum].objectNameAltString) > -1){

                if(Math.random()    > 0.75){

                    <<Loop counter to prevent near infinite while loop.
                    In case the visitor has visited most of the exhibition it will increase the loop of below while loop,
                        so I add a counter to break the loop in case it is alraedy looped with the same amount of exhibitions in the museum.>>
                    var loopNum     = 0;

                    <<A while loop to generates an index number for exhibition until the index exhibition is an exhibition that
                        this visitor never visited before.>>
                    while(this.exhibitionVisitedStringArray.indexOf(this.exhibitionObjectArray[indexNum].objectNameAltString) > -1){

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
                this.floorObjectArray,
                this.roomObjectArray,
                this.exhibitionObjectArray,
                this.offsetYNum

            );

            this.timeCurrentExhibitionNum   = 0;    /*Reset timer.*/
            return                          newExhibitionString;

        }
        else{ return undefined; }

    }
    else{

        /*Assign new sprite if this player finished on visiting the museum.*/
        this.panelSpriteString = 'ImagePanelNew5';
        /*Re - create graphical representation of this player.*/
        this.CreatePanelObject(this.offsetYNum);

        return undefined;

    }

};

/*This function is to calculate how many player object share the same parent object.*/
ObjectPlayer.prototype.CalculateSiblingObjectArray              = function(){

    /*Always empty the object array, due to we will fill with the new one.*/
    this.siblingObjectArray                                     = [];

    /*Iterate through the object player array.*/
    for(var i = 0; i < this.playerObjectArray.length; i ++)     {

        /*If an object share the same parent name than add the object to this.siblingObjectArray.*/
        if(this.playerObjectArray[i].exhibitionCurrentString    == this.exhibitionCurrentString){

            this.siblingObjectArray.push(this.playerObjectArray[i]);

        }

    }

    return this.siblingObjectArray;

};

/*Ascending comparison function for calculating how many points does a tag has in this player.*/
/*
ObjectPlayer.prototype.CompareTagNum                            = function(_elementMixedArray1, _elementMixedArray2){

    return _elementMixedArray1[1] - _elementMixedArray2[1];

};
*/
/*Descending comparison function for calculating how many points does a tag has in this player.*/
ObjectPlayer.prototype.CompareTagNum                            = function(_elementMixedArray1, _elementMixedArray2){

    return _elementMixedArray2[1] - _elementMixedArray1[1];

};

/*Create the graphical user interface of this player.*/
ObjectPlayer.prototype.CreatePanelObject                        = function(){

    /*Take reference to this player current exhibition.*/
    var exhibitionCurrentObject                                 = this.FindObject(this.exhibitionObjectArray, this.exhibitionCurrentString);
    
    /*Take reference to this player index within exhibition object child array.*/
    var indexNum                                                = this.FindIndexObjectNum(exhibitionCurrentObject.childObjectArray, this);

    this.panelWidthNum                                          = exhibitionCurrentObject.panelWidthNum;
    this.panelHeightNum                                         = exhibitionCurrentObject.panelHeightNum;

    /*Destroy the previously created panel.*/
    if(this.panelObject         != undefined)                   { this.panelObject.destroy();       }
    if(this.panelLabelObject    != undefined)                   { this.panelLabelObject.destroy();  }

    this.panelObject                                            = game.add.sprite(

        exhibitionCurrentObject.panelXNum,
        exhibitionCurrentObject.panelYNum + ((indexNum + 1)*this.offsetYNum) + ((indexNum + 1)*this.panelHeightNum),
        this.panelSpriteString

    );

    this.panelXNum                                              = this.panelObject.x;
    this.panelYNum                                              = this.panelObject.y;
    this.panelObject.width                                      = this.panelWidthNum;
    this.panelObject.height                                     = this.panelHeightNum;
    this.panelObject.inputEnabled                               = true;

    this.panelLabelObject                                       = game.add.text(

        (this.panelXNum + this.panelWidthNum/2),
        (this.panelYNum + this.panelHeightNum/2),
        this.panelIndexNum,
        {
            'align'     : 'center',
            'fontSize'  : this.fontSizeLabelNum
        }

    );
    this.panelLabelObject.inputEnabled                          = true;
    this.panelLabelObject.anchor                                .setTo(0.5, 0.5);

    return this.panelObject;

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
        if(this.exhibitionCurrentString != this.exhibitionObjectArray[i].objectNameAltString){ this.exhibitionTargetStringArray.push(this.exhibitionObjectArray[i].objectNameAltString); }

    }
    //console.log('Stage one: ' + this.exhibitionTargetStringArray.length);

    /*Stage two sort.
    Remove all exhibition target that is full of visitor.*/
    for(var i = 0; i < this.exhibitionObjectArray.length; i ++){

        if(

            (this.exhibitionObjectArray[i].isFullBool    == true)                                               &&
            (this.exhibitionCurrentString                != this.exhibitionObjectArray[i].objectNameAltString)

        ){
            
            var indexNum                                        = this.exhibitionTargetStringArray.indexOf(this.exhibitionObjectArray[i].objectNameAltString);
            this.exhibitionTargetStringArray                    .splice(indexNum, 1);
            if(this.exhibitionTargetStringArray.length == 3)    { return this.exhibitionTargetStringArray; }

        }

    }

    /*Stage three sort.
    Stage three sort is to make the exhibition that has been visited before has 90% chance to make into target exhibition.
    For example the visitor is now in the Exhibition C as he/she used to visits Exhibition A and Exhibition B before,
        the system now will let Exhibition A and Exhibition B to have 10% chance to be not removed from the target
        exhibition array.*/
    for(var i = 0; i < this.exhibitionVisitedStringArray.length; i ++){

        for(var j = 0; j < this.exhibitionTargetStringArray.length; j ++){

            /*Compare the target exhibitions with all visited exhibition.
            If it matches then the corresponding exhibition has 90% chance to be deleted
                from target exhibition array.*/
            if(this.exhibitionVisitedStringArray[i] == this.exhibitionTargetStringArray[j]){

                if(Math.random() < 0.90){

                    this.exhibitionTargetStringArray.splice(j, 1);
                    i --;

                }

                /*After each splice make sure to have the exhibition target length to be 3.
                If not 3 elements in the target exhibition array, then return the last 3 elements
                    of target exhibition array ever exist.*/
                if(this.exhibitionTargetStringArray.length == 3){ return this.exhibitionTargetStringArray; }

            }

        }

    }
    //console.log('Stage three: ' + this.exhibitionTargetStringArray.length);

    /*Stage four sort.
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
        
        if      (tagSameCountNum == 0)          {                           this.exhibitionTargetStringArray.splice(i, 1); i --; }
        else if (tagSameCountNum == 1)          { if(Math.random() < 0.66){ this.exhibitionTargetStringArray.splice(i, 1); i --; } }
        else if (tagSameCountNum == 2)          { if(Math.random() < 0.33){ this.exhibitionTargetStringArray.splice(i, 1); i --; } }
        else if (tagSameCountNum == 3)          {  }

        /*After each splice make sure to have the exhibition target length to be 3.
        If not 3 elements in the target exhibition array, then return the last 3 elements
            of target exhibition array ever exist.*/
        if(this.exhibitionTargetStringArray.length == 3){ return this.exhibitionTargetStringArray; }

    }
    //console.log('Stage four: ' + this.exhibitionTargetStringArray.length);

    var exhibitionCurrentObject         = this.FindObject   (this.exhibitionObjectArray     , this.exhibitionCurrentString);
    var exhibitionRoomString            = exhibitionCurrentObject.objectParentNameAltString;
    var exhibitionRoomObject            = this.FindObject   (this.roomObjectArray           , exhibitionRoomString);
    var exhibitionFloorString           = exhibitionRoomObject.objectParentNameAltString;
    var exhibitionFloorObject           = this.FindObject   (this.floorObjectArray          , exhibitionFloorString);

    /*Stage five sort.
    The fourth sort is to make the exhibition target that are not in the same floor of which player's
        current exhibition to have 50% chance of stay.*/
    for(var i = 0; i < this.exhibitionTargetStringArray.length; i ++){

        var exhibitionTargetObject      =  this.FindObject      (this.exhibitionObjectArray         , this.exhibitionTargetStringArray[i]);
        var exhibitionTargetRoomString  =  exhibitionTargetObject.objectParentNameAltString;
        var exhibitionTargetRoomObject  =  this.FindObject      (this.roomObjectArray               , exhibitionTargetRoomString);
        var exhibitionTargetFloorString =  exhibitionTargetRoomObject.objectParentNameAltString;
        var exhibitionTargetFloorObject =  this.FindObject      (this.floorObjectArray              , exhibitionTargetFloorString);

        if(exhibitionTargetFloorString  != exhibitionFloorString){ if(Math.random() < 0.50){ this.exhibitionTargetStringArray.splice(i, 1); i --; } }

        /*After each splice make sure to have the exhibition target length to be 3.
        If not 3 elements in the target exhibition array, then return the last 3 elements
            of target exhibition array ever exist.*/
        if(this.exhibitionTargetStringArray.length == 3){ return this.exhibitionTargetStringArray; }

    }
    //console.log('Stage five: ' + this.exhibitionTargetStringArray.length);

    /*Stage six sort.
    The fifth sort is to make the exhibition target that are not in the same room of which player's
        current exhibition to have 50% chance of stay.*/
    for(var i = 0; i < this.exhibitionTargetStringArray.length; i ++){

        var exhibitionTargetObject      =  this.FindObject      (this.exhibitionObjectArray         , this.exhibitionTargetStringArray[i]);
        var exhibitionTargetRoomString  =  exhibitionTargetObject.objectParentNameAltString;
        var exhibitionTargetRoomObject  =  this.FindObject      (this.roomObjectArray               , exhibitionTargetRoomString);
        
        if(exhibitionTargetRoomString  != exhibitionRoomString){ if(Math.random() < 0.50){ this.exhibitionTargetStringArray.splice(i, 1); i --; } }

        /*After each splice make sure to have the exhibition target length to be 3.
        If not 3 elements in the target exhibition array, then return the last 3 elements
            of target exhibition array ever exist.*/
        if(this.exhibitionTargetStringArray.length == 3){ return this.exhibitionTargetStringArray; }

    }
    //console.log('Stage six: ' + this.exhibitionTargetStringArray.length);

    /*In case in the end of final sort the target exhibition array have length more than 3, make it just have 3 elements.*/
    this.exhibitionTargetStringArray.splice(3, this.exhibitionObjectArray.length);

    return this.exhibitionTargetStringArray;

};

/*A function to move this player to new exhibition.*/
ObjectPlayer.prototype.ExhibitionMoveString                     = function(
    _exhibitionNameAltString    ,
    _floorObjectArray           ,
    _roomObjectArray            ,
    _exhibitionObjectArray      ,
    _offsetYNum
){

    /*Verification of argument inputted.*/
    if(

        typeof _exhibitionNameAltString                         === 'string' &&
        typeof _floorObjectArray                                === 'object' &&
        typeof _roomObjectArray                                 === 'object' &&
        typeof _exhibitionObjectArray                           === 'object' &&
        typeof _offsetYNum                                      === 'number'
        

    ){

        /*If this player move into new exhibition then remove it graphical representation from the current exhibition before this player
            change exhibition.*/
        if(this.exhibitionCurrentString != undefined)           { this.AddRemoveChildObjectArray(false); }

        /*Add calculation for the current exhibition array before the this player is moved into new exhibition.
        For example like removing the amount of current visitor.*/
        if(this.exhibitionCurrentString                         != undefined){

            var exhibitionCurrentObject                         = this.FindObject(_exhibitionObjectArray  , this.exhibitionCurrentString);
            var roomCurrentObject                               = this.FindObject(_roomObjectArray        , exhibitionCurrentObject         .objectParentNameAltString);
            var floorCurrentObject                              = this.FindObject(_floorObjectArray       , roomCurrentObject               .objectParentNameAltString);
            exhibitionCurrentObject                             .visitorCurrentNum --;
            roomCurrentObject                                   .visitorCurrentNum --;
            floorCurrentObject                                  .visitorCurrentNum --;

        }

        this.exhibitionCurrentString                            = _exhibitionNameAltString;         /*Change the current eexhibition.*/
        this.exhibitionVisitedStringArray                       .push(_exhibitionNameAltString);    /*Push the name of the newly visited exhibition to the array of visited exhibition.*/
        
        /*PENDING: Add a code to check whether the visited exhibition is in the museum.*/

        /*Adding one additional visitor to a new exhibition.*/
        var exhibitionCurrentObject                             = this.FindObject(_exhibitionObjectArray  , this.exhibitionCurrentString);
        var roomCurrentObject                                   = this.FindObject(_roomObjectArray        , exhibitionCurrentObject         .objectParentNameAltString);
        var floorCurrentObject                                  = this.FindObject(_floorObjectArray       , roomCurrentObject               .objectParentNameAltString);
        exhibitionCurrentObject                                 .visitorCurrentNum  ++;
        roomCurrentObject                                       .visitorCurrentNum  ++;
        floorCurrentObject                                      .visitorCurrentNum  ++;
        exhibitionCurrentObject                                 .visitorTotalNum    ++;
        roomCurrentObject                                       .visitorTotalNum    ++;
        floorCurrentObject                                      .visitorTotalNum    ++;

        /*These codes below is to add tags into player array.
        And then it gives value for every tags inside the array.*/
        for(var i = 0; i < exhibitionCurrentObject.tagStringArray.length; i ++){

            /*Add the tags from exhibition to the this.tagMixedArray.
            this.tagMixedStringArray is an array that contains two dimensional array.
            For its contents the first dimension is the tag nalternative name.
            While, the latest dimension is the score of the array for this player.*/
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
            if(isNewBool == true){

                tagMixedArray[1]                                = 1;
                this.tagMixedArray                              .push(tagMixedArray);

            }
            /*If the tag already exist in this.tagMixedArray then using the indexNum to increase the visiting value with additional
                one value.*/
            else if (!isNewBool){ this.tagMixedArray[indexNum][1] = this.tagMixedArray[indexNum][1] + 1; }

        }

        this.SortArray(this.tagMixedArray, this.CompareTagNum);     /*Sort the array so that the highest point of tags is always on top.*/
        this.AddRemoveChildObjectArray(true);                       /*Add this player to the new exhibition parent.*/
        this.CalculateSiblingObjectArray();                         /*Re calculate the sibling array.*/
        this.CreatePanelObject(this.offsetYNum);                    /*Create graphical representation of this player.*/

        /*For every player moved, update the panel position of all player.*/
        for(var i = 0; i < this.playerObjectArray.length; i ++){ this.playerObjectArray[i].CreatePanelObject(); }

        return this.exhibitionCurrentString;                        /*Return the array of visited exhbition.*/

    }
    else{

        console.log     ((typeof _exhibitionNameAltString)  + ' is not a string.');
        console.log     ((typeof _floorObjectArray)         + ' is not a object.');
        console.log     ((typeof _roomObjectArray)          + ' is not a object.');
        console.log     ((typeof _exhibitionObjectArray)    + ' is not a object.');
        console.log     ((typeof _offsetYNum)               + ' is not a number.');
        return          undefined;

    }

};

/*A function to find the exhibition index in an array of object exhibition, based on exhibition's
    name alt.*/
ObjectPlayer.prototype.FindIndexNameAltNum                      = function(_exhibitionObjectArray, _exhibitionNameAltString){

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

/*A function to find the exhibition index in an array of object exhibition, based on object.*/
ObjectPlayer.prototype.FindIndexObjectNum                       = function(_playerObjectArray, _exhibitionObject){

    if(

        (typeof _playerObjectArray                              === 'object') &&
        (typeof _exhibitionObject                               === 'object')

    ){

        /*Loop through the array.*/
        for(var i = 0; i < _playerObjectArray.length; i ++){

            /*Check the variable name of nameObjectAlt one by one per array element.
            i is the index number when the variable name equals with the variable value.*/
            if(_playerObjectArray[i] == _exhibitionObject){ return i; }

        }
        return undefined;

    }
    else{

        console.log((typeof _playerObjectArray)         + ' is not an object.');
        console.log((typeof _exhibitionObject)          + ' is not an object.');
        return undefined;

    }

};

/*Using the function to find object index, I created another function to return the object instead of the index.*/
ObjectPlayer.prototype.FindObject                               = function(_objectArray, _exhibitionNameAltString){

    if(

        (typeof _objectArray                                    === 'object') &&
        (typeof _exhibitionNameAltString                        === 'string')

    ){ return _objectArray[this.FindIndexNameAltNum(_objectArray, _exhibitionNameAltString)]; }
    else{

        console.log((typeof _objectArray)                       + ' is not an object.');
        console.log((typeof _exhibitionNameAltString)           + ' is not a string.');
        return undefined;

    }

};

/*This is an update function to update the reference that were put in the constructor.
For every value that is need to be updated you put it here in the update function.
This function's arguments are the value that is need to be updated every tick of the program.
PENDING: I need to create so that this Update function get updated per everytime there is value change
    in the current exhibition.*/
ObjectPlayer.prototype.UpdateVoid                               = function(

    _floorObjectArray       ,
    _roomObjectArray        ,
    _exhibitionObjectArray  ,
    _playerObjectArray

){

    if(

        typeof _floorObjectArray                                === 'object' &&
        typeof _roomObjectArray                                 === 'object' &&
        typeof _exhibitionObjectArray                           === 'object' &&
        typeof _playerObjectArray                               === 'object'

    ){

        this.floorObjectArray                                   = _floorObjectArray;
        this.roomObjectArray                                    = _roomObjectArray;
        this.exhibitionObjectArray                              = _exhibitionObjectArray;
        this.playerObjectArray                                  = _playerObjectArray;

        /*Check pointer over the panel object sprite.*/
        if(
            this.panelObject        .input.pointerOver()        == true         ||
            this.panelLabelObject   .input.pointerOver()        == true
        ){  this.panelHoverBool = true;  }
        else if(

            this.panelObject        .input.pointerOver()        == false        &&
            this.panelLabelObject   .input.pointerOver()        == false

        ){  this.panelHoverBool = false; }

    }
    else{

        console.log                                             ((typeof _floorObjectArray)         + ' is not an object.');
        console.log                                             ((typeof _roomObjectArray)          + ' is not an object.');
        console.log                                             ((typeof _exhibitionObjectArray)    + ' is not an object.');
        console.log                                             ((typeof _playerObjectArray)        + ' is not an object.');

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