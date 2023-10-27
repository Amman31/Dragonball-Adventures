let isAscending = false;

let health = 3;
let enemiesRemaining = 15;
let hearts;

class Scene2 extends Phaser.Scene {
    constructor() {
        super('playGame');
        this.projectiles = [];

        this.lastShotTime = 0;
        this.cooldownDuration = 2000;
        this.isCooldown = false;
    }

    create() {
        this.collideS = this.sound.add('collideS');
        this.collectS = this.sound.add('collectS');
        this.jumpingS = this.sound.add('jumpingS');
        this.explosionS = this.sound.add('explosionS');

        this.background = this.add.tileSprite(0, 0, config.width, config.height, 'sea');
        this.background.setDisplaySize(this.game.config.width, this.game.config.height);
        this.background.setOrigin(0, 0);

        this.sky = this.add.tileSprite(0, 0, config.width, config.height, 'sky');
        this.sky.setDisplaySize(this.game.config.width, this.game.config.height);
        this.sky.setOrigin(0, 0);

        this.land = this.add.tileSprite(0, 0, config.width, config.height, 'land');
        this.land.setDisplaySize(this.game.config.width, this.game.config.height);
        this.land.setOrigin(0, 0);

        this.playerImage = this.add.image(30, 30, "playerImage");
        this.playerImage.setOrigin(0, 0);
        this.playerImage.setScale(1.3);

        this.gokuFlying = this.physics.add.sprite(1500, 400, 'gokuFlying');
        this.gokuFlying.setOrigin(0, 0);
        this.gokuFlying.setScale(1.5);
        this.gokuFlying.setFlip(true, false);

        this.gokuFlying.body.setCollideWorldBounds(true);
        this.gokuFlying.body.allowGravity = false;

        hearts = this.physics.add.group();


        const bottomOffset = 250;
        const screenHeight = this.game.config.height;
        const colliderBoundsY = screenHeight - bottomOffset;

        this.gokuFlying.body.setBoundsRectangle(new Phaser.Geom.Rectangle(0, 0, this.game.config.width, colliderBoundsY));

        this.anims.create({
            key: "gokuFlying_anim",
            frames: this.anims.generateFrameNumbers("gokuFlying"),
            frameRate: 9,
            repeat: -1
        });

        this.gokuFlying.play('gokuFlying_anim');
        this.createEnemy();
        this.score = 0;
        this.scoreText = this.add.text(220, 90, 'Score: 0', {
            fontFamily: 'Arial',
            fontSize: '40px',
            fill: '#ffc300',
            stroke: '#000000',
            strokeThickness: 6
        });

        this.enemyRemain = this.add.text(220, 160, `Enemies remaining: ${enemiesRemaining}`, {
            fontFamily: 'Arial',
            fontSize: '40px',
            fill: '#ffc300',
            stroke: '#000000',
            strokeThickness: 6
        });

        this.playerN = this.add.text(65, 200, `${playerName}`, {
            fontFamily: 'Arial',
            fontSize: '30px',
            fill: '#ffc300',
            stroke: '#000000',
            strokeThickness: 6
        });


        this.heathleft = this.add.text(220, 30, `Health left: 3`, {
            fontFamily: 'Arial',
            fontSize: '40px',
            fill: '#ffc300',
            stroke: '#000000',
            strokeThickness: 6
        });


        this.cursors = this.input.keyboard.createCursorKeys();

        this.input.on('pointerdown', () => {
            if (!this.isCooldown) {
                this.shootMistBall();
                this.lastShotTime = this.time.now;
                this.isCooldown = true;
            }
        });


        this.cooldownText = this.add.text(30, config.height - 100, `Ki Blast (Press 'X' or CLICK / TAP): 0%`, {
            fontFamily: 'Arial',
            fontSize: '40px',
            fill: '#ffc300',
            stroke: '#000000',
            strokeThickness: 6
        });

        this.aeroText = this.add.text(config.width - 700, config.height - 100, `Use AERO keys to move the player`, {
            fontFamily: 'Arial',
            fontSize: '40px',
            fill: '#ffc300',
            stroke: '#000000',
            strokeThickness: 6
        });

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 6 }),
            frameRate: 10, // You can adjust the frame rate
            repeat: 0, // No repeat
        });

        this.physics.add.overlap(this.gokuFlying, hearts, this.collectHearts, null, this);

        this.time.addEvent({
            delay: 5000,
            callback: this.createHearts,
            callbackScope: this,
            loop: true,
        });


    }

    update() {
        const speed = 5;

        this.moveEnemy(this.scene1enemy, 12);

        //diagonal movement
        if (this.cursors.up.isDown && this.cursors.left.isDown) {
            this.gokuFlying.x -= speed * Math.sqrt(2) / 2;
            this.gokuFlying.y -= speed * Math.sqrt(2) / 2;
        } else if (this.cursors.up.isDown && this.cursors.right.isDown) {
            this.gokuFlying.x += speed * Math.sqrt(2) / 2;
            this.gokuFlying.y -= speed * Math.sqrt(2) / 2;
        } else if (this.cursors.down.isDown && this.cursors.left.isDown) {
            this.gokuFlying.x -= speed * Math.sqrt(2) / 2;
            this.gokuFlying.y += speed * Math.sqrt(2) / 2;
        } else if (this.cursors.down.isDown && this.cursors.right.isDown) {
            this.gokuFlying.x += speed * Math.sqrt(2) / 2;
            this.gokuFlying.y += speed * Math.sqrt(2) / 2;
        }
        // vertical movement
        if (this.cursors.up.isDown) {
            this.gokuFlying.y -= speed;
        } else if (this.cursors.down.isDown) {
            this.gokuFlying.y += speed;
        }

        // horizontal movement
        if (this.cursors.left.isDown) {
            this.gokuFlying.x -= speed;
        } else if (this.cursors.right.isDown) {
            this.gokuFlying.x += speed;
        }

        if (this.isCooldown) {
            const currentTime = this.time.now;
            const timeSinceLastShot = currentTime - this.lastShotTime;
            const remainingCooldown = Math.max(0, this.cooldownDuration - timeSinceLastShot);
            const cooldownPercentage = ((this.cooldownDuration - remainingCooldown) / this.cooldownDuration) * 100;

            this.cooldownText.setText(`Ki Blast (Press 'X' or CLICK / TAP): ${cooldownPercentage.toFixed(0)}%`);

            if (remainingCooldown === 0) {
                this.isCooldown = false;
            }
        } else {
            if (Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey('X'))) {
                this.shootMistBall();
                this.lastShotTime = this.time.now;
                this.isCooldown = true;
            }
        }


        this.land.tilePositionX -= 30;
        this.sky.tilePositionX -= 0.7;

        for (let i = 0; i < this.projectiles.length; i++) {
            const projectile = this.projectiles[i];

            this.physics.overlap(projectile, this.scene1enemy, (projectile, enemy) => {
                // Trigger the explosion animation at the enemy's position
                const explosion = this.add.sprite(enemy.x, enemy.y, 'explosion');
                explosion.play('explode');

                // Destroy the projectile and reset the enemy
                projectile.destroy();
                this.resetEnemyPos(enemy);

                // Increase the score
                enemiesRemaining -= 1;
                this.explosionS.play();
                this.score += 10;
                this.enemyRemain.setText(`Enemies remaining: ${enemiesRemaining}`)
                this.scoreText.setText('Score: ' + this.score);

                // Hide the explosion after 0.5 seconds
                this.time.delayedCall(500, () => {
                    explosion.destroy();
                });
            });
        }

        if (health === 0) {
            health = 3;
            this.scene.start('gameOver2', { score: this.score });
        }

        if (enemiesRemaining === 0) {
            enemiesRemaining = 15;
            this.scene.start('gameWon', { score: this.score });
        }


    }

    moveEnemy(enemy, speed) {
        enemy.x += speed;
        if (enemy.x > config.width) {
            this.scene.start('gameOver2', { score: this.score });
            this.resetEnemyPos(enemy);
        }
    }

    resetEnemyPos(enemy) {
        enemy.destroy();

        this.createEnemy();
    }

    createEnemy() {
        this.scene1enemy = this.physics.add.sprite(0, Phaser.Math.Between(30, config.height - 400), 'scene1enemy');
        this.scene1enemy.setScale(3);

        this.anims.create({
            key: "enemy1_anim",
            frames: this.anims.generateFrameNumbers("scene1enemy"),
            frameRate: 10,
            repeat: -1
        });

        this.scene1enemy.body.allowGravity = false;
        this.scene1enemy.play('enemy1_anim');

        this.physics.add.collider(this.gokuFlying, this.scene1enemy, () => {
            this.resetEnemyPos(this.scene1enemy);
            this.collideS.play();
            health -= 1;
            this.gokuFlying.setTint(0xff0000);
            this.heathleft.setText(`Health left: ${health}`);
            this.tintTimer = this.time.delayedCall(200, () => {
                this.gokuFlying.clearTint();
            });
        });
    }
    shootMistBall() {
        this.jumpingS.play();
        const projectile = new Projectile(this, this.gokuFlying.x, this.gokuFlying.y + this.gokuFlying.height / 2);
    }

    createHearts() {
        const x = 0;

        const heart = hearts.create(x, Phaser.Math.Between(30, config.height - 400), 'heart');
        heart.setScale(0.05);


        heart.setVelocityX(1300);


        heart.body.allowGravity = false;


        heart.checkWorldBounds = true;
        heart.outOfBoundsKill = true;


        this.physics.add.overlap(this.gokuFlying, heart, this.collectHearts, null, this);
    }

    collectHearts(gokuFlying, heart) {
        heart.destroy();
        this.collectS.play();
        if (health < 3) {
            health += 1;
        }
        this.heathleft.setText(`Health left: ${health}`);
    }

}
