/*This is a system object that is editable
    so that when user want to edit the value of this program,
    he/she can just edit value from this object.*/
SystemEdit                              = function(_parentObject){

    System.call                         (this, _parentObject, 'SystemEdit');

    this.floorStack                     = new Array();

};

SystemEdit.prototype                    = Object.create(System.prototype);

SystemEdit.prototype.constructor        = SystemEdit;

//Comparison function. 
SystemEdit.prototype.Compare            = function(_objectName1, _objectName2){

    if(_objectName1.nameObjectAlt < _objectName2.nameObjectAlt){ return -1; }
    if(_objectName1.nameObjectAlt > _objectName2.nameObjectAlt){ return  1; }
    return 0;

};