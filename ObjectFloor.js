//An object of floor that will contain any possible number of room.
ObjectFloor                         = function(_parentObject, _systemEdit, _nameFloor){

    if(typeof _parentObject === 'object')   { ObjectObject.call(this, _parentObject, _systemEdit, 'ObjectFloor'); }
    if(typeof _nameFloor    === 'object')   {

        this.nameFloor                      = _nameFloor;
        this.nameFloorFull                  = this.nameFloor.nameFull;
        this.nameFloorAlt                   = this.nameFloor.nameAlt;

    }

    this.systemRoom 						= new SystemRoom(this, this.systemEdit);

};
ObjectFloor.prototype               = Object.create(ObjectObject.prototype);
ObjectFloor.prototype.constructor   = ObjectFloor;