//An object of floor that will contain any possible number of room.
ObjectFloor                         = function(_parentObject, _nameFloor){

    ObjectObject.					call(this, _parentObject, _nameFloor, 'ObjectFloor');

};
ObjectFloor.prototype               = Object.create(ObjectObject.prototype);
ObjectFloor.prototype.constructor   = ObjectFloor;