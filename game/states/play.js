'use strict';

// Prefabs
var Square = require('../prefabs/square');


// Functions
function Play() {
}
Play.prototype = {
    create: function () {
        // Set the physic system
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.arcade.gravity.y = 500;

        var squareGroup = this.game.add.group();
        for (var i = 0; i < 10; i++) {
            var square = new Square(this.game, this.game.world.randomX, this.game.world.randomY);
            squareGroup.add(square);
        }
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
    clickListener: function () {
        this.game.state.start('gameover');
    }
};

module.exports = Play;