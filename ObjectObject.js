//Parent object for the most object in this application.
ObjectObject = function(_parentObject, _nameObject){

    /*This object refers to the parent of this object
        and the name of the object.*/
    this.parentObject       = _parentObject; 
    this.nameObject         = _nameObject;

    /*Variable to let the user know the statistic between this object.
    For example how many visitor are here currently and how many total visitor
        per certain amount of time (like for example per one week or so).*/
    this.visitorCurrent     = 0;
    this.visitorTotal       = 0;

};
ObjectObject.prototype.constructor = ObjectObject;