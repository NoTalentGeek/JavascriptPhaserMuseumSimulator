//Parent object for the most object in this application.
ObjectObject                        = function(_parentObject, _nameObject, _nameObjectType){

    if(

        typeof _parentObject    === 'object'    &&
        typeof _nameObject      === 'object'    &&
        typeof _nameObjectType  === 'string'

    ){

        /*This object refers to the parent of this object
            and the name of the object.*/
        this.parentObject       = _parentObject;
        this.nameObject         = _nameObject;
        this.nameObjectFull     = this.nameObject.nameFull;
        this.nameObjectAlt      = this.nameObject.nameAlt;
        this.nameObjectType     = _nameObjectType;

    }
    else{

        console.log('Wrong Inputs In ObjectObject Arguments');
        console.log((typeof _parentObject)      + ' Supposed To Be An Object.' );
        console.log((typeof _nameObject)        + ' Supposed To Be An Object.' );
        console.log((typeof _nameObjectType)    + ' Supposed To Be A String.'  );

    }

    /*This is the array object that will hold the corresponding object's children.
    For example ObjectFloor will hold an array of ObjectRoom.
    And then ObjectRoom will hold an array of ObjectExhibition.
    And so on....*/
    this.arrayObject        = new Array();

    /*Variable to let the user know the statistic between this object.
    For example how many visitor are here currently and how many total visitor
        per certain amount of time (like for example per one week or so).*/
    this.visitorCurrent     = 0;
    this.visitorTotal       = 0;

};
ObjectObject.prototype.constructor  = ObjectObject;
ObjectObject.prototype.Update       = function(){

    if(this.isIn){

        var index = this.stackOut.indexOf(this);
        this.stackOut.splice(index, 1);

        this.stackIn.push(this);

    }
    else if(!this.isIn){

        var index = this.stackIn.indexOf(this);
        this.stackIn.splice(index, 1);

        this.stackOut.push(this);

    }

};