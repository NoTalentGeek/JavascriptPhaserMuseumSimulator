/*Simple object to manage name in this application.
A name for any museum object can be displayed as a full name format or alt name format.*/
ObjectName                          = function(_nameFullString, _nameAltString){

    if(

        typeof _nameFullString  === 'string' &&
        typeof _nameAltString   === 'string'

    ){

        this.nameFullString     = _nameFullString;
        this.nameAltString      = _nameAltString;

    }
    else{

        console.log                         ((typeof _nameFullString)   + ' supposed to be a string.');
        console.log                         ((typeof _nameAltString)    + ' supposed to be a string.');

    }

    

};
ObjectName.prototype.constructor    = ObjectName;