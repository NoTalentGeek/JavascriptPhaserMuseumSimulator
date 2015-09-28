/*An object to handle all the museum related object.
This object can be used as floor, room, and the exhibition itself.
PENDING: Add verification for every arguments.*/ 
ObjectMuseum                        = function(_objectParentNameAlt, _objectType, _objectName){

    this.objectParentNameAlt        = _objectParentNameAlt;     //The object name alt for the parent object (string).
    this.objectType                 = _objectType;              //The type of this object (fill in 'FLR', 'ROM', or 'EXH').
    this.objectName                 = _objectName;
    this.objectNameFullString       = this.objectName.nameFullString;
    this.objectNameAltString        = this.objectName.nameAltString;
    this.visitorCurrentm            = 0;
    this.visitorTotal               = 0;
    this.tagsArray                  = new Array();

}
ObjectMuseum.prototype.construtor   = ObjectMuseum;