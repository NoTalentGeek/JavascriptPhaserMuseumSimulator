//An object of floor that will contain any possible number of room.
ObjectFloor                         = function(_parentObject, _systemEdit, _stackIn, _stackOut, _nameFloor){

    ObjectObject.call(this, _parentObject, _systemEdit, _stackIn, _stackOut, _nameFloor, 'ObjectFloor');
    this.systemRoom 						= new SystemRoom(this, this.systemEdit);

};
ObjectFloor.prototype               = Object.create(ObjectObject.prototype);
ObjectFloor.prototype.constructor   = ObjectFloor;