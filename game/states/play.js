'use strict';

// Prefabs
var SquareGroup = require('../prefabs/squareGroup');


// Functions
function Play() {
}
Play.prototype = {
    create: function () {

        /* Set the physic system
         ******************************/
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = -88;

        /* Initialise emitters
         ******************************/

        // Init emitter for square explosions
        this.game.explosionEmitter = this.game.add.emitter(0, 0, 888);
        this.game.explosionEmitter.makeParticles('square');
        this.game.explosionEmitter.setYSpeed(-250, 250);
        this.game.explosionEmitter.setXSpeed(-250, 250);
        this.game.explosionEmitter.minParticleScale = 0.2;
        this.game.explosionEmitter.maxParticleScale = 0.5;
        this.game.explosionEmitter.gravity = 0;

        /* Create and add a group to hold our squareGroup prefabs
         ******************************************************/
        this.squares = this.game.add.group();

        /* add a timer
         ******************************************************/
        this.squaresGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.generateSquares, this);
        this.squaresGenerator.timer.start();

        /* Add sound
         ********************/
        this.game.clickBlackSquareSound = this.game.add.audio('clickBlackSquare');


    },
    update: function () {


        this.squares.forEach(function (squareGroup) {
            this.checkScoreGroup(squareGroup);
        }, this);


    },
    generateSquares: function () {

        var squareGroup = this.squares.getFirstExists(false);
        if (!squareGroup) {
            squareGroup = new SquareGroup(this.game, this.squares);
        }
        squareGroup.reset(0, 0);

    },
    checkScoreGroup: function (squareGroup) {
        squareGroup.forEachExists(this.checkClicked, squareGroup);

    },
    checkClicked: function (sprite) {

        if (sprite.hasBeenclicked && !sprite.hasScored) {

            // Emit particles
            this.game.explosionEmitter.x = sprite.x;
            this.game.explosionEmitter.y = sprite.y;
            this.game.explosionEmitter.start(true, 7777, null, 18);

            // Sound
            this.game.clickBlackSquareSound.play();

            // Hide it
            sprite.alpha = 0;// If it's killed it seems not possible to get hasScored and hasBeenclicked

            // Score
            sprite.hasScored = true;
        }


    }

};

module.exports = Play;