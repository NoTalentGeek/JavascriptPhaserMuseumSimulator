/**State class to initiates some initial objects.*/
stateMain = {

    create                                  : function(){

        /*Array to contain all object in the scene.*/
        this.floorObjectArray               = new Array();
        this.roomObjectArray                = new Array();
        this.exhibitionObjectArray          = new Array();
        this.playerObjectArray              = new Array();

        /*Initial object name for floor.*/
        var floorNameObjectArray            = [

            new ObjectName('First Floor'    , 'FLR_001'),
            new ObjectName('Second Floor'   , 'FLR_002'),
            new ObjectName('Third Floor'    , 'FLR_003'),
            new ObjectName('Fourth Floor'   , 'FLR_004')

        ];
        /*Initial object name for room.*/
        var roomNameObjectArray             = [

            new ObjectName('Room Africa'    , 'ROM_AFK'),
            new ObjectName('Room America'   , 'ROM_AME'),
            new ObjectName('Room Asia'      , 'ROM_ASI'),
            new ObjectName('Room Europe'    , 'ROM_EUR')

        ];
        /*Initial object name for exhibition.*/
        var exhibitionNameObjectArray       = [

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

        /*Initiates everything and put everythin in to its corresponding array.*/
        for(var i = 0; i < floorNameObjectArray.length; i ++){

            var floorObject = new ObjectMuseum('XXX_XXX', 'FLR', floorNameObjectArray[i]);
            this.floorObjectArray.push(floorObject);

            console.log(floorObject.objectNameAltString);

        }
        for(var i = 0; i < roomNameObjectArray.length; i ++){

            var roomObject = new ObjectMuseum('FLR_001', 'ROM', roomNameObjectArray[i]);
            this.roomObjectArray.push(roomObject);

            console.log(roomObject.objectNameAltString);

        }
        for(var i = 0; i < exhibitionNameObjectArray.length; i ++){

            /*Adding the exhibition based on index i that will determine the room location for an exhibition.*/
            if      (i < 4 ){ var exhibitionObject = new ObjectMuseum('ROM_AFK', 'EXH', exhibitionNameObjectArray[i]); }
            else if (i < 8 ){ var exhibitionObject = new ObjectMuseum('ROM_AME', 'EXH', exhibitionNameObjectArray[i]); }
            else if (i < 12){ var exhibitionObject = new ObjectMuseum('ROM_ASI', 'EXH', exhibitionNameObjectArray[i]); }
            else if (i < 16){ var exhibitionObject = new ObjectMuseum('ROM_EUR', 'EXH', exhibitionNameObjectArray[i]); }
            this.exhibitionObjectArray.push(exhibitionObject);

            console.log(exhibitionObject.objectNameAltString);

        }

        console.log(this.floorObjectArray);
        console.log(this.roomObjectArray);
        console.log(this.exhibitionObjectArray);

        this.playerCountNum = 100;
        /*Initiate players and generate random exhibition starting point.*/
        for(var i = 0; i < this.playerCountNum; i ++){

            var randomExhibitionIndexNum    = Math.floor((Math.random()*this.exhibitionObjectArray.length) + 0);
            var playerObject                = new ObjectPlayer(this.exhibitionObjectArray[randomExhibitionIndexNum].objectNameAltString);
            this.playerObjectArray          .push(playerObject);

            console.log(playerObject.exhibitionCurrentString);

        }

        console.log(this.FindExhibitionIndexNum(this.floorObjectArray, 'FLR_001'));
        console.log(this.FindExhibitionObject(this.floorObjectArray, 'FLR_001').objectNameFullString);

    },

    update                                  : function(){

        /*Update one by one the player objects.
        PENDING: Add mechanics so that the players is not looped
            within one ticks.
        I was thinking to create something like a loop based but per tick.
        For example player with index 0 - 99 will be updated in this tick,
            then the next 100 - 199 will be updated in the next tick.*/
        for(var i = 0; i < this.playerObjectArray.length; i ++){

            this.playerObjectArray[i].AIAutoBool(this.exhibitionObjectArray);
            console.log(this.playerObjectArray[i].exhibitionVisitedStringArray);

        }

    },

    /*A function to find the exhibition in an array of object exhibition, based on exhibition's
    name alt.*/
    FindExhibitionIndexNum                  : function(_exhibitionNameObjectArray, _exhibitionNameAltString){

        if(

            (typeof _exhibitionNameObjectArray  === 'object') &&
            (typeof _exhibitionNameAltString    === 'string')

        ){

            /*Loop through the array.*/
            for(var i = 0; i < _exhibitionNameObjectArray.length; i ++){

                /*Check the variable name of nameObjectAlt one by one per array element.
                i is the index number when the variable name equals with the variable value.*/
                if(_exhibitionNameObjectArray[i]['objectNameAltString'] == _exhibitionNameAltString){ return i; }

            }
            return undefined;

        }
        else{

            console.log((typeof _exhibitionNameObjectArray)     + ' is not an object.');
            console.log((typeof _exhibitionNameAltString)       + ' is not a string.');
            return undefined;

        }

    },

    /*Using the function to find object index, I created another function to return the object instead of the index.*/
    FindExhibitionObject                    : function(_exhibitionNameObjectArray, _exhibitionNameAltString){

        if(

            (typeof _exhibitionNameObjectArray  === 'object') &&
            (typeof _exhibitionNameAltString    === 'string')

        ){ return _exhibitionNameObjectArray[this.FindExhibitionIndexNum(_exhibitionNameObjectArray, _exhibitionNameAltString)]; }
        else{

            console.log((typeof _exhibitionNameObjectArray)     + ' is not an object.');
            console.log((typeof _exhibitionNameAltString)       + ' is not a string.');
            return undefined;

        }

    }

};