var statePreload = {

    preload:            function(){

        for(var i = 1; i <= 12; i ++){
            game.load.image      ('ImagePanel' + i , 'panel' + i + '.png');
            game.load.image      ('ImagePanel' + i , 'panel' + i + '.png');
            game.load.image      ('ImagePanel' + i , 'panel' + i + '.png');
        }
        game.load.spritesheet    ('SsButton1'       , 'button1.png', 100, 100);
        game.load.spritesheet    ('SsButton2'       , 'button2.png', 100, 100);

    },
    create:             function(){},
    update:             function(){ game.state.start ('StateMain'); }

};