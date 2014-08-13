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
        this.game.onStartGame.play();

        // Go to the actual game
        this.game.state.start('play');

    }
};
module.exports = GameOver;
