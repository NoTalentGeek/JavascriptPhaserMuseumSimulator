SystemFloor                                 = function(_parentObject, _systemEdit){

    //This class is inherited from System class.
    System.call                         (this, _parentObject, 'SystemFloor');

    //Verify the argument.
    if(typeof _systemEdit === 'object' && _systemEdit.nameSystem == 'SystemEdit'){

        this.systemEdit                     = _systemEdit;

    }

    //Create an array to hold all the floors.
    this.floorArray                         = new Array();
    //Instantiate array based on how many name available in the SystemEdit class.
    for(var i = 0; i < this.systemEdit.nameFloorArray.length - 1; i ++){

        var floor                           = new ObjectFloor(this, this.systemEdit.nameFloorArray[i]);
        //Push every new object into floor array.
        this.floorArray                     .push(floor);

    }

};
SystemFloor.prototype                       = Object.create(System.prototype);
SystemFloor.prototype.constructor           = SystemFloor;

//Local function to compare local variable.
SystemFloor.prototype.FloorCompare          = function(_objectFloor1, _objectFloor2){


    //Need verification to ensure that both objects in argument are ObjectFloor.
    if(

        (typeof _objectFloor1               === 'object'        && typeof _objectFloor2      === 'object')       &&
        (_objectFloor1.nameObject           ==  'ObjectFloor'   && _objectFloor2.nameObject  ==  'ObjectFloor')

    ){

        if(_objectFloor1.nameFloorAlt < _objectFloor2.nameFloorAlt){ return -1; }
        if(_objectFloor1.nameFloorAlt > _objectFloor2.nameFloorAlt){ return  1; }
        return 0;

    }
    else{ return 'undefined'; }

};

/*A function that is a merge between this function and parent function of SystemAdd().
The term merge here means this function uses SystemAdd() function from parent with additional
    functionality and logic.*/
SystemFloor.prototype.FloorSystemAdd        = function(_object){

    /*This is the function from the parent object.
    As you can see the parameter here is only a string of which contains floor name to remove.*/
    var object = this.SystemAdd(_object, 'ObjectFloor', this.floorArray, this.FloorCompare);
    if(object != 'undefined'){
        this.systemEdit.nameFloorArray   .push(object.nameFloor);
        this.systemEdit                  .SystemSort(this.systemEdit.nameFloorArray, this.systemEdit.Compare);
    }
    return object;

};

/*Another merge function with the parent function of SystemRemove() this time it is
    for removing floor from this.floorArray.*/
SystemFloor.prototype.FloorSystemRemove     = function(_nameFloorAlt){

    var array = this.SystemRemove(this.floorArray, 'nameFloorAlt', _nameFloorAlt);
    this.systemEdit.SystemRemove(this.systemEdit.nameFloorArray, 'nameAlt', _nameFloorAlt);
    return array;

}