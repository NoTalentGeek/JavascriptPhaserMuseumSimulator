stateMain = {

    create              : function(){

        this.floorArray = new Array();
        this.roomArray  = new Array();
        this.AddFloor   ('First Floor'  , 'FLR_FIR');
        this.AddRoom    ('Room Africa'  , 'ROM_AFK');
        this.AddRoom    ('Room America' , 'ROM_AME');

        console.log     (this.roomArray.length);

        //Prototype change room.
        var roomObjectIndex             = this.FindIndexRoom('ROM_AFK');
        var roomObject                  = this.roomArray[roomObjectIndex];
        /*First thing you need to do is to push the object into new array.
        Which is the object array in the parent object (ObjectObject.js)*/
        var floorObjectDestinedIndex    = this.FindIndexFloor('FLR_FIR');
        var floorObjectDestined         = this.floorArray[floorObjectDestinedIndex];
        roomObject.parentObject         = floorObjectDestined;
        floorObjectDestined.arrayObject .push(roomObject);
        //And then remove it from the source array.
        this.roomArray                  .splice(roomObjectIndex, 1);

        console.log     (this.roomArray.length);
        console.log     (floorObjectDestined.arrayObject.length);

    },

    update              : function(){},

    AddFloor            : function(_nameFull, _nameAlt){

        var floorObject = new ObjectFloor(this, new ObjectName(_nameFull, _nameAlt));
        this.floorArray .push(floorObject);
        return floorObject;

    },

    AddRoom             : function(_nameFull, _nameAlt){

        var roomObject = new ObjectRoom(this, new ObjectName(_nameFull, _nameAlt));
        this.roomArray .push(roomObject);
        return roomObject;

    },

    FindIndex           :function(_targetArray, _variableName, _value){

        //Verification.
        if(

              typeof _targetArray   !== 'object' &&
              typeof _variableName  !== 'string' &&
            ((typeof _value !== 'number') || (typeof _value !== 'string'))

        ){ return 'undefined'; }

        /*What basically done here is to loop to all objects/elements within an array and then
            check one by one the variable name to compare with the desired value.
        This function return the desired index.
        If the variable or the value is not found then return 'undefined'*/
        for(var i = 0; i < _targetArray.length; i ++){ if(_targetArray[i][_variableName] == _value){ return i; } }
        return 'undefined';

    },

    FindIndexFloor      : function(_value){ return this.FindIndex(this.floorArray,  'nameObjectAlt', _value); },
    FindIndexRoom       : function(_value){ return this.FindIndex(this.roomArray,   'nameObjectAlt', _value); }

};