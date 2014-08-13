'use strict';

// Prefabs
var SquareGroup = require('../prefabs/squareGroup');


// Functions
function Play() {
}
Play.prototype = {
    create: function () {

        /* Set the background color
         ******************************/
        this.game.stage.backgroundColor = '#FFFFCC';

        /* Some Variables
         ********************/
        this.totalDuration = 3;
        this.CountdownDisplay = this.totalDuration;
        this.game.score = 0;

        /* Set the physic system
         ******************************/
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = -88;

        /* Initialise emitters
         ******************************/

        // Init emitter for square-bv explosions
        this.game.explosionEmitter = this.game.add.emitter(0, 0, 888);
        this.game.explosionEmitter.makeParticles('square');
        this.game.explosionEmitter.setYSpeed(-250, 250);
        this.game.explosionEmitter.setXSpeed(-250, 250);
        this.game.explosionEmitter.minParticleScale = 0.2;
        this.game.explosionEmitter.maxParticleScale = 0.5;
        this.game.explosionEmitter.gravity = 0;

        /* Display countdown
         ******************************************************/
        this.CountdownDisplayText = this.game.add.bitmapText(10, 10, 'fontSquareDigitBV', this.CountdownDisplay.toString(), 44);
        this.game.scoreText = this.game.add.bitmapText(440, 10, 'fontSquareDigitBV', this.game.score.toString(), 44);

        /* Create and add a group to hold our squareGroup prefabs
         ******************************************************/
        this.squares = this.game.add.group();

        /* add a timer to generate black squares
         ******************************************************/
        this.squaresGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1, this.generateSquaresAndCountdown, this);
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
    countDown: function () {

        // Go to game over is needed
        if (this.CountdownDisplay === 0) {
            this.game.state.start('gameover');
        }

        // Display the score
        this.CountdownDisplayToString = this.CountdownDisplay.toString();
        if (this.CountdownDisplay < 10) {
            this.CountdownDisplayToString = "0" + this.CountdownDisplayToString;
        }
        this.CountdownDisplayText.setText(this.CountdownDisplayToString);

        // Minus the countdown
        this.CountdownDisplay--;

    },
    generateSquaresAndCountdown: function () {

        this.generateSquares();
        this.countDown();

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
            this.game.score = this.game.score + sprite.credit;
            this.game.scoreText.setText(this.game.score.toString());
            sprite.hasScored = true;
            // Stock score and best score
            if (!!localStorage) {
                this.game.bestScore = localStorage.getItem('bestScore');
                if (!this.game.bestScore || this.game.bestScore < this.game.score) {
                    this.game.bestScore = this.game.score;
                    localStorage.setItem('bestScore', this.game.bestScore);
                }
            } else {
                // Fallback. LocalStorage isn't available
                this.game.bestScore = 'N/A';
            }
        }


    }

};

module.exports = Play;