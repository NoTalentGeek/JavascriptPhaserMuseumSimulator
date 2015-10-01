/**State class to initiates some initial objects.*/
stateMain = {

    create                                  : function(){

        /*Array to contain all object in the scene.*/
        this.floorObjectArray               = new Array();
        this.roomObjectArray                = new Array();
        this.exhibitionObjectArray          = new Array();
        this.tagObjectArray                 = new Array();
        this.playerObjectArray              = new Array();

        /*How many players in the scene initially.*/
        this.playerCountNum                 = 1;

        /*Instead of using for loop I used a counter to update each array one
            by one each tick passed.
        With this method system will not be lagged with countless amount of museum
            objects in the loop.*/
        this.updateCountNum                 = 0;
        this.updateCountTotalNum            = 0;
        this.playerUpdateNum                = 0;

        /*Initial object name for floor.*/
        var floorNameObjectArray                    = [

            new ObjectName('First Floor'            , 'FLR_001'),
            new ObjectName('Second Floor'           , 'FLR_002'),
            new ObjectName('Third Floor'            , 'FLR_003'),
            new ObjectName('Fourth Floor'           , 'FLR_004')

        ];
        /*Initial object name for room.*/
        var roomNameObjectArray                     = [

            new ObjectName('Room Africa'            , 'ROM_AFK'),
            new ObjectName('Room America'           , 'ROM_AME'),
            new ObjectName('Room Asia'              , 'ROM_ASI'),
            new ObjectName('Room Europe'            , 'ROM_EUR')

        ];
        /*Initial object name for exhibition.*/
        var exhibitionNameObjectArray               = [

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
        /*Initial object name for tag.*/
        var tagNameObjectArray                      = [

            new ObjectName('Agreeable'              , 'TAG_AGR'),
            new ObjectName('Brave'                  , 'TAG_BRA'),
            new ObjectName('Calm'                   , 'TAG_CAL'),
            new ObjectName('Delightful'             , 'TAG_DEL'),
            new ObjectName('Eager'                  , 'TAG_EAG'),
            new ObjectName('Faithful'               , 'TAG_FAI'),
            new ObjectName('Gentle'                 , 'TAG_GEN'),
            new ObjectName('Happy'                  , 'TAG_HAP'),
            new ObjectName('Jolly'                  , 'TAG_JOL'),
            new ObjectName('Kind'                   , 'TAG_KIN'),
            new ObjectName('Lively'                 , 'TAG_LIV'),
            new ObjectName('Nice'                   , 'TAG_NIC'),
            new ObjectName('Obedient'               , 'TAG_OBE'),
            new ObjectName('Proud'                  , 'TAG_PRO'),
            new ObjectName('Relieved'               , 'TAG_REL'),
            new ObjectName('Silly'                  , 'TAG_SIL'),
            new ObjectName('Thankful'               , 'TAG_THA'),
            new ObjectName('Victorious'             , 'TAG_VIC'),
            new ObjectName('Witty'                  , 'TAG_WIT'),
            new ObjectName('Zealous'                , 'TAG_ZEA')

        ];

        /*Initiates everything and put everythin in to its corresponding array.*/
        for(var i = 0; i < floorNameObjectArray.length; i ++){

            var floorObject         = new ObjectMuseum('XXX_XXX', 'FLR', floorNameObjectArray[i]);
            this.floorObjectArray   .push(floorObject);

            //console.log(floorObject.objectNameAltString);

        }
        for(var i = 0; i < roomNameObjectArray.length; i ++){

            var roomObject          = new ObjectMuseum('FLR_001', 'ROM', roomNameObjectArray[i]);
            this.roomObjectArray    .push(roomObject);

            //console.log(roomObject.objectNameAltString);

        }
        for(var i = 0; i < exhibitionNameObjectArray.length; i ++){

            /*Adding the exhibition based on index i that will determine the room location for an exhibition.*/
            if      (i < 4 ){ var exhibitionObject  = new ObjectMuseum('ROM_AFK', 'EXH', exhibitionNameObjectArray[i], this.roomObjectArray); }
            else if (i < 8 ){ var exhibitionObject  = new ObjectMuseum('ROM_AME', 'EXH', exhibitionNameObjectArray[i], this.roomObjectArray); }
            else if (i < 12){ var exhibitionObject  = new ObjectMuseum('ROM_ASI', 'EXH', exhibitionNameObjectArray[i], this.roomObjectArray); }
            else if (i < 16){ var exhibitionObject  = new ObjectMuseum('ROM_EUR', 'EXH', exhibitionNameObjectArray[i], this.roomObjectArray); }
            this.exhibitionObjectArray              .push(exhibitionObject);

            //console.log(exhibitionObject.objectNameAltString);

        }
        for(var i = 0; i < tagNameObjectArray.length; i ++){

            var tagObject           = new ObjectMuseum('XXX_XXX', 'TAG', tagNameObjectArray[i]);
            this.tagObjectArray     .push(tagObject);

            //console.log(tagObject.objectNameAltString);

        }
        /*Put tags into exhibition randomly.*/
        for(var i = 0; i < this.exhibitionObjectArray.length; i ++){

            for(var j = 0; j < this.exhibitionObjectArray[i].tagStringArray.length; j ++){

                var indexNum                                = Math.floor((Math.random()*this.tagObjectArray.length) + 0);
                var tagNameString                           = this.tagObjectArray[indexNum].objectNameAltString;
                var loopNum                                 = 0;

                /*Make sure there is no tags with same name within the same exhibition.*/
                while(this.exhibitionObjectArray[i].tagStringArray.indexOf(tagNameString) > -1){

                    loopNum                                     ++;
                    indexNum                                    = Math.floor((Math.random()*this.tagObjectArray.length) + 0);
                    tagNameString                               = this.tagObjectArray[indexNum].objectNameAltString;
                    if(loopNum >= this.tagObjectArray.length)   { break; }


                }

                this.exhibitionObjectArray[i].tagStringArray[j] = tagNameString;

            }

        }

        //console.log(this.floorObjectArray);
        //console.log(this.roomObjectArray);
        //console.log(this.exhibitionObjectArray);

        /*Initiate players and generate random exhibition starting point.*/
        for(var i = 0; i < this.playerCountNum; i ++){

            var randomExhibitionIndexNum    = Math.floor((Math.random()*this.exhibitionObjectArray.length) + 0);
            var playerObject                = new ObjectPlayer(

                this.exhibitionObjectArray[randomExhibitionIndexNum].objectNameAltString,
                this.exhibitionObjectArray,
                this.roomObjectArray,
                this.floorObjectArray

            );
            this.playerObjectArray          .push(playerObject);

            //console.log(playerObject.exhibitionCurrentString);

        }

        //console.log(this.FindIndexNum(this.floorObjectArray   , 'FLR_001'));
        //console.log(this.FindObject(this.floorObjectArray     , 'FLR_001').objectNameFullString);

        game.stage.backgroundColor          = 0x4A148C;

        this.offsetXMulNum                  = (5/1024);
        this.offsetYMulNum                  = (5/576);
        this.offsetXNum                     = game.width*this.offsetXMulNum;
        this.offsetYNum                     = game.height*this.offsetYMulNum;
        this.totalRowNum                    = 3 + (Math.ceil(this.exhibitionObjectArray.length/this.playerObjectArray.length) + 1);

        this.floorObjectPanelArray          = new Array();
        this.roomObjectPanelArray           = new Array();
        this.exhibitionObjectPanelArray     = new Array();

        for(var i = 0; i < this.floorObjectArray.length; i ++){

            this.floorObjectArray[i].CreatePanelVoid(i, this.offsetXNum, this.offsetYNum, this.totalRowNum, this.floorObjectArray, this.roomObjectArray);

        }
        for(var i = 0; i < this.roomObjectArray.length; i ++){

            this.roomObjectArray[i].CreatePanelVoid(i, this.offsetXNum, this.offsetYNum, this.totalRowNum, this.floorObjectArray, this.roomObjectArray);

        }

    },

    update                                  : function(){

        /*Loop through the players/visitors within the museum and activate its AI function.*/
        this.playerObjectArray[this.playerUpdateNum].AIAutoBool();
        /*A //console.log() function to return how many tags have been captured during this time.
        Not necessarily to be active all the time due to for loop.*/
        /*
        for(var i = 0; i < this.playerObjectArray[this.playerUpdateNum].tagMixedArray.length; i ++){

            console.log(i + ' ' + this.playerObjectArray[this.playerUpdateNum].tagMixedArray[i][0] + ': ' + this.playerObjectArray[this.playerUpdateNum].tagMixedArray[i][1]);

        }
        */
        /*Simple loop control, if the value exceed the latest index from player array then reset the
            counter back to 0.*/
        this.playerUpdateNum        = (this.playerUpdateNum < this.playerCountNum - 1) ? (this.playerUpdateNum + 1) : 0;

        /*Dynamically add total number count for all museum objects within the scene (floors, rooms, exhibitions).
        PENDING: I am not sure whether you can just dynamucally add an object while the loop is running.
            If not then just reset the counter whenever an museum object goes into the array.*/
        this.updateCountTotalNum    = this.floorObjectArray.length + this.roomObjectArray.length + this.exhibitionObjectArray.length;

        if                          (this.updateCountNum < this.floorObjectArray.length){

            var indexNum            = this.updateCountNum;
            //console                 .log(this.floorObjectArray[indexNum].objectNameAltString + ': ' + this.floorObjectArray[indexNum].visitorCurrentNum);

        }
        else if                     (this.updateCountNum < (this.floorObjectArray.length + this.roomObjectArray.length)){

            var indexNum            = this.updateCountNum - this.floorObjectArray.length;
            //console               .log(this.roomObjectArray[indexNum].objectNameAltString + ': ' + this.roomObjectArray[indexNum].visitorCurrentNum);

        }
        else if                     (this.updateCountNum < (this.floorObjectArray.length + this.roomObjectArray.length + this.exhibitionObjectArray.length)){

            var indexNum            = this.updateCountNum - this.floorObjectArray.length - this.roomObjectArray.length;
            /*
            console               .log(

                this.exhibitionObjectArray[indexNum].objectNameAltString + 
                ': ' + 
                this.exhibitionObjectArray[indexNum].tagStringArray +
                ': ' + 
                this.exhibitionObjectArray[indexNum].visitorCurrentNum 

            );
            */

        }

        /*Loop counter controller, it resets back to 0 whenever the counter pass the highest index of object exhibition
            in the whole museum.*/
        this.updateCountNum     = (this.updateCountNum < this.updateCountTotalNum - 1) ? (this.updateCountNum + 1) : 0;

    },

    /*A function to find the exhibition in an array of object exhibition, based on exhibition's
    name alt.*/
    FindIndexNum                            : function(_exhibitionNameObjectArray, _exhibitionNameAltString){

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
    FindObject                              : function(_exhibitionNameObjectArray, _exhibitionNameAltString){

        if(

            (typeof _exhibitionNameObjectArray  === 'object') &&
            (typeof _exhibitionNameAltString    === 'string')

        ){ return _exhibitionNameObjectArray[this.FindIndexNum(_exhibitionNameObjectArray, _exhibitionNameAltString)]; }
        else{

            console.log((typeof _exhibitionNameObjectArray)     + ' is not an object.');
            console.log((typeof _exhibitionNameAltString)       + ' is not a string.');
            return undefined;

        }

    }

};