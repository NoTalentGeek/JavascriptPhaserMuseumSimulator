stateMain = {

    create                      : function(){

        this.floorArray         = new Array();
        this.roomArray          = new Array();
        this.exhibitionArray    = new Array();

        this.AddFloor                           ('First Floor'  , 'FLR_FIR');
            this.AddRoom                        ('Room Africa'  , 'ROM_AFK');
            this.ChangeFloorForARoom            ('ROM_AFK'      , 'FLR_FIR');
                var tempRoom                    = this.FindRoom('ROM_AFK');
                this.AddExhibition              (tempRoom, 'Exhibition Nigeria'  , 'EXH_NIG');
                this.ChangeRoomForExhibition    ('EXH_NIG', 'ROM_AFK');
                this.AddExhibition              (tempRoom, 'Exhibition Ethiopia' , 'EXH_ETH');
                this.AddExhibition              (tempRoom, 'Exhibition Egypt'    , 'EXH_EGY');
                this.AddExhibition              (tempRoom, 'Exhibition Morocco'  , 'EXH_MOR');
            this.AddRoom                        ('Room America' , 'ROM_AME');
            this.ChangeFloorForARoom            ('ROM_AME'      , 'FLR_FIR');
            this.AddRoom                        ('Room Asia'    , 'ROM_ASI');
            this.ChangeFloorForARoom            ('ROM_ASI'      , 'FLR_FIR');

    },

    update                      : function(){},

    AddFloor                    : function(_nameFull, _nameAlt){

        var floorObject = new ObjectFloor(this, new ObjectName(_nameFull, _nameAlt));
        this.floorArray .push(floorObject);
        return floorObject;

    },

    AddRoom                     : function(_nameFull, _nameAlt){

        var roomObject = new ObjectRoom(this, new ObjectName(_nameFull, _nameAlt));
        this.roomArray .push(roomObject);
        return roomObject;

    },

    AddExhibition       : function(_nameFull, _nameAlt){

        var exhibitionObject    = new ObjectRoom(this, new ObjectName(_nameFull, _nameAlt));
        this.exhibitionArray    .push(exhibitionObject);
        return exhibitionObject

    },

    ChangeFloorForARoom         : function(_roomObject, _destined){

        if(

            typeof _roomObject === 'string' &&
            typeof _destined   === 'string'

        ){

            var arrayTempFloor                  = this.FindArrayFloor(_destined);
            var arrayTempRoom                   = this.FindArrayRoom(_roomObject);

            if(arrayTempRoom !== undefined && arrayTempFloor !== undefined){

                var floorObjectDestinedIndex    = this.FindIndex(arrayTempFloor, 'nameObjectAlt', _destined);
                var floorObjectDestined         = arrayTempFloor[floorObjectDestinedIndex];
                var roomObjectIndex             = this.FindIndex(arrayTempRoom, 'nameObjectAlt', _roomObject);
                var roomObject                  = arrayTempRoom[roomObjectIndex];
                /*First thing you need to do is to push the object into new array.
                Which is the object array in the parent object (ObjectObject.js)*/
                roomObject.parentObject         = floorObjectDestined;
                floorObjectDestined.arrayObject .push(roomObject);

                //PENDING: do not forget to add sort function here.

                //And then remove it from the source array.
                arrayTempRoom                   .splice(roomObjectIndex, 1);

                //Return the new array of the _roomObject.
                return floorObjectDestined.arrayObject

            }
            else{

                console.log('arrayTempFloor Is Undefined.');
                console.log('arrayTempRoom Is Undefined.' );
                return undefined;

            }

        }
        else{

            console.log((typeof _roomObject)    + ' Supposed To Be A String.');
            console.log((typeof _destined)      + ' Supposed To Be A String.');
            return undefined;
        
        }

    },

    ChangeRoomForExhibition     : function(_exhibitionObject, _destined){

        if(

            typeof _exhibitionObject    === 'string' &&
            typeof _destined            === 'string'

        ){

            var arrayTempRoom                   = this.FindArrayRoom(_destined);
            var arrayTempExhibition             = this.FindArrayExhibition(_exhibitionObject);

            if(arrayTempExhibition !== undefined && arrayTempRoom !== undefined){

                var roomObjectDestinedIndex     = this.FindIndex(arrayTempRoom, 'nameObjectAlt', _destined);
                var roomObjectDestined          = arrayTempRoom[roomObjectDestinedIndex];
                var exhibitionObjectIndex       = this.FindIndex(arrayTempExhibition, 'nameObjectAlt', _exhibitionObject);
                var exhibitionObject            = arrayTempExhibition[exhibitionObjectIndex];
                /*First thing you need to do is to push the object into new array.
                Which is the object array in the parent object (ObjectObject.js)*/
                exhibitionObject.parentObject   = roomObjectDestined;
                roomObjectDestined.arrayObject .push(exhibitionObject);

                //PENDING: do not forget to add sort function here.

                //And then remove it from the source array.
                arrayTempExhibition             .splice(exhibitionObjectIndex, 1);

                //Return the new array of the _exhibitionObject.
                return roomObjectDestined.arrayObject

            }
            else{

                console.log('arrayTempRoom Is Undefined.');
                console.log('arrayTempExhibition Is Undefined.' );
                return undefined;

            }

        }
        else{

            console.log((typeof _exhibitionObject)      + ' Supposed To Be A String.');
            console.log((typeof _destined)              + ' Supposed To Be A String.');
            return undefined;
        
        }

    },

    ChangeResetRoom             : function(_roomObject){

        var arrayTemp                   = this.FindArrayRoom(_roomObject);

        if(arrayTemp != undefined){

            var roomObjectIndex         = this.FindIndex(arrayTemp, 'nameObjectAlt', _roomObject);
            var roomObject              = arrayTemp[roomObjectIndex];
            roomObject.parentObject     = this;
            this.roomArray              .push(roomObject);

            //PENDING: do not forget to add sort function here.

            arrayTemp                   .splice(roomObjectIndex, 1);

        }


    },

    ChangeResetExhibition       : function(_exhibitionObject){

        var arrayTemp                   = this.FindArrayRoom(_exhibitionObject);

        if(arrayTemp != undefined){

            var exhibitionObjectIndex       = this.FindIndex(arrayTemp, 'nameObjectAlt', _exhibitionObject);
            var exhibitionObject            = arrayTemp[exhibitionObjectIndex];
            exhibitionObject.parentObject   = this;
            this.roomArray                  .push(exhibitionObject);

            //PENDING: do not forget to add sort function here.

            arrayTemp                       .splice(exhibitionObjectIndex, 1);

        }


    },

    FindArrayFloor              : function(_floorObject){

        if(typeof _floorObject === 'string'){

            var arrayTemp;
            for(var i = 0; i < this.floorArray.length; i ++){

                if(this.floorArray[i].nameObjectAlt == _floorObject){ arrayTemp = this.floorArray; }

            }
            return arrayTemp;

        }
        else{

            console.log((typeof _floorObject) + ' Supposed To Be A String');
            return undefined;

        }

    },

    FindRoom                    : function(_roomNameAlt){

        var tempRoomArray       = this.FindArrayRoom(_roomNameAlt);
        var tempRoomIndex       = this.FindIndex(tempRoomArray, 'nameObjectAlt', _roomNameAlt);
        var tempRoom            = tempRoomArray[tempRoomIndex];
        return                  tempRoom;

    },

    FindArrayRoom               : function(_roomObject){

        if(typeof _roomObject === 'string'){

            var arrayTemp;
            for(var i = 0; i < this.floorArray.length; i ++){

                for(var j = 0; j < this.floorArray[i].arrayObject.length; j ++){

                    if(this.floorArray[i].arrayObject[j].nameObjectAlt == _roomObject){

                        arrayTemp = this.floorArray[i].arrayObject;

                    }

                }

            }
            if(arrayTemp === undefined){

                for(var i = 0; i < this.roomArray.length; i ++){

                    if(this.roomArray[i].nameObjectAlt == _roomObject){ arrayTemp = this.roomArray; }

                }

            }
            return arrayTemp;

        }
        else{

            console.log((typeof _roomObject) + ' Supposed To Be A String');
            return undefined;

        }

    },

    FindArrayExhibition         : function(_exhibitionObject){

        if(typeof _exhibitionObject === 'string'){

            var arrayTemp;
            for(var i = 0; i < this.floorArray.length; i ++){

                for(var j = 0; j < this.floorArray[i].arrayObject.length; j ++){

                    for(var k = 0; k < this.floorArray[i].arrayObject[j].arrayObject.length; k ++){

                        if(this.floorArray[i].arrayObject[j].arrayObject[k].nameObjectAlt == _exhibitionObject){

                            arrayTemp = this.floorArray[i].arrayObject[j].arrayObject;

                        }

                    }

                }

            }
            if(arrayTemp === undefined){

                for(var i = 0; i < this.exhibitionArray.length; i ++){

                    if(this.exhibitionArray[i].nameObjectAlt == _exhibitionObject){ arrayTemp = this.exhibitionArray; }

                }

            }
            return arrayTemp;

        }
        else{

            console.log((typeof _exhibitionObject) + ' Supposed To Be A String');
            return undefined;

        }

    },

    FindIndex                   : function(_targetArray, _variableName, _value){

        //Verification.
        if(

              typeof _targetArray   !== 'object' &&
              typeof _variableName  !== 'string' &&
            ((typeof _value !== 'number') || (typeof _value !== 'string'))

        ){ return undefined; }

        /*What basically done here is to loop to all objects/elements within an array and then
            check one by one the variable name to compare with the desired value.
        This function return the desired index.
        If the variable or the value is not found then return undefined*/
        for(var i = 0; i < _targetArray.length; i ++){ if(_targetArray[i][_variableName] == _value){ return i; } }
        return undefined;

    }

};