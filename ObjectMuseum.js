/*An object to handle all the museum related object.
This object can be used as floor, room, and the exhibition itself.
PENDING: Add verification for every arguments.*/ 
ObjectMuseum                                        =  function(

    _objectParentNameAltString  ,
    _objectTypeString           ,
    _objectNameString           , 
    _offsetXNum                 ,
    _offsetYNum                 ,
    _totalRowNum                ,
    _floorObjectArray           ,
    _roomObjectArray            ,
    _exhibitionObjectArray

){

    if(

        typeof _objectParentNameAltString           === 'string' &&
        typeof _objectTypeString                    === 'string' &&
        typeof _objectNameString                    === 'object' &&
        typeof _offsetXNum                          === 'number' &&
        typeof _offsetYNum                          === 'number' &&
        typeof _totalRowNum                         === 'number' &&
        typeof _floorObjectArray                    === 'object' &&
        typeof _roomObjectArray                     === 'object' &&
        typeof _exhibitionObjectArray               === 'object'

    ){

        /*PENDING: If you want to change this object parent you have to do these steps.
            1. Remove this object from the current parent's this.childObjectArray.
            2. Change the this.objectParentNameAltString.
            3. Assign it into var parentObject.
            4. Add back this objeect into new parent's this.childObjectArray.
            5. Re - create the panel graphical user interface*/

        this.childObjectArray                       = new Array();
        this.objectParentNameAltString              = _objectParentNameAltString;           /*The object name alt for the parent object (string).*/
        this.objectTypeString                       = _objectTypeString;                    /*The type of this object (fill in 'FLR', 'ROM', 'EXH', or 'TAG').*/
        this.objectNameString                       = _objectNameString;
        this.objectNameFullString                   = this.objectNameString.nameFullString;
        this.objectNameAltString                    = this.objectNameString.nameAltString;
        this.visitorCurrentNum                      = 0;
        this.visitorTotalNum                        = 0;
        this.tagStringArray                         = new Array(3);

        /*Panel graphical user interface variables.*/
        this.offsetXNum                             = _offsetXNum;
        this.offsetYNum                             = _offsetYNum;
        this.totalRowNum                            = _totalRowNum;
        this.floorObjectArray                       = _floorObjectArray;
        this.roomObjectArray                        = _roomObjectArray;
        this.exhibitionObjectArray                  = _exhibitionObjectArray;

        this.parentObject                           = undefined;
        this.indexNum                               = undefined;

        this.panelXNum                              = 0;
        this.panelYNum                              = 0;
        this.panelWidthNum                          = 0;
        this.panelHeightNum                         = 0;
        this.panelObject                            = undefined;
        this.panelLabelObject                       = undefined;

        this.fontSizeNum                            = 32;

        this.AddRemoveChildObjectArray              (true);

    }
    else{

        console.log                                 ((typeof _objectParentNameAltString)    + ' is not a string.' );
        console.log                                 ((typeof _objectTypeString)             + ' is not a string.' );
        console.log                                 ((typeof _objectNameString)             + ' is not an object.');
        console.log                                 ((typeof _offsetXNum)                   + ' is not a number.' );
        console.log                                 ((typeof _offsetYNum)                   + ' is not a number.' );
        console.log                                 ((typeof _totalRowNum)                  + ' is not a number.' );
        console.log                                 ((typeof _floorObjectArray)             + ' is not an object.');
        console.log                                 ((typeof _roomObjectArray)              + ' is not an object.');
        console.log                                 ((typeof _exhibitionObjectArray)        + ' is not an object.');

    }

};

ObjectMuseum.prototype.construtor                   = ObjectMuseum;

/*Add or remove this object from the parent object.*/
ObjectMuseum.prototype.AddRemoveChildObjectArray    = function(_isAdd){

    if(typeof _isAdd === 'boolean'){

        /*Make reference to the current parentObject.*/
        switch(this.objectTypeString){

            case('ROM') :this.parentObject          = this.FindObject(this.floorObjectArray     , this.objectParentNameAltString);  break;
            case('EXH') :this.parentObject          = this.FindObject(this.roomObjectArray      , this.objectParentNameAltString);  break;
            default     :this.parentObject          = undefined;                                                                         break;

        }
        if(this.parentObject != undefined){

            /*Add this player to the child of the exhibition object.*/
            if      ( _isAdd)        { this.parentObject.childObjectArray.push(this); }
            /*Remove this player from the child of the exhibition object.*/
            else if (!_isAdd)        {
    
                var indexNum                        = this.parentObject.childObjectArray.indexOf(this);
                                                      this.parentObject.childObjectArray.splice(indexNum, 1);
    
            }

            this.indexNum                           = this.FindIndexObjectNum(this.parentObject.childObjectArray, this);

            return this.parentObject.childObjectArray;

        }
        else if(this.parentObject == undefined){

            if(this.objectTypeString != 'FLR' && this.objectTypeString != 'TAG'){ console.log('Parent object is undefined.'); }
            return undefined;

        }


    }
    else{

        console.log                                             ((typeof _isAdd) + ' is not a boolean.');
        return undefined;

    }

}

