'use strict';
function Menu() {
}

Menu.prototype = {

    preload: function () {

    },

    create: function () {

        // Title
        this.titleText = this.game.add.bitmapText(10, 500, 'fontSquareBV', 'CLICK THE BLACK SQUARES', 40);
        this.game.add.tween(this.titleText).to({y: 10}, 1000).easing(Phaser.Easing.Bounce.Out).start();

        // Buttons
        this.button = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'startBtn', this.actionOnClickStartButton, this, 1, 1, 0);
        this.button.anchor.setTo(0.5, 0.5);

    },

    update: function () {

    },

    actionOnClickStartButton: function (btn) {

            this.game.state.start('play');

    }

};

module.exports = Menu;
