/*System game object that manages room.
All the room will be instantiated here and
    will be put its default value there.*/
SystemRoom                          = function(_systemEdit){

    //This class is inherited from System class.
    System.call                     (this, 'SystemRoom');

    //Verify the argument.
    if(typeof _systemEdit === 'object' && _systemEdit.nameSystem == 'SystemEdit'){

        this.systemEdit             = _systemEdit;

    }

    //Create an array to hold all the rooms.
    this.roomArray                  = new Array();
    //Instantiate array based on how many name available in the SystemEdit class.
    for(var i = 0; i < this.systemEdit.nameRoomArray.length - 1; i ++){

        var room                    = new ObjectRoom(this, this.systemEdit.nameRoomArray[i]);
        //Push every new object into room array.
        this.roomArray              .push(room);

    }

};

SystemRoom.prototype                = Object.create(System.prototype);

SystemRoom.prototype.constructor    = SystemRoom;

//Local function to compare local variable.
SystemRoom.prototype.RoomCompare    = function(_objectRoom1, _objectRoom2){


    //Need verification to ensure that both objects in argument are ObjectRoom.
    if(

        (typeof _objectRoom1        === 'object'        && typeof _objectRoom2      === 'object')       &&
        (_objectRoom1.nameObject    ==  'ObjectRoom'    && _objectRoom2.nameObject  ==  'ObjectRoom')

    ){

        if(_objectRoom1.nameRoomAlt < _objectRoom2.nameRoomAlt){ return -1; }
        if(_objectRoom1.nameRoomAlt > _objectRoom2.nameRoomAlt){ return  1; }
        return 0;

    }
    else{ return 'undefined'; }

};

/*A function that is a merge between this function and parent function of SystemAdd().
The term merge here means this function uses SystemAdd() function from parent with additional
    functionality and logic.*/
SystemRoom.prototype.RoomSystemAdd = function(_object){

    /*This is the function from the parent object.
    As you can see the parameter here is only a string of which contains room name to remove.*/
    var object = this.SystemAdd(_object, 'ObjectRoom', this.roomArray, this.RoomCompare);
    if(object != 'undefined'){
        this.systemEdit.nameRoomArray   .push(object.nameRoom);
        this.systemEdit                 .SystemSort(this.systemEdit.nameRoomArray, this.systemEdit.EditRoomCompare);
    }
    return object;

};

/*Another merge function with the parent function of SystemRemove() this time it is
    for removing room from this.roomArray.*/
SystemRoom.prototype.RoomSystemRemove = function(_nameRoomAlt){

    var array = this.SystemRemove(this.roomArray, 'nameRoomAlt', _nameRoomAlt);
    this.systemEdit.SystemRemove(this.systemEdit.nameRoomArray, 'nameAlt', _nameRoomAlt);
    return array;

}