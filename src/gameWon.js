class gameWon extends Phaser.Scene {
    constructor() {
        super('gameWon');
    }

    create() {
        this.sound.stopByKey('backgroundMusic');
        this.sound.stopByKey('backgroundMusic2');
        const score = this.scene.manager.getScene('playGame').score;

        this.gameoverbackground = this.add.image(0, 0, "gameWon");
        this.gameoverbackground.setOrigin(0, 0);

        this.quitButton = this.add.image(1920 / 2, 1081 / 1.3, "quit");
        this.quitButton.setInteractive();

        this.quitButton.on("pointerdown", () => {
            this.quitButton.setScale(0.8);
        });

        this.quitButton.on("pointerup", () => {
            this.quitButton.setScale(1);
            this.scene.stop();
            game.destroy(true);
        });

        this.name = this.add.text(config.width / 4.5, config.height - 800, `Congratulations ${playerName}!\nYou have saved the earth!`, {
            fontFamily: 'Arial',
            fontSize: '100px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6,
        });

        this.scoreText = this.add.text(config.width / 3.2, config.height - 520, 'Score: ' + score, {
            fontFamily: 'Arial',
            fontSize: '100px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4,
        });
    }
}