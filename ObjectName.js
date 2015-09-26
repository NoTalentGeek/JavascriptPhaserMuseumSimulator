/*An object to store a name.
In this program a name consist of the full name and the alternative
    three words name.*/
ObjectName              = function(_nameFull, _nameAlt){

    this.nameFull       = _nameFull;
    this.nameAlt        = _nameAlt;

};
ObjectName.prototype    = ObjectName;