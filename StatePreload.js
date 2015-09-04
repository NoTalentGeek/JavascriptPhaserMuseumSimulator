var statePreload = {

    preload:            function(){

        game.load.spritesheet('SsFrame1', 'frame1.png', 200, 50 );
        game.load.spritesheet('SsFrame2', 'frame2.png', 600, 100);

    },
    create:             function(){},
    update:             function(){ game.state.start ('StateMain'); }

};