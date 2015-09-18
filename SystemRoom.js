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

};
SystemRoom.prototype                = Object.create(System.prototype);
SystemRoom.prototype.constructor    = SystemRoom;
SystemRoom.prototype.RoomCompare    = function(_objectRoom1, _objectRoom2){

    if(_objectRoom1.roomNameAlt < _objectRoom2.roomNameAlt){ return -1; }
    if(_objectRoom1.roomNameAlt > _objectRoom2.roomNameAlt){ return  1; }
    return 0;

};
SystemRoom.prototype.RoomSystemAdd = function(_object){

    var object = this.SystemAdd(_object, 'ObjectRoom', this.roomArray, this.RoomCompare);
    if(object != 'undefined'){ this.systemEdit.nameRoomArray.push(object.roomName); }

};
SystemRoom.prototype.RoomSystemRemove = function(_roomNameAlt){

    this.SystemRemove(this.roomArray, 'roomNameAlt', _roomNameAlt);

}