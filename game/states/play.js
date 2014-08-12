'use strict';

// Prefabs
var SquareGroup = require('../prefabs/squareGroup');


// Functions
function Play() {
}
Play.prototype = {
    create: function () {
        // Set the physic system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = -100;

        // create and add a group to hold our squareGroup prefabs
        this.squares = this.game.add.group();

        // add a timer
        this.squaresGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.generateSquares, this);
        this.squaresGenerator.timer.start();

    },
    update: function () {
        this.squares.forEachDead(function (squareGroup) {
            this.checkScore();
        }, this);

    },
    generateSquares: function() {

        var squareGroup = this.squares.getFirstExists(false);
        if (!squareGroup) {
            squareGroup = new SquareGroup(this.game, this.squares);
        }
        squareGroup.reset(0, 0);

    },
    checkScore: function () {
        console.log('dead');
    }

};

module.exports = Play;