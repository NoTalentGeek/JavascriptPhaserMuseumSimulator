/*An object to store a name.
In this program a name consist of the real name and the alternative
    three words name.*/
ObjectName              = function(_name, _nameAlt){

    this.nameFull       = _name;
    this.nameAlt        = _nameAlt;

};
ObjectName.prototype    = ObjectName;