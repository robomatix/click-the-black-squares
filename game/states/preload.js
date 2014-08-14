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
        this.load.audio('onStartGame', ['assets/on-start-game.ogg', 'assets/on-start-game.mp3']);
        this.load.audio('onTimer1', ['assets/on-timer-1.ogg', 'assets/on-timer-1.mp3']);
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
