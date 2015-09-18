System                              = function(){};
System.prototype.constructor        = System;
System.prototype.SystemAdd          = function(_object, _objectName, _targetArray, _compareFunction){

    if(_object.objectName           == _objectName){

        _targetArray                .push(_object);
        this.SystemSort             (_targetArray, _compareFunction);
        return                      _object;

    }

};
System.prototype.SystemCompare      = function(_object1Variable, _object2Variable){

    if(_object1Variable < _object2Variable){ return -1; }
    if(_object1Variable > _object2Variable){ return  1; }
    return 0;

};
System.prototype.SystemFindIndex    = function(_array, _variableName, _value){

    for(var i = 0; i < _array.length; i ++){ if(_array[i][_variableName] == _value){ return i; } }

};
System.prototype.SystemRemove       = function(_array, _variableName, _value){

    var index           = this.SystemFindIndex(_array, _variableName, _value);
    if (index > -1)     { _array.splice(index, 1); }
    return _array;

};
System.prototype.SystemSort         = function(_array, _compareFunction){ _array.sort(_compareFunction); };