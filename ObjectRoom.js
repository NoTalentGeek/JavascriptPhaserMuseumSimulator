//Create game object to hold information for room in a museum.
ObjectRoom                          = function(_objectParent, _roomName){

    //Super method.
    if(typeof _objectParent === 'object')   { ObjectObject.call(this, _objectParent, 'ObjectRoom'); }

    //The name of this room. Should be in form of name object and not just ordinary string.
    if(typeof _roomName === 'string')       { this.roomName = _roomName; }

    this.roomNameFull               = this.roomName.nameFull;
    this.roomNameAlt                = this.roomName.nameAlt;
    
    //PENDING: Add system exhibition later on here to manage all exhibition in this room.

};
ObjectRoom.prototype                = Object.create(ObjectObject.prototype);
ObjectRoom.prototype.constructor    = ObjectRoom;