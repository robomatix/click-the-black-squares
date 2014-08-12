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
