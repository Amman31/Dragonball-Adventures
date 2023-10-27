let playerName = '';
let inputBox;

class LoadingScreen extends Phaser.Scene {
    constructor() {
        super('bootGame');
    }

    preload() {
        this.loadingWallpaper = this.add.image(0, 0, "loadingbackground");
        this.loadingWallpaper.setOrigin(0, 0);

        //Scene 1
        this.load.image('scene1background', './assets/scene1background.png');
        this.load.image('land', './assets/land.png');
        this.load.image('sky', './assets/sky.png');
        this.load.spritesheet('gokuFlying', './assets/gokuFlying.png', {
            frameWidth: 121,
            frameHeight: 173
        });
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 192,
            frameHeight: 192
        });
        this.load.image('mistBall', './assets/mistBall.png');

        this.load.spritesheet('scene1enemy', './assets/scene1enemy.png', {
            frameWidth: 52,
            frameHeight: 40
        });
        this.load.image('gameOver2', './assets/gameOver.png');
        this.load.image('restart', './assets/restart.png')

        ////////////
        this.load.spritesheet('gokuRunning', './assets/gokuRunning.png', {
            frameWidth: 53.5,
            frameHeight: 59,
        });

        this.load.image('gokuOnNimbus', './assets/gokuOnNimbus.png');
        this.load.image('obstacle', './assets/redribbon.png');
        this.load.image('dragonball', './assets/dragonball.png');
        this.load.image('gokuJumping', './assets/gokuJumping.png')
        this.load.image('gokuJumpingDescend', './assets/gokuDescending.png')
        this.load.image('playerImage', './assets/playerImage.png');
        this.load.image('nimbus', './assets/nimbus.png');
        this.load.image('heart', './assets/heart.png');
        this.load.image('gameWon', './assets/gameWon.png');
        this.load.image('quit', './assets/quit.png');
        this.load.image('cutscene1', './assets/cutscene1.png');
        this.load.image('cutscene2', './assets/cutscene2.png');
        this.load.image('speech', './assets/jumpingCutscene.png');
        this.load.audio('backgroundMusic2', './assets/backgroundmusic2.mp3');
        this.load.audio('jumpingS', './assets/jumping.mp3');
        this.load.audio('explosionS', './assets/explosion.mp3');
        this.load.audio('collectS', './assets/collect.mp3');
        this.load.audio('collideS', './assets/collide.mp3');
    }
    create() {
        while (!playerName) {
            playerName = prompt("Enter your name:");
        }
        this.scene.start('cutscene1');
    }
}
