/*A state to preload all the assests before the application starts.
In more larger game every instances should have one preload state before the actual
    playable state plays.*/
var statePreload = {

    preload:            function(){

        for(var i = 1; i <= 12; i ++){ game.load.image      ('ImagePanel' 		+ i           	, 'assets/panel' 	+ i + '.png'	); }
        for(var i = 1; i <=  5; i ++){ game.load.image      ('ImagePanel' 		+ i + 'New'   	, 'assets/panel' 	+ i + 'new.png'	); }
        for(var i = 1; i <=  5; i ++){ game.load.image      ('ImagePanelNew' 	+ i   			, 'assets/panelnew' + i + '.png'	); }
        game.load.spritesheet    ('SsButton1'       , 'assets/button1.png', 100, 100);
        game.load.spritesheet    ('SsButton2'       , 'assets/button2.png', 100, 100);

    },
    create:             function(){},
    update:             function(){ game.state.start ('StateMain'); }

};