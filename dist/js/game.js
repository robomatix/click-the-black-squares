(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(500, 500, Phaser.AUTO, 'click-the-black-squares');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":4,"./states/gameover":5,"./states/menu":6,"./states/play":7,"./states/preload":8}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
'use strict';

// Prefabs
var Square = require('./square');

var SquareGroup;

SquareGroup = function (game, parent) {
    Phaser.Group.call(this, game, parent);

    for (var i = 0; i < 10; i++) {

        // Some variables
        var x = i * 50;
        var velocityY = this.game.rnd.integerInRange(1, 88);

        // Add a square-bv with some properties
        this.square = new Square(this.game, x, 500);
        this.square.scale.setTo(2, 2);
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

},{"./square":2}],4:[function(require,module,exports){
'use strict';

function Boot() {
}

Boot.prototype = {
    preload: function () {
        this.load.image('preloader', 'assets/preloader.gif');
    },
    create: function () {
        this.game.input.maxPointers = 1;

        // Set a background color
        this.game.stage.backgroundColor = '#000000';

        // Start the preload state
        this.game.state.start('preload');
    }
};

module.exports = Boot;

},{}],5:[function(require,module,exports){
'use strict';
function GameOver() {
}

GameOver.prototype = {
    preload: function () {

    },
    create: function () {
        var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
        this.titleText = this.game.add.text(this.game.world.centerX, 100, 'Game Over!', style);
        this.titleText.anchor.setTo(0.5, 0.5);

        this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
        this.congratsText.anchor.setTo(0.5, 0.5);

        this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
        this.instructionText.anchor.setTo(0.5, 0.5);
    },
    update: function () {
        if (this.game.input.activePointer.justPressed()) {
            this.game.state.start('play');
        }
    }
};
module.exports = GameOver;

},{}],6:[function(require,module,exports){
'use strict';
function Menu() {
}

Menu.prototype = {
    preload: function () {

    },
    create: function () {
        ;
        // Title
        this.titleText = this.game.add.bitmapText(10, 500, 'fontSquareBV', 'CLICK THE BLACK SQUARES', 40);
        this.game.add.tween(this.titleText).to({y: 10}, 1000).easing(Phaser.Easing.Bounce.Out).start();



        this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Click anywhere to play "Click The Yeoman Logo"', { font: '16px Arial', fill: '#000', align: 'center'});
        this.instructionsText.anchor.setTo(0.5, 0.5);

    },
    update: function () {
        if (this.game.input.activePointer.justPressed()) {
            this.game.state.start('play');
        }
    }
};

module.exports = Menu;

},{}],7:[function(require,module,exports){
'use strict';

// Prefabs
var SquareGroup = require('../prefabs/squareGroup');


// Functions
function Play() {
}
Play.prototype = {
    create: function () {

        // Set the background color
        this.game.stage.backgroundColor = '#FFFFCC';

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
},{"../prefabs/squareGroup":3}],8:[function(require,module,exports){
'use strict';
function Preload() {
    this.asset = null;
    this.ready = false;
}

Preload.prototype = {
    preload: function () {
        this.asset = this.add.sprite(this.width / 2, this.height / 2, 'preloader');
        this.asset.anchor.setTo(0.5, 0.5);

        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.load.setPreloadSprite(this.asset);

        // BitmapFont
        this.load.bitmapFont('fontSquareBV', 'assets/fonts/square-bv/font.png', 'assets/fonts/square-bv/font.fnt');
        this.load.bitmapFont('fontSquareBB', 'assets/fonts/square-bb/font.png', 'assets/fonts/square-bb/font.fnt');

        // Images
        this.load.image('square', 'assets/black-square.png');

        // Audio
        this.load.audio('clickBlackSquare', ['assets/on-click-1.ogg', 'assets/on-click-1.mp3']);

    },
    create: function () {
        this.asset.cropEnabled = false;
    },
    update: function () {
        if (!!this.ready) {
            this.game.state.start('menu');
        }
    },
    onLoadComplete: function () {
        this.ready = true;
    }
};

module.exports = Preload;

},{}]},{},[1])