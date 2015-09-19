//An object of floor that will contain any possible number of room.
ObjectFloor                         = function(_parentObject, _nameFloor){

    if(typeof _parentObject === 'object')   { ObjectObject.call(this, _parentObject, 'ObjectFloor'); }
    if(typeof _nameFloor    === 'object')   {

        this.nameFloor                      = _nameFloor;
        this.nameFloorFull                  = this.nameFloor.nameFull;
        this.nameFloorAlt                   = this.nameFloor.nameAlt;

    }

    //PENDING: Add system room later on here to manage all exhibition in this floor.

};
ObjectFloor.prototype               = Object.create(ObjectObject.prototype);
ObjectFloor.prototype.constructor   = ObjectFloor;