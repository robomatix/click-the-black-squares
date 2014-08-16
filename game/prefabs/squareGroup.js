'use strict';

// Prefabs
var Square = require('./square');

var SquareGroup;

SquareGroup = function (game, parent) {
    Phaser.Group.call(this, game, parent);

    for (var i = 0; i < 10; i++) {

        // Some variables
        var x = i * 50;
        var x25 = x + 25;// Add 25 because of the anchor in the middle ( square width = 50 )
        var velocityY = this.game.rnd.integerInRange(1, 88);

        // Add a square-bv with some properties
        this.square = new Square(this.game, x25, 525);
        this.square.scale.setTo(2, 2);
        this.square.goUp(velocityY);
        this.square.credit = this.game.rnd.integerInRange(1, 10);
        this.add(this.square);
    }
    this.width = 500;

};

SquareGroup.prototype = Object.create(Phaser.Group.prototype);
SquareGroup.prototype.constructor = SquareGroup;

SquareGroup.prototype.update = function () {

    // write your prefab's specific update code here

};

SquareGroup.prototype.reset = function (x, y) {
    this.x = x;
    this.y = y;
    this.exists = true;
};

module.exports = SquareGroup;
