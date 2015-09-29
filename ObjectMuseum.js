/*An object to handle all the museum related object.
This object can be used as floor, room, and the exhibition itself.
PENDING: Add verification for every arguments.*/ 
ObjectMuseum                        = function(_objectParentAltNameString, _objectTypeString, _objectNameString){

    if(

        typeof _objectParentAltNameString   === 'string' &&
        typeof _objectTypeString            === 'string' &&
        typeof _objectNameString            === 'object'

    ){

        this.objectParentNameAltString      = _objectParentAltNameString;           /*The object name alt for the parent object (string).*/
        this.objectTypeString               = _objectTypeString;                    /*The type of this object (fill in 'FLR', 'ROM', 'EXH', or 'TAG').*/
        this.objectNameString               = _objectNameString;
        this.objectNameFullString           = this.objectNameString.nameFullString;
        this.objectNameAltString            = this.objectNameString.nameAltString;
        this.visitorCurrentNum              = 0;
        this.visitorTotalNum                = 0;
        this.tagStringArray                 = new Array(3);

    }
    else{

        console.log                         ((typeof _objectParentAltNameString)    + ' supposed to be a string.');
        console.log                         ((typeof _objectTypeString)             + ' supposed to be a string.');
        console.log                         ((typeof _objectNameString)             + ' supposed to be a object.');

    }
    
}
ObjectMuseum.prototype.construtor   = ObjectMuseum;