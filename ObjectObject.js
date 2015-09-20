//Parent object for the most object in this application.
ObjectObject = function(_parentObject, _systemEdit, _nameObject, _nameObjectType){

    if(

        _parentObject   === 'object'    &&
        _systemEdit     === 'object'    &&
        _nameObject     === 'object'    &&
        _nameObjectType === 'string'

    ){

        /*This object refers to the parent of this object
            and the name of the object.*/
        this.parentObject       = _parentObject;
        this.systemEdit         = _systemEdit;
        this.nameObject         = _nameObject;
        this.nameObjectFull     = this.nameObject.nameFull;
        this.nameObjectAlt      = this.nameObject.nameAlt;
        this.nameObjectType     = _nameObjectType;

    }
    else{

        console.log('Wrong Inputs In ObjectObject Arguments');
        console.log((typeof _parentObject)      + 'Supposed To Be An Object' );
        console.log((typeof _systemEdit)        + 'Supposed To Be An Object' );
        console.log((typeof _nameObject)        + 'Supposed To Be An Object' );
        console.log((typeof _nameObjectType)    + 'Supposed To Be An String' );

    }

    /*Variable to let the user know the statistic between this object.
    For example how many visitor are here currently and how many total visitor
        per certain amount of time (like for example per one week or so).*/
    this.visitorCurrent     = 0;
    this.visitorTotal       = 0;

};
ObjectObject.prototype.constructor = ObjectObject;