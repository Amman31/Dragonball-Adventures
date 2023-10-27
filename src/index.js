var config = {
    type: Phaser.AUTO,
    height: 1081,
    width: 1920,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [StartScreen, LoadingScreen, cutscene1, Scene1, cutscene2, Scene2, GameOver1, GameOver, gameWon],
    fps: 60,
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 1500
            }
        }
    },
    orientation: 'landscape'
}

let game = new Phaser.Game(config);