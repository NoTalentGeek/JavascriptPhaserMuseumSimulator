/*This is a system object that is editable
    so that when user want to edit the value of this program,
    he/she can just edit value from this object.*/
SystemEdit                              = function(){

    System.call                     (this, 'SystemEdit');

    /*Here I provide the user with three modified value.
    The room name, exhibition name, and all available tags.*/
    this.nameRoomArray                  = new Array();
    this.nameExhibitionArray            = new Array();
    this.nameTagArray                   = new Array();

    /*List of room name, the first one is the default value if the program
        cannot find the room name.*/
    var nameRoom                    = new ObjectName('Room Afrika'            , 'ROM_AFK');
        this.nameRoomArray.push     (nameRoom);
    var nameRoom                    = new ObjectName('Room America'           , 'ROM_AMC');
        this.nameRoomArray.push     (nameRoom);
    var nameRoom                    = new ObjectName('Room Asia'              , 'ROM_ASI');
        this.nameRoomArray.push     (nameRoom);
    var nameRoom                    = new ObjectName('Room Europe'            , 'ROM_EUR');
        this.nameRoomArray.push     (nameRoom);
    var nameRoom                    = new ObjectName('Room ZZZ'               , 'ROM_ZZZ');
        this.nameRoomArray.push     (nameRoom);

    /*List of exhibition name.
    The first index in nameExhibitionArray variable is the default name for exhibition.*/
    var nameExhibition                      = new ObjectName('Exhibition Algeria'     , 'EXH_ALG');
        this.nameExhibitionArray.push       (nameExhibition);
    var nameExhibition                      = new ObjectName('Exhibition Angola'      , 'EXH_ANG');
        this.nameExhibitionArray.push       (nameExhibition);
    var nameExhibition                      = new ObjectName('Exhibition Benin'       , 'EXH_BEN');
        this.nameExhibitionArray.push       (nameExhibition);
    var nameExhibition                      = new ObjectName('Exhibition Botswana'    , 'EXH_BOT');
        this.nameExhibitionArray.push       (nameExhibition);
    var nameExhibition                      = new ObjectName('Exhibition Argentina'   , 'EXH_ARG');
        this.nameExhibitionArray.push       (nameExhibition);
    var nameExhibition                      = new ObjectName('Exhibition Bolivia'     , 'EXH_BOL');
        this.nameExhibitionArray.push       (nameExhibition);
    var nameExhibition                      = new ObjectName('Exhibition Brasil'      , 'EXH_BRA');
        this.nameExhibitionArray.push       (nameExhibition);
    var nameExhibition                      = new ObjectName('Exhibition Canada'      , 'EXH_CAN');
        this.nameExhibitionArray.push       (nameExhibition);
    var nameExhibition                      = new ObjectName('Exhibition Cambodia'    , 'EXH_CAM');
        this.nameExhibitionArray.push       (nameExhibition);
    var nameExhibition                      = new ObjectName('Exhibition China'       , 'EXH_CHI');
        this.nameExhibitionArray.push       (nameExhibition);
    var nameExhibition                      = new ObjectName('Exhibition Hong Kong'   , 'EXH_HON');
        this.nameExhibitionArray.push       (nameExhibition);
    var nameExhibition                      = new ObjectName('Exhibition India'       , 'EXH_IND');
        this.nameExhibitionArray.push       (nameExhibition);
    var nameExhibition                      = new ObjectName('Exhibition Austria'     , 'EXH_AUS');
        this.nameExhibitionArray.push       (nameExhibition);
    var nameExhibition                      = new ObjectName('Exhibition Belgia'      , 'EXH_BEL');
        this.nameExhibitionArray.push       (nameExhibition);
    var nameExhibition                      = new ObjectName('Exhibition France'      , 'EXH_FRA');
        this.nameExhibitionArray.push       (nameExhibition);
    var nameExhibition                      = new ObjectName('Exhibition Germany'     , 'EXH_GER');
        this.nameExhibitionArray.push       (nameExhibition);
    var nameExhibition                      = new ObjectName('Exhibition ZZZ'         , 'EXH_ZZZ');
        this.nameExhibitionArray.push       (nameExhibition);

    //List of available tags.
    var nameTag                     = new ObjectName('Agreeable'              , 'AGR'    );
        this.nameTagArray.push      (nameTag);
    var nameTag                     = new ObjectName('Brave'                  , 'BRA'    );
        this.nameTagArray.push      (nameTag);
    var nameTag                     = new ObjectName('Calm'                   , 'CAL'    );
        this.nameTagArray.push      (nameTag);
    var nameTag                     = new ObjectName('Delightful'             , 'DEL'    );
        this.nameTagArray.push      (nameTag);
    var nameTag                     = new ObjectName('Eager'                  , 'EAG'    );
        this.nameTagArray.push      (nameTag);
    var nameTag                     = new ObjectName('Faithful'               , 'FAI'    );
        this.nameTagArray.push      (nameTag);
    var nameTag                     = new ObjectName('Gentle'                 , 'GEN'    );
        this.nameTagArray.push      (nameTag);
    var nameTag                     = new ObjectName('Happy'                  , 'HAP'    );
        this.nameTagArray.push      (nameTag);
    var nameTag                     = new ObjectName('Jolly'                  , 'JOL'    );
        this.nameTagArray.push      (nameTag);
    var nameTag                     = new ObjectName('Kind'                   , 'KIN'    );
        this.nameTagArray.push      (nameTag);
    var nameTag                     = new ObjectName('Lively'                 , 'LIV'    );
        this.nameTagArray.push      (nameTag);
    var nameTag                     = new ObjectName('Nice'                   , 'NIC'    );
        this.nameTagArray.push      (nameTag);
    var nameTag                     = new ObjectName('Obedient'               , 'OBE'    );
        this.nameTagArray.push      (nameTag);
    var nameTag                     = new ObjectName('Proud'                  , 'PRO'    );
        this.nameTagArray.push      (nameTag);
    var nameTag                     = new ObjectName('Relieved'               , 'REL'    );
        this.nameTagArray.push      (nameTag);
    var nameTag                     = new ObjectName('Silly'                  , 'SIL'    );
        this.nameTagArray.push      (nameTag);
    var nameTag                     = new ObjectName('Thankful'               , 'THA'    );
        this.nameTagArray.push      (nameTag);
    var nameTag                     = new ObjectName('Victorious'             , 'VIC'    );
        this.nameTagArray.push      (nameTag);
    var nameTag                     = new ObjectName('Witty'                  , 'WIT'    );
        this.nameTagArray.push      (nameTag);
    var nameTag                     = new ObjectName('Zealous'                , 'ZEA'    );
        this.nameTagArray.push      (nameTag);
    var nameTag                     = new ObjectName('ZZZ'                    , 'ZZZ'    );
        this.nameTagArray.push      (nameTag);

};
SystemEdit.prototype                    = Object.create(System.prototype);
SystemEdit.prototype.constructor        = SystemEdit;
SystemEdit.prototype.EditRoomCompare    = function(_objectName1, _objectName2){

    if(_objectName1.nameAlt < _objectName2.nameAlt){ return -1; }
    if(_objectName1.nameAlt > _objectName2.nameAlt){ return  1; }
    return 0;

};