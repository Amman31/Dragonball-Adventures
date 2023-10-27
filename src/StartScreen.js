class StartScreen extends Phaser.Scene {
    constructor() {
        super('startScreen');
    }
    preload() {
        this.load.image('startbackground', './assets/startscreen.png');
        this.load.image('play', './assets/play.png');

        this.load.image('loadingbackground', './assets/loadingscreen.png');
        this.load.audio('backgroundMusic', './assets/song.mp3');
    }

    create() {
        this.startbackground = this.add.image(0, 0, "startbackground");
        this.startbackground.setOrigin(0, 0);

        this.background_music1 = this.sound.add('backgroundMusic', { loop: true });
        this.background_music1.setVolume(0.07);
        this.background_music1.play();

        this.playButton = this.add.image(1920 / 2, 1081 / 1.4, "play");
        this.playButton.setInteractive();

        this.playButton.on("pointerdown", () => {
            this.playButton.setScale(0.8);
        });

        this.playButton.on("pointerup", () => {
            this.playButton.setScale(1);
            this.scene.start("bootGame");
        });
    }
}