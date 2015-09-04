var statePreload = {

    preload:            function(){

        game.load.image      ('ImagePanel1' , 'panel1.png');
        game.load.image      ('ImagePanel2' , 'panel2.png');
        game.load.image      ('ImagePanel3' , 'panel3.png');
        game.load.spritesheet('SsButton1'   , 'button1.png', 100, 100);
        game.load.spritesheet('SsButton2'   , 'button2.png', 100, 100);

    },
    create:             function(){},
    update:             function(){ game.state.start ('StateMain'); }

};