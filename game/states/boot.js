'use strict';

function Boot() {
}

Boot.prototype = {
    preload: function () {

        this.load.image('preloader', 'assets/preload-bar.png');

    },
    create: function () {

        this.game.input.maxPointers = 1;

        // Set a background color
        this.game.stage.backgroundColor = '#000000';

        // Start the preload state
        this.game.state.start('preload');

    }
};

module.exports = Boot;
