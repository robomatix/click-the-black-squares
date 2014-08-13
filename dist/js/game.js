(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a)return a(o, !0);
                if (i)return i(o, !0);
                throw new Error("Cannot find module '" + o + "'")
            }
            var f = n[o] = {exports: {}};
            t[o][0].call(f.exports, function (e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, f, f.exports, e, t, n, r)
        }
        return n[o].exports
    }

    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++)s(r[o]);
    return s
})({1: [function (require, module, exports) {
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
}, {"./states/boot": 4, "./states/gameover": 5, "./states/menu": 6, "./states/play": 7, "./states/preload": 8}], 2: [function (require, module, exports) {
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

}, {}], 3: [function (require, module, exports) {
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

}, {"./square": 2}], 4: [function (require, module, exports) {
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

}, {}], 5: [function (require, module, exports) {
    'use strict';
    function GameOver() {
    }

    GameOver.prototype = {
        preload: function () {

        },
        create: function () {

            /* Set the background color
             ******************************/
            this.game.stage.backgroundColor = '#000000';


            /* Screen
             ******************************/

            // Title
            this.titleText = this.game.add.bitmapText(10, 500, 'fontSquareBB', 'CLICK THE BLACK SQUARES', 40);
            this.game.add.tween(this.titleText).to({y: 10}, 1000).easing(Phaser.Easing.Bounce.Out).start();

            // Game Over
            this.gameOverText = this.game.add.bitmapText(10, 500, 'fontSquareBB', 'GAME OVER', 97);
            this.game.add.tween(this.gameOverText).to({y: 60}, 1000).easing(Phaser.Easing.Bounce.Out).delay(1250).start();

            // Score
            this.scoreString = "SCORE : " + this.game.score.toString();
            this.scoreText = this.game.add.bitmapText(10, 500, 'fontSquareBB', this.scoreString, 44);

            this.tweenScore = this.game.add.tween(this.scoreText).to({y: 220}, 1000).easing(Phaser.Easing.Bounce.Out);
            this.tweenScore.onStart.add(this.playOnTweenEndGame, this);// Sound
            this.tweenScore.delay(1500).start();// Start

            // Your best score
            this.bestScoreString = "BEST SCORE : " + this.game.bestScore.toString();
            this.bestScore = this.game.add.bitmapText(10, 500, 'fontSquareBB', this.bestScoreString, 27);
            this.game.add.tween(this.bestScore).to({y: 270}, 1000).easing(Phaser.Easing.Bounce.Out).delay(2000).start();


            // Pitch
            this.pitchText = this.game.add.bitmapText(120, 500, 'fontSquareBB', 'THIRTY THREE SECONDS !!!', 22);
            this.game.add.tween(this.pitchText).to({y: 350}, 1000).easing(Phaser.Easing.Bounce.Out).delay(2500).start();

            // Button
            this.button = this.game.add.button(this.game.world.centerX, 530, 'replayBtn', this.actionOnClickStartButton, this, 0, 0, 0);
            this.button.anchor.setTo(0.5, 0.5);

            this.tweenButton = this.game.add.tween(this.button).to({y: 420}, 1000).easing(Phaser.Easing.Bounce.Out);
            this.tweenButton.onStart.add(this.playOnTweenEndGame, this);// Sound
            this.tweenButton.delay(2750).start();// Start


        },

        update: function () {

        },
        playClickBlackSquareSound: function () {

            // Sound
            this.game.clickBlackSquareSound.play();


        },
        playOnTweenEndGame: function () {

            // Sound
            this.game.onTweenEndGame.play();


        },
        actionOnClickStartButton: function (btn) {

            // Sound
            this.playClickBlackSquareSound();

            // Go to the actual game
            this.game.state.start('play');

        }
    };
    module.exports = GameOver;

}, {}], 6: [function (require, module, exports) {
    'use strict';
    function Menu() {
    }

    Menu.prototype = {

        preload: function () {

        },

        create: function () {

            /* Screen
             ******************************/

            // Title
            this.titleText = this.game.add.bitmapText(10, 500, 'fontSquareBB', 'CLICK THE BLACK SQUARES', 40);
            this.game.add.tween(this.titleText).to({y: 10}, 1000).easing(Phaser.Easing.Bounce.Out).start();

            // Pitch
            this.pitchText = this.game.add.bitmapText(120, 500, 'fontSquareBB', 'THIRTY THREE SECONDS !!!', 22);
            this.game.add.tween(this.pitchText).to({y: 200}, 1000).easing(Phaser.Easing.Bounce.Out).delay(1250).start();

            // Button
            this.button = this.game.add.button(this.game.world.centerX, 525, 'startBtn', this.actionOnClickStartButton, this, 0, 0, 0);
            this.button.anchor.setTo(0.5, 0.5);
            this.game.add.tween(this.button).to({y: this.game.world.centerY}, 1000).easing(Phaser.Easing.Bounce.Out).delay(1750).start();

            /* Add sound
             ********************/
            this.game.clickBlackSquareSound = this.game.add.audio('clickBlackSquare');

        },

        update: function () {

        },

        actionOnClickStartButton: function (btn) {

            // Sound
            this.game.clickBlackSquareSound.play();

            // Go to the actual game
            this.game.state.start('play');

        }

    };

    module.exports = Menu;

}, {}], 7: [function (require, module, exports) {
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
            this.totalDuration = 33;
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
            this.game.onEndGame = this.game.add.audio('onEndGame');
            this.game.onTweenEndGame = this.game.add.audio('onTweenEndGame');


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

                // Sound
                this.game.onEndGame.play();

                // Go to Game Over state
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
}, {"../prefabs/squareGroup": 3}], 8: [function (require, module, exports) {
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
            this.load.bitmapFont('fontSquareDigitBV', 'assets/fonts/square-digit-bv/font.png', 'assets/fonts/square-digit-bv/font.fnt');
            this.load.bitmapFont('fontSquareBB', 'assets/fonts/square-bb/font.png', 'assets/fonts/square-bb/font.fnt');


            // Button
            this.game.load.spritesheet('startBtn', 'assets/btn-go.png', 50, 50);
            this.game.load.spritesheet('replayBtn', 'assets/btn-replay.png', 308, 58);


            // Images
            this.load.image('square', 'assets/black-square.png');

            // Audio
            this.load.audio('clickBlackSquare', ['assets/on-click-1.ogg', 'assets/on-click-1.mp3']);
            this.load.audio('onEndGame', ['assets/on-end-game.ogg', 'assets/on-end-game.mp3']);
            this.load.audio('onTweenEndGame', ['assets/on-tween-end-game.ogg', 'assets/on-tween-end-game.mp3']);


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

}, {}]}, {}, [1])