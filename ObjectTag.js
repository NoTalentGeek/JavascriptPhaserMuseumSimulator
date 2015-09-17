/*A tag class that will hold the basic tag information.
    like for example, the name of the tag, which exhibition
    has the corresponding tags, and how many tags is exist
    within the exhibition.*/
ObjectTag                       = function(
        _parent,
        _index,
        _name,
        _nameExhibition, 
        _nameRoom
    ){

    this.parent                 = _parent;              //Parent object of this tag object (it is supposed to be system tag object).
    this.index                  = _index;               //The index of tags in its exhibition.
    this.name                   = _name;                //Add the name of the tag.
    this.nameExhibition         = _nameExhibition;      //The name of exhibition of which this tag exist.
    this.nameRoom               = _nameRoom;            //The name of room of which this tag exist.

};
ObjectTag.prototype.constructor = ObjectTag;