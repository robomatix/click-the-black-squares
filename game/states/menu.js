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
        this.pitchText = this.game.add.bitmapText(155, 500, 'fontSquareBB', 'THIRTEEN SECONDS !!!', 22);
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
