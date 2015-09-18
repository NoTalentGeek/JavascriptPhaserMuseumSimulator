//Create game object to hold information for room in a museum.
ObjectRoom                          = function(_roomParent, _roomIndex, _roomName){

    this.objectName                 = 'ObjectRoom';
    this.roomParent                 = _roomParent;  //The parent of this object (it is supposed to be system room object).
    this.roomIndex                  = _roomIndex;   //The index of this room object out of all possible room.

    //The name of this room. Should be in form of name object and not just ordinary string.
    this.roomName                   = _roomName;
    this.roomNameFull               = this.roomName.nameFull;
    this.roomNameAlt                = this.roomName.nameAlt;

    this.visitorCurrent             = 0;            //The current visitor that is currently in the room.
    this.visitorTotal               = 0;            //The total visitor that visited the room today (or at any given time).
    
    //PENDING: Add system exhibition later on here to manage all exhibition in this room.

};
ObjectRoom.prototype.constructor    = ObjectRoom;