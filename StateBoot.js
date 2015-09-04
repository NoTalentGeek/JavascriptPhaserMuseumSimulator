var stateBoot = {

	init: function(){

        this.input.maxPointers              = 1;
        this.stage.disableVisibilityChange  = true;
        this.scale.pageAlignHorizontally    = true;

    },

    create: function(){

        game.smoothed 			= false;
        game.state.start 		('StatePreload');

    }

};