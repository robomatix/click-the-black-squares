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
        this.game.physics.arcade.gravity.y = 333;

        // create and add a group to hold our squareGroup prefabs
        this.squares = this.game.add.group();

        // add a timer
        this.squaresGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 2, this.generateSquares, this);
        this.squaresGenerator.timer.start();

        /*
        this.sprite = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'yeoman');
        this.sprite.inputEnabled = true;

        this.game.physics.arcade.enable(this.sprite);
        this.sprite.body.collideWorldBounds = true;
        this.sprite.body.bounce.setTo(1, 1);
        this.sprite.body.velocity.x = this.game.rnd.integerInRange(-500, 500);
        this.sprite.body.velocity.y = this.game.rnd.integerInRange(-500, 500);

        this.sprite.events.onInputDown.add(this.clickListener, this);
        */
    },
    update: function () {

    },
    generateSquares: function() {
        console.log('generating pipes!');


        var squareGroupx = this.squares.getFirstExists(false);
        if (!squareGroupx) {
            squareGroupx = new SquareGroup(this.game, this.squares);
        }
        squareGroupx.reset(0, 0);

    },
    clickListener: function () {
        this.game.state.start('gameover');
    }
};

module.exports = Play;