let player;
let obstacles;
let dragonballs;
let dragonballCount = 0;
let isJumping = false;
let ascending = false;
let collidedWithNimbus = false;


class Scene1 extends Phaser.Scene {
    constructor() {
        super('scene1');
    }

    create() {
        this.collideS = this.sound.add('collideS');
        this.collectS = this.sound.add('collectS');
        this.jumpingS = this.sound.add('jumpingS');

        this.sound.stopByKey('backgroundMusic');
        this.background_music2 = this.sound.add('backgroundMusic2', { loop: true });
        this.background_music2.setVolume(0.01);
        this.background_music2.play();

        const floorHeight = config.height - 200;

        this.scene1background = this.add.tileSprite(0, 0, config.width, config.height, 'scene1background');
        this.scene1background.setDisplaySize(this.game.config.width, this.game.config.height);
        this.scene1background.setOrigin(0, 0);

        this.playerImage = this.add.image(30, 30, "playerImage");
        this.playerImage.setOrigin(0, 0);
        this.playerImage.setScale(1.3);

        this.dragonballText = this.add.text(220, 30, `DragonBalls: 0`, {
            fontFamily: 'Arial',
            fontSize: '40px',
            fill: '#ffc300',
            stroke: '#000000',
            strokeThickness: 6
        });

        this.playerN = this.add.text(60, 200, `${playerName}`, {
            fontFamily: 'Arial',
            fontSize: '30px',
            fill: '#ffc300',
            stroke: '#000000',
            strokeThickness: 6
        });

        this.inputText = this.add.text(40, config.height - 80, `TAP / CLICK anywhere to JUMP`, {
            fontFamily: 'Arial',
            fontSize: '40px',
            fill: '#ffc300',
            stroke: '#000000',
            strokeThickness: 6,
        });

        this.nimbus = this.physics.add.sprite(config.width + 100, config.height - 600, 'nimbus');
        this.nimbus.setScale(4);
        this.nimbus.setFlip(true, false);
        this.nimbus.body.allowGravity = false;

        this.player = this.physics.add.sprite(config.width - 300, config.height - 500, 'gokuRunning');
        this.player.setCollideWorldBounds(true);
        this.player.setScale(4);
        this.player.setFlip(true, false);
        this.physics.world.setBounds(0, 0, 1920, floorHeight);

        this.input.on('pointerdown', this.jump, this);


        obstacles = this.physics.add.group();
        dragonballs = this.physics.add.group();


        this.time.addEvent({
            delay: 5000,
            callback: this.createObstacle,
            callbackScope: this,
            loop: true,
        });

        this.time.addEvent({
            delay: 6000,
            callback: this.createDragonball,
            callbackScope: this,
            loop: true,
        });



        this.physics.add.overlap(this.player, obstacles, this.hitObstacle, null, this);
        this.physics.add.overlap(this.player, dragonballs, this.collectDragonball, null, this);


        this.anims.create({
            key: "gokuRunning_anim",
            frames: this.anims.generateFrameNumbers("gokuRunning"),
            frameRate: 16,
            repeat: -1
        });

        this.player.play('gokuRunning_anim');
    }

    update() {
        const targetX = config.width - 300;

        if (this.player.body.onFloor()) {
            isJumping = false;
            ascending = false;
        }


        if (this.player.body.velocity.y < 0) {
            ascending = true;
        } else {
            ascending = false;
        }

        if (isJumping) {

            if (ascending) {
                this.player.setTexture('gokuJumping');
            } else {
                this.player.setTexture('gokuJumpingDescend');
            }
        }

        this.scene1background.tilePositionX -= 13.3;

        if (dragonballCount === 7) {
            this.removeObstaclesAndDragonballs();
            this.nimbus.setVelocityX(-40);

            if (this.nimbus.x <= targetX) {
                this.nimbus.setVelocityX(0);

                this.roshiImage = this.add.image(70, config.height - 330, "speech");
                this.roshiImage.setOrigin(0, 0);

                if (isJumping && !ascending) {
                    this.physics.world.collide(this.player, this.nimbus, () => {
                        collidedWithNimbus = true;
                        this.nimbus.setVisible(false);
                    });
                }
            }
        }

        if (collidedWithNimbus) {
            this.player.setTexture('gokuOnNimbus');
            this.player.setCollideWorldBounds(false);
            this.player.body.allowGravity = false;
            this.player.y = config.height - 650;
            this.player.setVelocityX(-900);
            if (this.player.x < - 50) {
                this.scene.start('cutscene2');
            }
        }

    }

    jump() {
        this.jumpingS.play();
        if (this.player.body.onFloor()) {
            this.player.setVelocityY(-1300);
            isJumping = true;
        }
    }


    createObstacle() {
        const x = 0;


        const floorHeight = 1081 - 270;
        const y = floorHeight - 50;

        const obstacle = obstacles.create(x, y, 'obstacle');


        obstacle.setVelocityX(800);


        obstacle.body.allowGravity = false;


        obstacle.checkWorldBounds = true;
        obstacle.outOfBoundsKill = true;


        this.physics.add.overlap(this.player, obstacle, this.hitObstacle, null, this);
    }

    hitObstacle(player, obstacle) {

        this.collideS.play();
        player.setTint(0xff0000);
        this.scene.start('gameOver1')
    }

    createDragonball() {
        const x = 0;


        const floorHeight = 1081 - 570;
        const y = floorHeight - 50;

        const dragonball = dragonballs.create(x, y, 'dragonball');
        dragonball.setScale(0.3);


        dragonball.setVelocityX(800);


        dragonball.body.allowGravity = false;


        dragonball.checkWorldBounds = true;
        dragonball.outOfBoundsKill = true;


        this.physics.add.overlap(this.player, dragonball, this.collectDragonball, null, this);
    }

    collectDragonball(player, dragonball) {
        this.collectS.play();
        dragonball.destroy();
        dragonballCount += 1;
        this.dragonballText.setText(`DragonBalls: ${dragonballCount}`);
    }

    removeObstaclesAndDragonballs() {
        obstacles.clear(true, true);
        dragonballs.clear(true, true);

    }
}
