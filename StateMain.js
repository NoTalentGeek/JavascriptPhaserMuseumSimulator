stateMain = {

    create                      : function(){

        this.arrayFloor         = new Array();
        this.arrayRoom          = new Array();
        this.arrayExhibition    = new Array();

        var nameFloor           = [

            new ObjectName('First Floor'    , 'FLR_001'),
            new ObjectName('Second Floor'   , 'FLR_002'),
            new ObjectName('Third Floor'    , 'FLR_003'),
            new ObjectName('Fourth Floor'   , 'FLR_004')

        ];
        var nameRoom            = [

            new ObjectName('Room Africa'    , 'ROM_AFK'),
            new ObjectName('Room America'   , 'ROM_AME'),
            new ObjectName('Room Asia'      , 'ROM_ASI'),
            new ObjectName('Room Europe'    , 'ROM_EUR')

        ];
        var nameExhibition      = [

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

            if      (i < 4 ){ var objectExhibition = new ObjectMuseum('ROM_AFK', 'ROM', nameExhibition[i]); }
            else if (i < 8 ){ var objectExhibition = new ObjectMuseum('ROM_AME', 'ROM', nameExhibition[i]); }
            else if (i < 12){ var objectExhibition = new ObjectMuseum('ROM_ASI', 'ROM', nameExhibition[i]); }
            else if (i < 16){ var objectExhibition = new ObjectMuseum('ROM_EUR', 'ROM', nameExhibition[i]); }
            this.arrayExhibition.push(objectExhibition);

            console.log(objectExhibition.objectName.nameAlt);

        }

        console.log(this.arrayFloor);
        console.log(this.arrayRoom);
        console.log(this.arrayExhibition);

    },
    update                      : function(){},
    FindIndex                   : function(_targetArray, _variableName, _value){

        //Verification.
        if(

              typeof _targetArray   !== 'object' &&
              typeof _variableName  !== 'string' &&
            ((typeof _value !== 'number') || (typeof _value !== 'string'))

        ){ return undefined; }

        /*What basically done here is to loop to all objects/elements within an array and then
            check one by one the variable name to compare with the desired value.
        This function return the desired index.
        If the variable or the value is not found then return undefined*/
        for(var i = 0; i < _targetArray.length; i ++){ if(_targetArray[i][_variableName] == _value){ return i; } }
        return undefined;

    }

};