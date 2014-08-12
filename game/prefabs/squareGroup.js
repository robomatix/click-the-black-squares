'use strict';

// Prefabs
var Square = require('./square');

var SquareGroup;

SquareGroup = function (game, parent) {
    Phaser.Group.call(this, game, parent);

    for (var i = 0; i < 20; i++) {

        // Some variables
        var x = i * 25;
        var velocityY = this.game.rnd.integerInRange(1, 88);

        // Add a square with some properties
        this.square = new Square(this.game, x, 500);
        this.square.goUp(velocityY);
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