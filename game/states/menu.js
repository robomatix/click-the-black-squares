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
        this.pitchText = this.game.add.bitmapText(69, 500, 'fontSquareBB', 'to win a random number of points !!!', 22);
        this.game.add.tween(this.pitchText).to({y: 60}, 1000).easing(Phaser.Easing.Bounce.Out).delay(1250).start();

        // Duration

        this.durationText = this.game.add.bitmapText(90, 500, 'fontSquareBB', 'PLAY THIRTY THREE SECONDS', 22);
        this.game.add.tween(this.durationText).to({y: 200}, 1000).easing(Phaser.Easing.Bounce.Out).delay(1750).start();

        // Button

        this.startButton = this.game.add.button(this.game.world.centerX, 525, 'startBtn', this.actionOnClickStartButton, this, 1, 0, 2);
        this.startButton.anchor.setTo(0.5, 0.5);
        this.game.add.tween(this.startButton).to({y: this.game.world.centerY}, 1000).easing(Phaser.Easing.Bounce.Out).delay(2000).start();

        this.muteButton = this.game.add.button(this.game.world.centerX, 525, 'mute', this.toggleSound, this, 3, 0);
        this.muteButton.anchor.setTo(0.5, 0.5);
        this.game.add.tween(this.muteButton).to({y: 440}, 500).easing(Phaser.Easing.Bounce.Out).delay(3500).start();


        /* Add sound
         ********************/
        this.game.onStartGame = this.game.add.audio('onStartGame');
        this.game.clickBlackSquareSound = this.game.add.audio('clickBlackSquare');


    },

    update: function () {

    },

    actionOnClickStartButton: function (btn) {

        // Sound
        this.game.onStartGame.play();

        // Go to the actual game
        this.game.state.start('play');

    },


    toggleSound: function () {

        if (this.game.sound.mute) {

            this.muteButton.setFrames(3, 0);
            this.muteButton.frame = 0;
            this.game.sound.mute = false;

        } else {

            this.muteButton.setFrames(1, 2);
            this.muteButton.frame = 2;
            this.game.sound.mute = true;

        }

    }

};

module.exports = Menu;
