//Create game object to hold information for room in a museum.
ObjectRoom                          = function(_parent, _index, _name, _exhibitionArray){

    this.parent                     = _parent;  //The parent of this object (it is supposed to be system room object).
    this.index                      = _index;   //The index of this room object out of all possible room.
    this.name                       = _name;    //The name of this room.

};
ObjectRoom.prototype.constructor    = ObjectRoom;