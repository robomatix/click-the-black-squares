'use strict';

var Square;

Square = function (game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'square', frame);

    // Add physic body
    this.game.physics.arcade.enableBody(this);

    // Kill the sprite if out of the world
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;

    // To detect click on the square-bv
    this.inputEnabled = true;
    this.events.onInputDown.add(this.clicked, this);

    // Some variables
    this.hasScored = false;
    this.hasBeenclicked = false;
    this.credit = 0;


};

Square.prototype = Object.create(Phaser.Sprite.prototype);
Square.prototype.constructor = Square;

Square.prototype.update = function () {

    // write your prefab's specific update code here

};

Square.prototype.goUp = function (velocityY) {

    this.body.velocity.y = -velocityY;

};

Square.prototype.clicked = function () {

    this.hasBeenclicked = true;

}

module.exports = Square;
