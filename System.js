/*System.js is a parent class that controls most object in this application.
For example both SystemRoom object and SystemExhibition object inherits from this class.
This class provides its children with a way to add, find index based on local variable, remove an
    element, and sort element alphabetically.*/
System                              = function(_parentObject, _nameSystemType){

    if(typeof _parentObject === 'object' && typeof _nameSystemType === 'string'){

        this.nameSystem   = _nameSystemType;
        this.parentObject = _parentObject;

    }
    else{

        console.log('Wrong Inputs In System Arguments');
        console.log((typeof _parentObject)      + ' Supposed To Be An Object' );
        console.log((typeof _nameSystemType)    + ' Supposed To Be A String'  );

    }

};

System.prototype.constructor        = System;

/*This function is to add object to coresponding array within the children object.
There is a simple verification method to make sure that objects pushed in to array are all
    the same type.
However, due to any object will return object in Javascript, I made a local variable named nameObject
    for comparison purpose.*/
System.prototype.SystemAdd          = function(_object, _objectName, _targetArray, _compareFunction){

    //Arguments verification verification.
    if(

        typeof _object          !== 'object'   &&
        typeof _objectName      !== 'string'   &&
        typeof _targetArray     !== 'object'   &&
        typeof _compareFunction !== 'function'

    ){ return 'undefined'; }

    //Simple verification to make sure all objects in the target array are all the same.
    if(_object.nameObject           == _objectName){

        _targetArray                .push(_object);

        //After the object is added to the target array sort all element in the array alphabetically.
        this.SystemSort             (_targetArray, _compareFunction);
        //Return the newly added object.
        return                      _object;

    }
    else{ return 'undefined'; }

};

//This function is to find an object index within an array according to a local variable.
System.prototype.SystemFindIndex    = function(_targetArray, _variableName, _value){

    //Verification.
    if(

          typeof _targetArray   !== 'object' &&
          typeof _variableName  !== 'string' &&
        ((typeof _value !== 'number') || (typeof _value !== 'string'))

    ){ return 'undefined'; }

    /*What basically done here is to loop to all objects/elements within an array and then
        check one by one the variable name to compare with the desired value.
    This function return the desired index.
    If the variable or the value is not found then return 'undefined'*/
    for(var i = 0; i < _targetArray.length; i ++){ if(_targetArray[i][_variableName] == _value){ return i; } }
    return 'undefined';

};

//A function to remove element based on index found with SystemFindIndex() function.
System.prototype.SystemRemove       = function(_targetArray, _variableName, _value){

    //Verification.
    if(

          typeof _targetArray   !== 'object' &&
          typeof _variableName  !== 'string' &&
        ((typeof _value !== 'number') || (typeof _value !== 'string'))

    ){ return 'undefined'; }

    var index           = this.SystemFindIndex(_targetArray, _variableName, _value);
    if(index > -1)      { _targetArray.splice(index, 1); }

    //This function return the new array after an element is removed.
    return              _targetArray;

};

/*A sorting function.
The second argument is a comparison function of which has arguments of params of variables
    that wants to be compared.*/
System.prototype.SystemSort         = function(_targetArray, _compareFunction){

    //Argument verification.
    if(

        typeof _targetArray     !== 'object' &&
        typeof _compareFunction !== 'function'

    ){ return 'undefined'; }

    _targetArray.sort(_compareFunction);
    return _targetArray;

};