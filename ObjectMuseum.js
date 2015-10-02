/*An object to handle all the museum related object.
This object can be used as floor, room, and the exhibition itself.
PENDING: Add verification for every arguments.*/ 
ObjectMuseum                                        = function(){

    /*Example of Javascript polymorphism.*/
    switch(arguments.length){

        case(3):
            this.PolyConsVoid            (arguments[0], arguments[1], arguments[2]);
        break;
        case(4):
            this.PolyConsExhibitionVoid  (arguments[0], arguments[1], arguments[2], arguments[3]);
        break;

    }   
    
}
ObjectMuseum.prototype.construtor                   = ObjectMuseum;

/*The normal constructor.*/
ObjectMuseum.prototype.PolyConsVoid                 = function(_objectParentNameAltString, _objectTypeString, _objectNameString){

    if(

        typeof _objectParentNameAltString           === 'string' &&
        typeof _objectTypeString                    === 'string' &&
        typeof _objectNameString                    === 'object'

    ){

        this.objectParentNameAltString              = _objectParentNameAltString;           /*The object name alt for the parent object (string).*/
        this.objectTypeString                       = _objectTypeString;                    /*The type of this object (fill in 'FLR', 'ROM', 'EXH', or 'TAG').*/
        this.objectNameString                       = _objectNameString;
        this.objectNameFullString                   = this.objectNameString.nameFullString;
        this.objectNameAltString                    = this.objectNameString.nameAltString;
        this.visitorCurrentNum                      = 0;
        this.visitorTotalNum                        = 0;
        this.tagStringArray                         = new Array(3);

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

/*Constructor used when this object is used to instantiate exhibition object.*/
ObjectMuseum.prototype.PolyConsExhibitionVoid       = function(_objectParentNameAltString, _objectTypeString, _objectNameString, _roomObjectArray){

    if(

        typeof _objectParentNameAltString           === 'string' &&
        typeof _objectTypeString                    === 'string' &&
        typeof _objectNameString                    === 'object' &&
        typeof _roomObjectArray                     === 'object'

    ){

        this.objectParentNameAltString              = _objectParentNameAltString;           /*The object name alt for the parent object (string).*/
        this.objectTypeString                       = _objectTypeString;                    /*The type of this object (fill in 'FLR', 'ROM', 'EXH', or 'TAG').*/
        this.objectNameString                       = _objectNameString;
        this.objectNameFullString                   = this.objectNameString.nameFullString;
        this.objectNameAltString                    = this.objectNameString.nameAltString;
        this.visitorCurrentNum                      = 0;
        this.visitorTotalNum                        = 0;
        this.tagStringArray                         = new Array(3);

        this.panelXNum                              = 0;
        this.panelYNum                              = 0;
        this.panelWidthNum                          = 0;
        this.panelHeightNum                         = 0;

        if(this.objectTypeString                    == 'EXH'){

            this.objectRoomString                   = this.objectParentNameAltString;
            this.objectFloorString                  = this.FindObject(_roomObjectArray, this.objectRoomString).objectParentNameAltString;

        }

    }
    else{

        console.log                                 ((typeof _objectParentNameAltString)    + ' supposed to be a string.');
        console.log                                 ((typeof _objectTypeString)             + ' supposed to be a string.');
        console.log                                 ((typeof _objectNameString)             + ' supposed to be a object.');
        console.log                                 ((typeof _roomObjectArray)              + ' supposed to be a object.');

    }

};

/*A function to create a graphical user interface for each museum object.*/
ObjectMuseum.prototype.CreatePanelVoid              = function(_indexNum, _offsetXNum, _offsetYNum, _totalRowNum, _floorObjectArray, _roomObjectArray, _exhibitionObjectArray){

    this.indexNum                   = _indexNum;

    if(this.objectTypeString        == 'FLR'){

        this.panelWidthNum          =  game.width  - (_offsetXNum*2);
        this.panelHeightNum         = (game.height - ((_offsetYNum*_totalRowNum) + _offsetYNum))/_totalRowNum;

        var panelObject             = game.add.sprite(

            _offsetXNum + (this.indexNum*this.panelWidthNum) + (this.indexNum*_offsetXNum),
            _offsetYNum,
            'ImagePanel2New'

        );
            panelObject.width       = this.panelWidthNum;
            panelObject.height      = this.panelHeightNum;
        this.panelXNum              = panelObject.x;
        this.panelYNum              = panelObject.y;

    }
    else if(this.objectTypeString   == 'ROM'){

        var siblingCountNum         = 0;
        for(var i = 0; i < _roomObjectArray.length; i ++){

            if(_roomObjectArray[i].objectParentNameAltString == this.objectParentNameAltString){ siblingCountNum ++; }

        }
        siblingCountNum             = (siblingCountNum == 0) ? 1 : siblingCountNum;

        var parentObject            = this.FindObject(_floorObjectArray, this.objectParentNameAltString);

        this.panelWidthNum          = (parentObject.panelWidthNum - (_offsetXNum*(siblingCountNum - 1)))/siblingCountNum
        this.panelHeightNum         = parentObject.panelHeightNum;

        var panelObject             = game.add.sprite(

            parentObject.panelXNum  + (this.indexNum*this.panelWidthNum) + (this.indexNum*_offsetXNum),
            parentObject.panelYNum  + parentObject.panelHeightNum + _offsetYNum,
            'ImagePanel3New'

        );
            panelObject.width       = this.panelWidthNum;
            panelObject.height      = this.panelHeightNum;
        this.panelXNum              = panelObject.x;
        this.panelYNum              = panelObject.y;

    }
    else if(this.objectTypeString   == 'EXH'){

        var siblingCountNum         = 0;
        for(var i = 0; i < _exhibitionObjectArray.length; i ++){

            if(_exhibitionObjectArray[i].objectParentNameAltString == this.objectParentNameAltString){ siblingCountNum ++; }

        }
        siblingCountNum             = (siblingCountNum == 0) ? 1 : siblingCountNum;

        var parentObject            = this.FindObject(_roomObjectArray, this.objectParentNameAltString);

        this.panelWidthNum          = (parentObject.panelWidthNum - (_offsetXNum*(siblingCountNum - 1)))/siblingCountNum
        this.panelHeightNum         = parentObject.panelHeightNum;

        var panelObject             = game.add.sprite(

            parentObject.panelXNum  + (this.indexNum*this.panelWidthNum) + (this.indexNum*_offsetXNum),
            parentObject.panelYNum  + parentObject.panelHeightNum + _offsetYNum,
            'ImagePanel4New'

        );
            panelObject.width       = this.panelWidthNum;
            panelObject.height      = this.panelHeightNum;
        this.panelXNum              = panelObject.x;
        this.panelYNum              = panelObject.y;

    }

};

/*A function to find the exhibition in an array of object exhibition, based on exhibition's
    name alt.*/
ObjectMuseum.prototype.FindIndexNum                 = function(_exhibitionObjectArray, _exhibitionNameAltString){

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
ObjectMuseum.prototype.FindObject                  = function(_exhibitionNameObjectArray, _exhibitionNameAltString){

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