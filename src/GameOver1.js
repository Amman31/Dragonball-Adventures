class GameOver1 extends Phaser.Scene {
    constructor() {
        super('gameOver1');
    }

    create() {
        this.sound.stopByKey('backgroundMusic');
        this.sound.stopByKey('backgroundMusic2');
        this.gameoverbackground = this.add.image(0, 0, "gameOver2");
        this.gameoverbackground.setOrigin(0, 0);

        this.restartButton = this.add.image(1920 / 2, 1081 / 1.3, "restart");
        this.restartButton.setInteractive();

        this.restartButton.on("pointerdown", () => {
            this.restartButton.setScale(0.8);
        });

        this.restartButton.on("pointerup", () => {
            this.restartButton.setScale(1);
            dragonballCount = 0;
            this.sound.play('backgroundMusic2', { loop: true });
            this.scene.start("scene1");
        });

        this.name = this.add.text(config.width / 2.9, config.height - 650, 'Name: ' + playerName, {
            fontFamily: 'Arial',
            fontSize: '100px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4,
        });

        this.dragonballs = this.add.text(config.width / 4, config.height - 520, `Dragonballs collected: ${dragonballCount}`, {
            fontFamily: 'Arial',
            fontSize: '100px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4,
        });
    }
}