/*A function to create a graphical user interface for each museum object.*/
ObjectMuseum.prototype.CreatePanelVoid              = function(){

    /*If this object is a floor object.*/
    if(this.objectTypeString        == 'FLR'){

        /*For panel floor we take the index number from its own array and not from the parent array.
        Because floor basically has no parent.*/
        var indexNum                = this.FindIndexObjectNum(this.floorObjectArray, this);
        
        /*These lines of codes below is to determine the width and the height of the panel.
        For floor object you do not need to compare it to the parent, because floor object has no parent.*/
        this.panelWidthNum          =  game.width  -  (this.offsetXNum*2);
        this.panelHeightNum         = (game.height - ((this.offsetYNum*this.totalRowNum) + this.offsetYNum))/this.totalRowNum;

        /*Create the panel image here.*/
        this.panelObject             = game.add.sprite(

            this.offsetXNum + (indexNum*this.panelWidthNum) + (indexNum*this.offsetXNum),
            this.offsetYNum,
            'ImagePanel2New'

        );
        /*Set the width and the height for the object to meet the variables we have made before.*/
            this.panelObject.width  = this.panelWidthNum;
            this.panelObject.height = this.panelHeightNum;
        /*Refer back the panel x and y position to the variables for easy referencing.*/
        this.panelXNum              = this.panelObject.x;
        this.panelYNum              = this.panelObject.y;

    }
    /*If this object is a room object.*/
    else if(this.objectTypeString   == 'ROM'){
        
        /*With this codes below I want to know how many object shared with same parent.
        This information can be used to determine the division of layout.*/
        var siblingCountNum         = 0;
        for(var i = 0; i < this.roomObjectArray.length; i ++){

            if(this.roomObjectArray[i].objectParentNameAltString == this.objectParentNameAltString){ siblingCountNum ++; }

        }
        siblingCountNum             = (siblingCountNum == 0) ? 1 : siblingCountNum;

        /*These lines of codes below is to determine the width and the height of the panel.
        For object other than floor object you need to compare the width and height based on the parent object.*/
        this.panelWidthNum          = (this.parentObject.panelWidthNum - (this.offsetXNum*(siblingCountNum - 1)))/siblingCountNum;
        this.panelHeightNum         = this.parentObject.panelHeightNum;

        /*Create the panel image here.*/
        this.panelObject        = game.add.sprite(

            this.parentObject.panelXNum  + (this.indexNum*this.panelWidthNum) + (this.indexNum*this.offsetXNum),
            this.parentObject.panelYNum  + this.parentObject.panelHeightNum + this.offsetYNum,
            'ImagePanel3New'

        );
        /*Set the width and the height for the object to meet the variables we have made before.*/
            this.panelObject.width  = this.panelWidthNum;
            this.panelObject.height = this.panelHeightNum;
        /*Refer back the panel x and y position to the variables for easy referencing.*/
        this.panelXNum              = this.panelObject.x;
        this.panelYNum              = this.panelObject.y;

    }
    /*If this object is a exhibition object.*/
    else if(this.objectTypeString   == 'EXH'){

        /*With this codes below I want to know how many object shared with same parent.
        This information can be used to determine the division of layout.*/
        var siblingCountNum         = 0;
        for(var i = 0; i < this.exhibitionObjectArray.length; i ++){

            if(this.exhibitionObjectArray[i].objectParentNameAltString == this.objectParentNameAltString){ siblingCountNum ++; }

        }

        /*These lines of codes below is to determine the width and the height of the panel.
        For object other than floor object you need to compare the width and height based on the parent object.*/
        this.panelWidthNum          = (this.parentObject.panelWidthNum - (this.offsetXNum*(siblingCountNum - 1)))/siblingCountNum;
        this.panelHeightNum         = this.parentObject.panelHeightNum;

        /*Create the panel image here.*/
        this.panelObject        = game.add.sprite(

            this.parentObject.panelXNum  + (this.indexNum*this.panelWidthNum) + (this.indexNum*this.offsetXNum),
            this.parentObject.panelYNum  + this.parentObject.panelHeightNum + this.offsetYNum,
            'ImagePanel4New'

        );
        /*Set the width and the height for the object to meet the variables we have made before.*/
            this.panelObject.width  = this.panelWidthNum;
            this.panelObject.height = this.panelHeightNum;
        /*Refer back the panel x and y position to the variables for easy referencing.*/
        this.panelXNum              = this.panelObject.x;
        this.panelYNum              = this.panelObject.y;

    }

    /*These multiple loops below is for adding text in the panel.
    The first loop is to initiate the panel with the biggest font size possible.
    In this case, I pick 32 pixels.*/
    this.panelLabelObject           = game.add.text(

        (this.panelXNum + this.panelWidthNum/2),
        (this.panelYNum + this.panelHeightNum/2),
        this.objectNameAltString,
        {
            'align'     : 'center',
            'fontSize'  : this.fontSizeNum
        }

    );
    /*Always set the anchor position of this museum object to the middle position.*/
    this.panelLabelObject.anchor    .setTo(0.5, 0.5);

    /*The second loop is to iterate the size of this text with this object panel.
    For every loop decrease the font size.
    If the size of text panel is still higher than the normal panel the loop will still
        continue until the text panel is smaller than the normal panel.*/
    while(

        (this.panelLabelObject.width  > this.panelWidthNum)  ||
        (this.panelLabelObject.height > this.panelHeightNum)

    ){

        this.fontSizeNum            --;                 /*Keep decreaseing the font size.*/
        this.panelLabelObject       .destroy();         /*Delete the previous made panel for the text.*/
        this.panelLabelObject       = game.add.text(    /*Recreate the panel using new font size.*/

            (this.panelXNum + this.panelWidthNum/2),
            (this.panelYNum + this.panelHeightNum/2),
            this.objectNameAltString,
            {
                'align'     : 'center',
                'fontSize'  : this.fontSizeNum
            }

        );
        this.panelLabelObject.anchor    .setTo(0.5, 0.5);

    }

    /*The last loop is to standardized the font size per group.
    For example the exhibition objects has font size vary from 11 - 12.
    In this case we take the lowest possible font size per group.
    So in this case we took 11 pixels as the font size for all
        exhibition objects.*/
    var minFontSizeSiblingNum       = 0;                /*The minimum font size.*/
    var objectArray                 = undefined;        /*The array taken from object type string.*/
    switch(this.objectTypeString){

        case('FLR'): objectArray    = this.floorObjectArray;         break;
        case('ROM'): objectArray    = this.roomObjectArray;          break;
        case('EXH'): objectArray    = this.exhibitionObjectArray;    break;

    }

    /*This is the loop to assign the lowest possible font size.*/
    for(var i = 0 ; i < objectArray.length; i ++){

        if(i > 0){ if(objectArray[i].fontSizeNum < objectArray[i - 1].fontSizeNum){ minFontSizeSiblingNum = objectArray[i].fontSizeNum; } }
        else{ minFontSizeSiblingNum = objectArray[i].fontSizeNum; }

    }

    this.fontSizeNum            = minFontSizeSiblingNum;

    /*Destroy the previous text object and create a new one.*/
    this.panelLabelObject       .destroy();
    this.panelLabelObject       = game.add.text(

        (this.panelXNum + this.panelWidthNum/2),
        (this.panelYNum + this.panelHeightNum/2),
        this.objectNameAltString,
        {
            'align'     : 'center',
            'fontSize'  : this.fontSizeNum
        }

    );
    this.panelLabelObject.anchor    .setTo(0.5, 0.5);

};

/*A function to find the exhibition in an array of object exhibition, based on exhibition's
    name alt.*/
ObjectMuseum.prototype.FindIndexNameAltNum                      = function(_exhibitionObjectArray, _exhibitionNameAltString){

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

ObjectMuseum.prototype.FindIndexObjectNum                       = function(_playerObjectArray, _exhibitionObject){

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
ObjectMuseum.prototype.FindObject                  = function(_exhibitionNameObjectArray, _exhibitionNameAltString){

    if(

        (typeof _exhibitionNameObjectArray          === 'object') &&
        (typeof _exhibitionNameAltString            === 'string')

    ){ return _exhibitionNameObjectArray[this.FindIndexNameAltNum(_exhibitionNameObjectArray, _exhibitionNameAltString)]; }
    else{

        console.log((typeof _exhibitionNameObjectArray)     + ' is not an object.');
        console.log((typeof _exhibitionNameAltString)       + ' is not a string.');
        return undefined;

    }

};