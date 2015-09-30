/*An object to handle all the museum related object.
This object can be used as floor, room, and the exhibition itself.
PENDING: Add verification for every arguments.*/ 
ObjectMuseum                                = function(_objectParentAltNameString, _objectTypeString, _objectNameString, _roomObjectArray){

    if(

        typeof _objectParentAltNameString   === 'string' &&
        typeof _objectTypeString            === 'string' &&
        typeof _objectNameString            === 'object' &&
        typeof _roomObjectArray             === 'object'

    ){

        this.objectParentNameAltString      = _objectParentAltNameString;           /*The object name alt for the parent object (string).*/
        this.objectTypeString               = _objectTypeString;                    /*The type of this object (fill in 'FLR', 'ROM', 'EXH', or 'TAG').*/
        this.objectNameString               = _objectNameString;
        this.objectNameFullString           = this.objectNameString.nameFullString;
        this.objectNameAltString            = this.objectNameString.nameAltString;
        this.visitorCurrentNum              = 0;
        this.visitorTotalNum                = 0;
        this.tagStringArray                 = new Array(3);

        if(this.objectTypeString            == 'EXH'){

            this.objectRoomString           = this.objectParentNameAltString;
            this.objectFloorString          = this.FindObject(_roomObjectArray, this.objectRoomString).objectParentNameAltString;

        }

    }
    else{

        console.log                         ((typeof _objectParentAltNameString)    + ' supposed to be a string.');
        console.log                         ((typeof _objectTypeString)             + ' supposed to be a string.');
        console.log                         ((typeof _objectNameString)             + ' supposed to be a object.');
        console.log                         ((typeof _roomObjectArray)              + ' supposed to be a object.');

    }
    
}
ObjectMuseum.prototype.construtor           = ObjectMuseum;

/*A function to find the exhibition in an array of object exhibition, based on exhibition's
    name alt.*/
ObjectPlayer.prototype.FindIndexNum         = function(_exhibitionObjectArray, _exhibitionNameAltString){

    if(

        (typeof _exhibitionObjectArray      === 'object') &&
        (typeof _exhibitionNameAltString    === 'string')

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
ObjectPlayer.prototype.FindObject           = function(_exhibitionNameObjectArray, _exhibitionNameAltString){

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
