/*An object to store a name.
In this program a name consist of the real name and the alternative
    three words name.*/
ObjectName              = function(_nameFull, _nameAlt){

	this.nameObject 	= 'ObjectName'
    this.nameFull       = _nameFull;
    this.nameAlt        = _nameAlt;

};
ObjectName.prototype    = ObjectName;