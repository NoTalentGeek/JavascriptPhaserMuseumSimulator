//Create game object to hold information for room in a museum.
ObjectRoom                          = function(_parentObject, _systemEdit, _nameRoom){

    ObjectObject.call(this, _parentObject, _systemEdit, _nameRoom, 'ObjectRoom');
    //PENDING: Add system exhibition later on here to manage all exhibition in this room.

};
ObjectRoom.prototype                = Object.create(ObjectObject.prototype);
ObjectRoom.prototype.constructor    = ObjectRoom;