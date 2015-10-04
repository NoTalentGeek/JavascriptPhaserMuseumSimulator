/*An object to handle all the museum related object.
This object can be used as floor, room, and the exhibition itself.
PENDING: Add verification for every arguments.*/ 
ObjectMuseum                                        =  function(

    _objectParentNameAltString  ,
    _objectTypeString           ,
    _objectNameString

){

    if(

        typeof _objectParentNameAltString           === 'string' &&
        typeof _objectTypeString                    === 'string' &&
        typeof _objectNameString                    === 'object'

    ){

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
        this.panelXNum                              = 0;
        this.panelYNum                              = 0;
        this.panelWidthNum                          = 0;
        this.panelHeightNum                         = 0;

    }
    else{

        console.log                                 ((typeof _objectParentNameAltString)    + ' supposed to be a string.');
        console.log                                 ((typeof _objectTypeString)             + ' supposed to be a string.');
        console.log                                 ((typeof _objectNameString)             + ' supposed to be a object.');

    }

};

ObjectMuseum.prototype.construtor                   = ObjectMuseum;

/*A function to create a graphical user interface for each museum object.*/
ObjectMuseum.prototype.CreatePanelVoid              = function(

    _offsetXNum             ,
    _offsetYNum             ,
    _totalRowNum            ,
    _floorObjectArray       ,
    _roomObjectArray        ,
    _exhibitionObjectArray

){

    if(

        typeof _offsetXNum              === 'number' &&
        typeof _offsetYNum              === 'number' &&
        typeof _totalRowNum             === 'number' &&
        typeof _floorObjectArray        === 'object' &&
        typeof _roomObjectArray         === 'object' &&
        typeof _exhibitionObjectArray   === 'object'

    ){

        this.offsetXNum                             = _offsetXNum;
        this.offsetYNum                             = _offsetYNum;
        this.totalRowNum                            = _totalRowNum;
        this.floorObjectArray                       = _floorObjectArray;
        this.roomObjectArray                        = _roomObjectArray;
        this.exhibitionObjectArray                  = _exhibitionObjectArray;

        /*If this object is a floor object.*/
        if(this.objectTypeString        == 'FLR'){

            var indexNum                = this.FindIndexObjectNum(this.floorObjectArray, this);
            
            /*These lines of codes below is to determine the width and the height of the panel.
            For floor object you do not need to compare it to the parent, because floor object has no parent.*/
            this.panelWidthNum          =  game.width  -  (this.offsetXNum*2);
            this.panelHeightNum         = (game.height - ((this.offsetYNum*this.totalRowNum) + this.offsetYNum))/this.totalRowNum;

            /*Create the panel image here.*/
            var panelObject             = game.add.sprite(

                this.offsetXNum + (indexNum*this.panelWidthNum) + (indexNum*this.offsetXNum),
                this.offsetYNum,
                'ImagePanel2New'

            );
            /*Set the width and the height for the object to meet the variables we have made before.*/
                panelObject.width       = this.panelWidthNum;
                panelObject.height      = this.panelHeightNum;
            /*Refer back the panel x and y position to the variables for easy referencing.*/
            this.panelXNum              = panelObject.x;
            this.panelYNum              = panelObject.y;

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

            /*Get reference to the parent object.*/
            var parentObject                    = this.FindObject(this.floorObjectArray, this.objectParentNameAltString);
            /*PENDING: If you want to change a room then do not forget to remove this from array.*/
                parentObject.childObjectArray   .push(this);
            var indexNum                        = this.FindIndexObjectNum(parentObject.childObjectArray, this);

            /*These lines of codes below is to determine the width and the height of the panel.
            For object other than floor object you need to compare the width and height based on the parent object.*/
            this.panelWidthNum          = (parentObject.panelWidthNum - (this.offsetXNum*(siblingCountNum - 1)))/siblingCountNum;
            this.panelHeightNum         = parentObject.panelHeightNum;

            /*Create the panel image here.*/
            var panelObject             = game.add.sprite(

                parentObject.panelXNum  + (indexNum*this.panelWidthNum) + (indexNum*this.offsetXNum),
                parentObject.panelYNum  + parentObject.panelHeightNum + this.offsetYNum,
                'ImagePanel3New'

            );
            /*Set the width and the height for the object to meet the variables we have made before.*/
                panelObject.width       = this.panelWidthNum;
                panelObject.height      = this.panelHeightNum;
            /*Refer back the panel x and y position to the variables for easy referencing.*/
            this.panelXNum              = panelObject.x;
            this.panelYNum              = panelObject.y;

        }
        /*If this object is a exhibition object.*/
        else if(this.objectTypeString   == 'EXH'){

            /*With this codes below I want to know how many object shared with same parent.
            This information can be used to determine the division of layout.*/
            var siblingCountNum         = 0;
            for(var i = 0; i < this.exhibitionObjectArray.length; i ++){

                if(this.exhibitionObjectArray[i].objectParentNameAltString == this.objectParentNameAltString){ siblingCountNum ++; }

            }

            /*Get reference to the parent object.*/
            var parentObject                    = this.FindObject(this.roomObjectArray, this.objectParentNameAltString);
            /*PENDING: If you want to change a room then do not forget to remove this from array.*/
                parentObject.childObjectArray   .push(this);
            var indexNum                        = this.FindIndexObjectNum(parentObject.childObjectArray, this);

            /*These lines of codes below is to determine the width and the height of the panel.
            For object other than floor object you need to compare the width and height based on the parent object.*/
            this.panelWidthNum          = (parentObject.panelWidthNum - (this.offsetXNum*(siblingCountNum - 1)))/siblingCountNum;
            this.panelHeightNum         = parentObject.panelHeightNum;

            /*Create the panel image here.*/
            var panelObject             = game.add.sprite(

                parentObject.panelXNum  + (indexNum*this.panelWidthNum) + (indexNum*this.offsetXNum),
                parentObject.panelYNum  + parentObject.panelHeightNum + this.offsetYNum,
                'ImagePanel4New'

            );
            /*Set the width and the height for the object to meet the variables we have made before.*/
                panelObject.width       = this.panelWidthNum;
                panelObject.height      = this.panelHeightNum;
            /*Refer back the panel x and y position to the variables for easy referencing.*/
            this.panelXNum              = panelObject.x;
            this.panelYNum              = panelObject.y;

        }

    }
    else{

        console.log((typeof _offsetXNum)                + ' is not a number.' );
        console.log((typeof _offsetYNum)                + ' is not a number.' );
        console.log((typeof _totalRowNum)               + ' is not a number.' );
        console.log((typeof _floorObjectArray)          + ' is not an object.');
        console.log((typeof _roomObjectArray)           + ' is not an object.');
        console.log((typeof _exhibitionObjectArray)     + ' is not an object.');

    }

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