class cutscene1 extends Phaser.Scene {
    constructor() {
        super('cutscene1');
    }

    create() {
        this.cutscene1back = this.add.image(0, 0, "cutscene1");
        this.cutscene1back.setOrigin(0, 0);
        this.input.on('pointerdown', () => {
            this.scene.start("scene1");
        });
    }
}