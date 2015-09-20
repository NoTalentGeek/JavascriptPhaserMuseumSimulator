//Create game object to hold information for room in a museum.
ObjectRoom                          = function(_parentObject, _systemEdit, _nameRoom){

    //Super method.
    if(typeof _parentObject === 'object')   { ObjectObject.call(this, _parentObject, _systemEdit, 'ObjectRoom'); }
    //The name of this room. Should be in form of name object and not just ordinary string.
    if(typeof _nameRoom     === 'object')   {

        this.nameRoom                       = _nameRoom;
        this.nameRoomFull                   = this.nameRoom.nameFull;
        this.nameRoomAlt                    = this.nameRoom.nameAlt;

    }

    //PENDING: Add system exhibition later on here to manage all exhibition in this room.

};
ObjectRoom.prototype                = Object.create(ObjectObject.prototype);
ObjectRoom.prototype.constructor    = ObjectRoom;