//The front - end class.
stateMain = {

    create                          : function(){

        this.arrayFloor             = new Array();
        this.arrayRoom              = new Array();
        this.arrayExhibition        = new Array();
        this.arrayPlayer            = new Array();

        var nameFloor               = [

            new ObjectName('First Floor'    , 'FLR_001'),
            new ObjectName('Second Floor'   , 'FLR_002'),
            new ObjectName('Third Floor'    , 'FLR_003'),
            new ObjectName('Fourth Floor'   , 'FLR_004')

        ];
        var nameRoom                = [

            new ObjectName('Room Africa'    , 'ROM_AFK'),
            new ObjectName('Room America'   , 'ROM_AME'),
            new ObjectName('Room Asia'      , 'ROM_ASI'),
            new ObjectName('Room Europe'    , 'ROM_EUR')

        ];
        var nameExhibition          = [

            new ObjectName('Egyptian Exhibition'    , 'EXH_EGY'),
            new ObjectName('Ethiopian Exhibition'   , 'EXH_ETH'),
            new ObjectName('Morocco Exhibition'     , 'EXH_MOR'),
            new ObjectName('Nigerian Exhibition'    , 'EXH_NIG'),
            new ObjectName('Argentinian Exhibition' , 'EXH_ARG'),
            new ObjectName('Brazillian Exhibition'  , 'EXH_BRA'),
            new ObjectName('Canadian Exhibition'    , 'EXH_CAN'),
            new ObjectName('USA Exhibition'         , 'EXH_USA'),
            new ObjectName('Chinese Exhibition'     , 'EXH_CHN'),
            new ObjectName('Indian Exhibition'      , 'EXH_IND'),
            new ObjectName('Japanese Exhibition'    , 'EXH_JAP'),
            new ObjectName('Korean Exhibition'      , 'EXH_KOR'),
            new ObjectName('Belgian Exhibition'     , 'EXH_BEL'),
            new ObjectName('Dutch Exhibition'       , 'EXH_DUT'),
            new ObjectName('German Exhibition'      , 'EXH_GER'),
            new ObjectName('Russian Exhibition'     , 'EXH_RUS'),

        ];

        for(var i = 0; i < nameFloor.length; i ++){

            var objectFloor = new ObjectMuseum(undefined, 'FLR', nameFloor[i]);
            this.arrayFloor.push(objectFloor);

            console.log(objectFloor.objectName.nameAlt);

        }
        for(var i = 0; i < nameRoom.length; i ++){

            var objectRoom = new ObjectMuseum('FLR_001', 'ROM', nameRoom[i]);
            this.arrayRoom.push(objectRoom);

            console.log(objectRoom.objectName.nameAlt);

        }
        for(var i = 0; i < nameExhibition.length; i ++){

            if      (i < 4 ){ var objectExhibition = new ObjectMuseum('ROM_AFK', 'EXH', nameExhibition[i]); }
            else if (i < 8 ){ var objectExhibition = new ObjectMuseum('ROM_AME', 'EXH', nameExhibition[i]); }
            else if (i < 12){ var objectExhibition = new ObjectMuseum('ROM_ASI', 'EXH', nameExhibition[i]); }
            else if (i < 16){ var objectExhibition = new ObjectMuseum('ROM_EUR', 'EXH', nameExhibition[i]); }
            this.arrayExhibition.push(objectExhibition);

            console.log(objectExhibition.objectName.nameAlt);

        }

        console.log(this.arrayFloor);
        console.log(this.arrayRoom);
        console.log(this.arrayExhibition);

        this.playerCount = 3000;
        for(var i = 0; i < this.playerCount; i ++){

            var randomNumber    = Math.floor((Math.random()*this.arrayExhibition.length) + 0);
            var objectPlayer    = new ObjectPlayer(this.arrayExhibition[randomNumber].objectName.nameAlt);
            this.arrayPlayer    .push(objectPlayer);

            console.log(objectPlayer.exhibitionCurrent);

        }

        console.log(this.FindIndex(this.arrayFloor, 'FLR_001'));
        console.log(this.FindObjectInArray(this.arrayFloor, 'FLR_001').objectNameFull);

    },

    update                          : function(){

        for(var i = 0; i < this.arrayPlayer.length; i ++){

            this.arrayPlayer[i].AIAutoBool(this.arrayExhibition);
            //console.log(i + ' ' + this.arrayPlayer[i].exhibitionVisitedStringArray.length);
            //console.log(this.arrayPlayer[i].exhibitionVisitedStringArray);

        }

        //console.log('TEST');

    },

    FindIndex                       : function(_arrayTarget, _variableValue){

        for(var i = 0; i < _arrayTarget.length; i ++){
            if(_arrayTarget[i]['objectNameAlt'] == _variableValue){ return i; }
        }
        return undefined;

    },

    FindObjectInArray               : function(_arrayTarget, _variableValue){ return _arrayTarget[this.FindIndex(_arrayTarget, _variableValue)]; }

};