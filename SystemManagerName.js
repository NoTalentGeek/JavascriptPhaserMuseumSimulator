SystemManagerName                           = function(){

    this.nameRoomArray                      = ['Afrikan History Room'   , 'American History Room'   , 'Asian History Room'  , 'European History Room'   ];

    this.nameExhibitionAfrikanArray         = ['(001) EXH_ALG'  , '(002) EXH_ANG'    , '(003) EXH_BEN' , '(004) EXH_BOT' ];
    this.nameExhibitionAmericanArray        = ['(005) EXH_ARG'  , '(006) EXH_BOL'    , '(007) EXH_BRA' , '(008) EXH_CAN' ];
    this.nameExhibitionAsianArray           = ['(009) EXH_CAM'  , '(010) EXH_CHI'    , '(011) EXH_HON' , '(012) EXH_IND' ];
    this.nameExhibitionEuropeanArray        = ['(013) EXH_AUS'  , '(014) EXH_BEL'    , '(015) EXH_FRE' , '(016) EXH_GER' ];

    this.tagArray                           = [

        'Agreeable',
        'Brave',
        'Calm',
        'Delightful',
        'Eager',
        'Faithful',
        'Gentle',
        'Happy',
        'Jolly',
        'Kind',
        'Lively',
        'Nice',
        'Obedient',
        'Proud',
        'Relieved',
        'Silly',
        'Thankful',
        'Victorious',
        'Witty',
        'Zealous'

    ];
    
};
SystemManagerName.prototype.constructor     = SystemManagerName;
SystemManagerName.prototype.AddName         = function(_index, _nameArray){

    return _nameArray[_index];

    var index = _nameArray.indexOf(_index);
    if( index > -1){
        _nameArray.splice(index, 1);
    }

};
SystemManagerName.prototype.AddRandomTags   = function(){

    var returnedTags = new Array(3);
    var randomNumberGenerated = new Array();
    for(var i = 0; i < 3; i ++){
        var randomNumber = Math.floor((Math.random() * 20) + 0);
        for (var j = 0; j < randomNumberGenerated.length; j ++){

            while(randomNumberGenerated[j] == randomNumber){
                randomNumber = Math.floor((Math.random() * 20) + 0);
            }

        }
        randomNumberGenerated.push(randomNumber);
        returnedTags[i] = this.tagArray[randomNumber];
    }
    return returnedTags;

};