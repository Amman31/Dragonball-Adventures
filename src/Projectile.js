class Projectile extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'mistBall');
        scene.add.existing(this);
        scene.projectiles.push(this);
        this.setScale(0.2);
        scene.physics.world.enableBody(this);
        this.body.velocity.x = -800;
        this.body.allowGravity = false;
    }

    update() {
        if (this.x > config.width) {
            this.destroy();
        }
    }
}
