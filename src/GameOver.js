class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOver2');
    }

    create() {
        this.sound.stopByKey('backgroundMusic');
        this.sound.stopByKey('backgroundMusic2');
        const score = this.scene.manager.getScene('playGame').score;

        this.gameoverbackground = this.add.image(0, 0, "gameOver2");
        this.gameoverbackground.setOrigin(0, 0);

        this.restartButton = this.add.image(1920 / 2, 1081 / 1.3, "restart");
        this.restartButton.setInteractive();

        this.restartButton.on("pointerdown", () => {
            this.restartButton.setScale(0.8);
        });

        this.restartButton.on("pointerup", () => {
            this.restartButton.setScale(1);
            this.sound.play('backgroundMusic', { loop: true });
            enemiesRemaining = 15;
            this.scene.start("playGame");
        });

        this.name = this.add.text(config.width / 2.9, config.height - 650, 'Name: ' + playerName, {
            fontFamily: 'Arial',
            fontSize: '100px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4,
        });

        this.scoreText = this.add.text(config.width / 2.7, config.height - 520, 'Score: ' + score, {
            fontFamily: 'Arial',
            fontSize: '100px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4,
        });
    }
}