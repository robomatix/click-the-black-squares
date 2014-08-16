'use strict';

var Square;

Square = function (game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'square', frame);

    // Add physic body
    this.game.physics.arcade.enableBody(this);

    //Anchor
    this.anchor.setTo(0.5, 0.5);

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
    this.creditString = "";
    this.thisyTo = 0;


};

Square.prototype = Object.create(Phaser.Sprite.prototype);
Square.prototype.constructor = Square;

Square.prototype.update = function () {

    // write your prefab's specific update code here

};

Square.prototype.goUp = function (velocityY) {

    this.body.velocity.y = -velocityY;

};
Square.prototype.displayCredit = function (credit, x, y) {

    this.creditString = "+" + credit.toString();

    if (y > 150) {// Direction of the y tween ( near top... )
        this.thisYTo = y - 55;
    } else {
        this.thisYTo = y + 55;
    }

    this.textCredit = this.game.add.bitmapText(x, y, 'fontSquareBV', this.creditString, 44);
    this.game.add.tween(this.textCredit).to({ alpha: 0 }, 250, Phaser.Easing.Linear.None, true, 250);
    this.game.add.tween(this.textCredit).to({y: this.thisYTo}, 200, Phaser.Easing.Linear.None, true, 0);

}

Square.prototype.clicked = function () {

    this.hasBeenclicked = true;

}

module.exports = Square;
