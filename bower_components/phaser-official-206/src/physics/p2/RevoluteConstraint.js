/**
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2014 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * Connects two bodies at given offset points, letting them rotate relative to each other around this point.
 * The pivot points are given in world (pixel) coordinates.
 *
 * @class Phaser.Physics.P2.RevoluteConstraint
 * @classdesc Physics RevoluteConstraint Constructor
 * @constructor
 * @param {Phaser.Physics.P2} world - A reference to the P2 World.
 * @param {p2.Body} bodyA - First connected body.
 * @param {Float32Array} pivotA - The point relative to the center of mass of bodyA which bodyA is constrained to. The value is an array with 2 elements matching x and y, i.e: [32, 32].
 * @param {p2.Body} bodyB - Second connected body.
 * @param {Float32Array} pivotB - The point relative to the center of mass of bodyB which bodyB is constrained to. The value is an array with 2 elements matching x and y, i.e: [32, 32].
 * @param {number} [maxForce=0] - The maximum force that should be applied to constrain the bodies.
 */
Phaser.Physics.P2.RevoluteConstraint = function (world, bodyA, pivotA, bodyB, pivotB, maxForce) {

    if (typeof maxForce === 'undefined') {
        maxForce = Number.MAX_VALUE;
    }

    /**
     * @property {Phaser.Game} game - Local reference to game.
     */
    this.game = world.game;

    /**
     * @property {Phaser.Physics.P2} world - Local reference to P2 World.
     */
    this.world = world;

    pivotA = [ world.pxmi(pivotA[0]), world.pxmi(pivotA[1]) ];
    pivotB = [ world.pxmi(pivotB[0]), world.pxmi(pivotB[1]) ];

    p2.RevoluteConstraint.call(this, bodyA, pivotA, bodyB, pivotB, {maxForce: maxForce});

};

Phaser.Physics.P2.RevoluteConstraint.prototype = Object.create(p2.RevoluteConstraint.prototype);
Phaser.Physics.P2.RevoluteConstraint.prototype.constructor = Phaser.Physics.P2.RevoluteConstraint;
