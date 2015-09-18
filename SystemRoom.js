/*System game object that manages room.
All the room will be instantiated here and
    will be put its default value there.*/
SystemRoom                          = function(_systemEdit){

    this.objectName                 = 'SystemRoom';
    this.systemEdit                 = _systemEdit;
    this.roomArray                  = new Array();

    for(var i = 0; i < this.systemEdit.nameRoomArray.length - 1; i ++){

        var room                    = new ObjectRoom(this, i, this.systemEdit.nameRoomArray[i + 1]);
        this.roomArray              .push(room);

    }

};
SystemRoom.prototype.constructor    = SystemRoom;
//When you add a new room do not forget to put the name reference back into system edit object.
SystemRoom.prototype.RoomAdd        = function(_objectRoom){

    if(_objectRoom.objectName == 'ObjectRoom'){

        this.systemEdit.nameRoomArray   .push(_objectRoom.roomName);
        this.roomArray                  .push(_objectRoom);
        this.RoomSort                   ();
        return                          _objectRoom

    }
    else{ return null; }

};
SystemRoom.prototype.RoomCompare    = function(_objectRoom1, _objectRoom2){

    if(_objectRoom1.roomNameAlt < _objectRoom2.roomNameAlt){ return -1; }
    if(_objectRoom1.roomNameAlt > _objectRoom2.roomNameAlt){ return  1; }
    return 0;

};
SystemRoom.prototype.RoomRemove     = function(){};
SystemRoom.prototype.RoomSort       = function(){

    this.systemEdit                 .RoomNameSort();
    this.roomArray                  .sort(this.RoomCompare)
    
};