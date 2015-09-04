var statePreload = {

    preload:            function(){

        game.load.image      ('ImageFrame1' , 'frame1.png');
        game.load.image      ('ImageFrame2' , 'frame2.png');
        game.load.image      ('ImageFrame2' , 'frame3.png');
        game.load.spritesheet('SsButton1'   , 'button1.png', 100, 100);
        game.load.spritesheet('SsButton2'   , 'button2.png', 100, 100);

    },
    create:             function(){},
    update:             function(){ game.state.start ('StateMain'); }

};