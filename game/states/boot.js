'use strict';

function Boot() {
}

Boot.prototype = {
    preload: function () {
        this.load.image('preloader', 'assets/preloader.gif');
    },
    create: function () {
        this.game.input.maxPointers = 1;

        // Set a background color and the physic system
        this.game.stage.backgroundColor = '#FFFFCC';
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // Start the preload state
        this.game.state.start('preload');
    }
};

module.exports = Boot;
