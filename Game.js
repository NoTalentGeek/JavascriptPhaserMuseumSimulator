/*The initial variable for Phaser game.
This .js file can set all the available state in the game.*/
var game = new Phaser.Game(1031, 586, Phaser.AUTO);
    game.state.add  ('StateBoot',       stateBoot);
    game.state.add  ('StatePreload',    statePreload);
    game.state.add  ('StateMain',       stateMain);

    game.smoothed   = false;

    game.state.start('StateBoot');