class cutscene2 extends Phaser.Scene {
    constructor() {
        super('cutscene2');
    }

    create() {
        this.cutscene1back = this.add.image(0, 0, "cutscene2");
        this.cutscene1back.setOrigin(0, 0);
        this.input.on('pointerdown', () => {
            this.scene.start("playGame");
        });
    }
}