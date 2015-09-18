System                              = function(){};
System.prototype.constructor        = System;
System.prototype.SystemAdd          = function(_object, _objectName, _targetArray, _compareFunction){

    var isCorrectObject             = false;
    if(_object.objectName           == _objectName){

        isCorrectObject             = true;
        _targetArray                .push(_object);
        this.SystemSort             (_targetArray, _compareFunction);
        return                      _object;

    }

};
/*
System.prototype.SystemCompare      = function(_object1, _object2){

    if(_object1.roomNameAlt < _object2.roomNameAlt){ return -1; }
    if(_object1.roomNameAlt > _object2.roomNameAlt){ return  1; }
    return 0;

};
*/
System.prototype.SystemFindIndex    = function(_array, _variable, _value){

    for(var i = 0; i < _array.length; i ++){ if(_array[i][_variable] == _value){ return i; } }

};
System.prototype.SystemRemove       = function(_array, _variableName, _variableIndicator){

    var index           = this.SystemFindIndex(_variableName, _variableIndicator);
    if (index > -1)     { _array.splice(index, 1); }
    return _array;

};
System.prototype.SystemSort         = function(_array, _compareFunction){ _array.sort(_compareFunction); };