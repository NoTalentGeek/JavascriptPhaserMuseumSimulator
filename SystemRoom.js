/*System game object that manages room.
All the room will be instantiated here and
    will be put its default value there.*/
SystemRoom                          = function(_systemEdit){

    System.call                     (this);

    this.systemEdit                 = _systemEdit;
    this.roomArray                  = new Array();

    for(var i = 0; i < this.systemEdit.nameRoomArray.length - 1; i ++){

        var room                    = new ObjectRoom(this, this.systemEdit.nameRoomArray[i]);
        this.roomArray              .push(room);

    }

    //for(var i = 0; i < this.roomArray.length; i ++){ console.log(this.roomArray[i]['roomNameAlt']); }
    //console.log(this.RoomFindIndex('roomNameAlt', 'ROM_EUR'));

};
SystemRoom.prototype                = Object.create(System.prototype);
SystemRoom.prototype.constructor    = SystemRoom;
//When you add a new room do not forget to put the name reference back into system edit object.
SystemRoom.prototype.RoomAdd        = function(_objectRoom){

    if(_objectRoom.objectName == 'ObjectRoom'){

        this.systemEdit.nameRoomArray   .push(_objectRoom.roomName);
        this.roomArray                  .push(_objectRoom);
        this.RoomSort                   ();
        return                          _objectRoom

    }

};
/*
System.prototype.SystemAdd          = (function(){

    var cachedFunction              = this.SystemAdd;

    return function(_object, _objectName, _targetArray){

        cachedFunction.apply(this, arguments);
        if(isCorrectObject){ this.systemEdit.nameRoomArray   .push(_objectRoom.roomName); }

    };

}());
*/
SystemRoom.prototype.RoomCompare    = function(_objectRoom1, _objectRoom2){

    if(_objectRoom1.roomNameAlt < _objectRoom2.roomNameAlt){ return -1; }
    if(_objectRoom1.roomNameAlt > _objectRoom2.roomNameAlt){ return  1; }
    return 0;

};
SystemRoom.prototype.RoomFindIndex  = function(_variable, _value){

    for(var i = 0; i < this.roomArray.length; i ++){

        if(this.roomArray[i][_variable] == _value){ return i; }

    }

};
SystemRoom.prototype.RoomRemove     = function(_roomNameAltToRemove){

    var index           = this.RoomFindIndex('roomNameAlt', _roomNameAltToRemove);
    if (index > -1)     { this.roomArray.splice(index, 1); }

};
SystemRoom.prototype.RoomSort       = function(){

    this.systemEdit                 .RoomNameSort();
    this.roomArray                  .sort(this.RoomCompare);

};